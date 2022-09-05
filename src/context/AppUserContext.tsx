import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiClient} from 'api/APIClient';
import {useAppSelector, useInterval} from 'app/hooks';
import {useDialog} from 'components/dialog/AppDialogContext';
import AppViewWithFullScreenLoading from 'components/view/AppViewWithFullScreenLoading';
import {sessionConfig} from 'constants/config';
import {appConstants} from 'constants/const';
import {FootballApi} from 'features/book-football-pitch/FootballApi';
import {hideDialog} from 'features/dialog/dialogSlice';
import {loginAPI} from 'features/login/loginApi';
import {setCustomerDataBooked, setFullName, setPhoneNumber} from 'features/login/loginSlice';
import {
  setCountOrder,
  setFootballOrderData,
  setHistoryOrderData,
} from 'features/user-Info/userSlice';
import moment from 'moment';
import React, {useState, useCallback, useEffect, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import _ from 'lodash';
import {
  AppError,
  createAppError,
  getValue,
  handleException,
  isNullOrEmpty,
  translate,
} from 'utils';
export interface PrevUser {
  userName: string;
  fullName?: string;
  gender?: string;
}
export interface IUserLogin {
  username: string;
  password: string;
}
export interface DetailUserInfo {
  hrisEmployee: any;
  t24Employee: any;
  crmIsActive: string;
  createDate: string;
}
export interface IUserContext {
  onLogin: (user: IUserLogin) => Promise<boolean>;
  resetLocalTimeOut: () => void;
  onLogout: () => Promise<boolean>;
  resetTimeOut: () => void;
  getIsLogin: () => boolean;
  getBasiclUserLoginInfo: () => BasicUserInfo | undefined;
  getDetailUserLoginInfo: () => DetailUserInfo | undefined;
  changeUserLogin: () => void;
  getPrevUserLogin: () => PrevUser | undefined;
  getHrisCode: () => string;
}

const AppUserContext = React.createContext<IUserContext>({} as IUserContext);
interface Props {
  children?: any;
}
export interface BasicUserInfo {
  _id: string;
  username: string;
  password: string;
  email: string;
  fullName: string;
  createAt: string;
  isAdmin: string;
  phoneNumber: string;
}
const AppUserProvider: React.FC<Props> = props => {
  const {showDialog} = useDialog();
  const isShowDialog = useAppSelector(state => state.dialogState.isShowDialog);
  const dispatch = useDispatch();
  const theme = useTheme();
  const [isLogin, setIsLogin] = React.useState<boolean>(false);
  const [localTimeOutCount, setLocalTimeOutCount] = useState<number>(0);
  const [serverTimeOutCount, setServerTimeOutCount] = useState<number>(0);
  const [prevUser, setPrevUser] = useState<PrevUser>();
  const [loading, setLoading] = useState<boolean>(false);
  const [detailUserInfo, setDetailUserInfo] = useState<DetailUserInfo>();
  const [basicUserInfo, setBasicUserInfo] = useState<BasicUserInfo>();
  const [hrisCode, setHrisCode] = useState<string>('');

  const localSessionExpired = (): boolean => {
    if (localTimeOutCount < sessionConfig.TIME_OUT) {
      return false;
    }
    return true;
  };
  const serverSessionExpired = (): boolean => {
    if (serverTimeOutCount < sessionConfig.TIME_GET_TOKEN) {
      return false;
    }
    return true;
  };
  const handleLogoutWhenLocalSessionExpired = useCallback(() => {
    if (!loading) {
      setLoading(true);
      _onLogout()
        .then(() => {
          setLoading(false);
        })
        .catch(error => {
          setLoading(false);
          handleException(error);
          //Chỗ này không show lỗi mà bắt buộc phải logout
          setBasicUserInfo(undefined);
          setDetailUserInfo(undefined);
        });
    }
  }, [loading]);

  /* Xử lý local timeout */
  useInterval(
    () => {
      setLocalTimeOutCount(localTimeOutCount + 1);
      if (localTimeOutCount === sessionConfig.TIME_OUT - 1) {
        _actionTimeOut();
      }
    },
    isLogin && !localSessionExpired() ? 1 : undefined,
  );

  const _actionTimeOut = useCallback(() => {
    showDialog({
      dialogType: 'info',
      title: translate('notification'),
      message: translate('local_timeout'),
      description: '',
      buttonAccept: {
        onPress: handleLogoutWhenLocalSessionExpired,
        label: translate('close'),
        color: theme.colors.primaryBlue,
      },
    });
  }, [
    handleLogoutWhenLocalSessionExpired,
    showDialog,
    theme.colors.primaryBlue,
  ]);
  //----------------------------------------------------------------
  useEffect(() => {
    if (isShowDialog) {
      _actionTimeOut();
      dispatch(hideDialog()); //here---------------
    }
  }, [_actionTimeOut, dispatch, isShowDialog]);
  const fullName = useAppSelector(state => state.loginState.fullName);
  useEffect(() => {
    if (fullName !== '') {
      callApiGetUser();
    }
  }, [fullName]);
  const callApiGetUser = async () => {
    const getUserInfo = await loginAPI.getUser();
    setBasicUserInfo(getUserInfo);
  };
  /* Xử lý server timeout */
  useInterval(
    () => {
      setServerTimeOutCount(serverTimeOutCount + 1);
      if (serverTimeOutCount === sessionConfig.TIME_GET_TOKEN - 1) {
        setServerTimeOutCount(0);
      }
    },
    isLogin && !serverSessionExpired() ? 1 : undefined,
  );
  const _savePrevUserToStorage = async (
    userName: string,
    // fullName?: string,
    // gender?: string,
  ) => {
    const prevUserSave: PrevUser = {
      userName,
      // fullName,
      // gender,
    };
    setPrevUser(prevUserSave);
    try {
      await AsyncStorage.setItem(
        appConstants.ASYNC_STORAGE_KEY.USER_NAME,
        userName,
      );
    } catch (err) {
      handleException(err);
    }
  };
  const _validateUserNameAndPassword = (
    userName: string | PrevUser,
    password: string,
  ): AppError | undefined => {
    if (isNullOrEmpty(userName)) {
      return createAppError(
        'APP_ERROR',
        new Error(translate('username_invalid')),
        appConstants.APP_CODE.INVALID_ERROR_CODE,
      );
    }
    if (isNullOrEmpty(password)) {
      return createAppError(
        'APP_ERROR',
        new Error(translate('password_invalid')),
        appConstants.APP_CODE.INVALID_ERROR_CODE,
      );
    }
    return undefined;
  };
  const _loginWithUserNameAndPassword = async (
    userName: string,
    password: string,
  ) => {
    const validatedError: AppError | undefined = _validateUserNameAndPassword(
      userName,
      password,
    );
    if (!validatedError) {
      try {
        //Xử lý login tại đây
        await loginAPI.getToken(userName, password);
        apiClient.startActionRefreshToken();
        setHrisCode(userName);
        //2. Lấy thông tin cơ bản của User
        const getUserInfo = await loginAPI.getUser();
        console.log('userInfo----', getUserInfo);
        dispatch(setFullName(getUserInfo.fullName));
        dispatch(setPhoneNumber(getUserInfo.phoneNumber));
        // get Order
        // const getFootballOrder = await FootballApi.football_order(userName);
        // dispatch(setCustomerDataBooked(getFootballOrder));
        // handleFootballOrder(getFootballOrder);

        //3. Lưu thông tin User Info
        setBasicUserInfo(getUserInfo);
        // setIsLogin(true);
        _savePrevUserToStorage(userName);
      } catch (err) {
        setIsLogin(false);
        throw err;
      }
    } else {
      setIsLogin(false);
      apiClient.stopActionRefreshToken();
      throw validatedError;
    }
  };
  // const handleFootballOrder = (data: any) => {
  //   const DATA = getValue(data, 'data', []);
  //   const isSameOrAfterData = _.filter(DATA, o => {
  //     const today = moment().format('DD/MM/YYYY HH');
  //     let isAfter = moment(o.timeBooking, 'DD/MM/YYYY ').isSameOrAfter(
  //       moment(today, 'DD/MM/YYYY '),
  //     );
  //     if (isAfter) {
  //       // const diff = moment(o.timeBooking, "DD/MM/YYYY ").diff(moment());
  //       // if (diff >= 6) {
  //       //   return o;
  //       // }
  //       return o;
  //     }
  //   });
  //   dispatch(setFootballOrderData(isSameOrAfterData));
  //   dispatch(setCountOrder(isSameOrAfterData.length));
  //   const isSameOrBeforeData = _.filter(DATA, o => {
  //     const today = moment().format('DD/MM/YYYY HH');
  //     let isBefore = moment(o.timeBooking, 'DD/MM/YYYY ').isSameOrAfter(
  //       moment(today, 'DD/MM/YYYY '),
  //     );
  //     if (isBefore) {
  //       // const diff = moment(o.timeBooking, "DD/MM/YYYY ").diff(moment());
  //       // if (diff >= 6) {
  //       //   return o;
  //       // }
  //       return o;
  //     }
  //   });
  //   dispatch(setHistoryOrderData(isSameOrBeforeData));
  //   //const size =_.size(data)
  //   //	const size= {$size: data.length}
  //   // res.json({size: dataFilter.length, dataFilter});
  //   // console.log("Thanh Cong99",data,{ size: size})
  // };
  /* Xử lý Logout */
  const _onLogout = async () => {
    apiClient.stopActionRefreshToken();
    try {
      // await logoutAPI.revokeToken();
      setBasicUserInfo(undefined);
      setDetailUserInfo(undefined);
    } catch (err) {
      throw err;
    }
  };
  /* Xử lý Login */
  const _onLogin = (userLogin: IUserLogin): Promise<boolean> => {
    console.log('login user', userLogin);
    return new Promise<boolean>((resolve, reject) => {
      _loginWithUserNameAndPassword(userLogin.username, userLogin.password)
        .then(() => {
          resolve(true);
          setIsLogin(true);
        })
        .catch(error => {
          reject(error);
          setIsLogin(false);
        });
    });
  };
  const userContext = useMemo<IUserContext>(() => {
    return {
      onLogin: _onLogin,
      onLogout: _onLogout,
      resetTimeOut: () => {
        setLocalTimeOutCount(0);
      },
      getBasiclUserLoginInfo: () => {
        return basicUserInfo;
      },
      getIsLogin: () => {
        return isLogin;
      },
      changeUserLogin: () => {
        setPrevUser(undefined);
      },
      getDetailUserLoginInfo: () => {
        return detailUserInfo;
      },
      getPrevUserLogin: () => {
        return prevUser;
      },
      getHrisCode: () => {
        return hrisCode;
      },
    };
  }, [prevUser, basicUserInfo, detailUserInfo]);

  return (
    <AppViewWithFullScreenLoading
      style={styles.container}
      isLoading={loading}
      textLoading={translate('logging_out')}>
      <AppUserContext.Provider value={userContext} {...props} />
    </AppViewWithFullScreenLoading>
  );
};
const useAppUser = () => {
  const context = React.useContext<IUserContext>(AppUserContext);
  return context;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export {AppUserProvider, AppUserContext, useAppUser};
