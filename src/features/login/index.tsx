import React, {useEffect, useState} from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Image,
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  Text,
  Dimensions,
  Alert,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {TextInput} from 'react-native-paper';

import {AppError, handleException, translate} from 'utils';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {PrevUser, useAppUser} from 'context/AppUserContext';
import {useDialog} from 'components/dialog/AppDialogContext';
import AppText from 'components/text/AppText';
import AppView from 'components/view/AppView';
import {appConstants} from 'constants/const';
import LinearGradient from 'react-native-linear-gradient';
import {image} from 'assets/icons';
import Register from './register/Register';
import {useDispatch} from 'react-redux';
import {setIsChangeForm} from './loginSlice';
import {useAppSelector} from 'app/hooks';
import {styles} from './style';
// import {firebase} from '@react-native-firebase/auth';
// import auth from '@react-native-firebase/auth';

const Login: React.FC = () => {
  // const {onLogin} = useAppUser();
  const {showDialog} = useDialog();
  const {getPrevUserLogin, onLogin} = useAppUser();
  const [userName, setUserName] = useState<any>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  // const [message, setMessage] = useState<string>('');
  const [togglePassword, setTogglePassword] = useState<boolean>(true);
  const [storeUsername, setStoreUsernam] = useState<PrevUser | undefined>();
  const [fullName, setFullName] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const prevUser = getPrevUserLogin();
  useEffect(() => {
    getUserInfomation();
  }, [prevUser?.userName]);

  const getUserInfomation = async () => {
    setUserName(
      await AsyncStorage.getItem(appConstants.ASYNC_STORAGE_KEY.USER_NAME),
    );
  };
  const createUser = () => {
    // auth()
    //   .createUserWithEmailAndPassword('vanhung', '12345')
    //   .then(() => {
    //     console.log('User account created & signed in!');
    //   })
    //   .catch(error => {
    //     if (error.code === 'auth/email-already-in-use') {
    //       console.log('That email address is already in use!');
    //     }
    //     if (error.code === 'auth/invalid-email') {
    //       console.log('That email address is invalid!');
    //     }
    //     console.error(error);
    //   });
  };
  const callApiLogin = () => {
    // createUser();
    Keyboard.dismiss();
    setLoading(true);
    // let jwtToken = firebase.auth().onAuthStateChanged(function (user) {
    //   if (user) {
    //     user.getIdToken().then(function (idToken) {
    //       // <------ Check this line
    //       Alert.alert(idToken); // It shows the Firebase token now
    //       return idToken;
    //     });
    //     return null;
    //   }
    // });
    // console.log('aaaaaa---', jwtToken);

    // const checkUsername = storeUsername ? storeUsername?.userName : username;

    onLogin({username: userName, password: password})
      .then(() => {
        // setLoading(false);
        // return;
      })
      .catch(error => {
        setLoading(false);
        const status = (error as AppError).code;
        const message = (error as AppError).message as string;
        if (status === appConstants.APP_CODE.INVALID_ERROR_CODE) {
          setErrorMessage(message);
        } else if (status === appConstants.API_STATUS_CODE.BAD_REQUEST) {
          setErrorMessage(translate('account_disable'));
        } else if (status === appConstants.API_STATUS_CODE.UNAUTHORIZED) {
          setErrorMessage(translate('invalid_mail_or_password'));
        } else if (status === appConstants.API_STATUS_CODE.FORBIDDEN) {
          setErrorMessage(translate('forbidden_error'));
        } else if (status === appConstants.API_STATUS_CODE.REQUEST_TIMEOUT) {
          setErrorMessage(translate('request_time_out'));
        } else if (
          status === appConstants.API_STATUS_CODE.NOT_IMPLEMENTED ||
          status === appConstants.API_STATUS_CODE.BAD_GATEWAY ||
          status === appConstants.API_STATUS_CODE.SERVICE_UNAVAILABLE ||
          status === appConstants.API_STATUS_CODE.GATEWAY_TIMEOUT
        ) {
          setErrorMessage(translate('error_call_api'));
        } else if (status === appConstants.APP_CODE.PERMISSION_ERROR_CODE) {
          showDialog({
            dialogType: 'info',
            title: translate('notification'),
            message: message,
            description: 'description',
            buttonCancel: {
              onPress: () => {},
              label: translate('close'),
              // color: theme.colors.clearBlue,
              color: ' blue',
            },
          });
        } else {
          showDialog({
            dialogType: 'warning',
            title: translate('notification'),
            message: message,
            description: 'description',
            buttonCancel: {
              onPress: () => {},
              label: translate('close'),
              // color: theme.colors.clearBlue,
              color: ' blue',
            },
          });
        }
      });
  };
  const _logger = () => {
    setLoading(false);
  };

  const _getPrevUserFromStorage = async () => {
    try {
      const prevUserNameFromAsyncStorage = await AsyncStorage.getItem(
        appConstants.ASYNC_STORAGE_KEY.PREV_USER_NAME,
      );
      const fullNameFromAsyncStorage = await AsyncStorage.getItem(
        appConstants.ASYNC_STORAGE_KEY.USER_NAME,
      );
      if (prevUserNameFromAsyncStorage) {
        setStoreUsernam(JSON.parse(prevUserNameFromAsyncStorage) as PrevUser);
        setFullName(fullNameFromAsyncStorage);
      } else {
        setStoreUsernam(undefined);
      }
    } catch (err) {
      handleException(err);
    }
  };
  const removeUserFromStorage = async () => {
    try {
      // await AsyncStorage.removeItem(
      //   appConstants.ASYNC_STORAGE_KEY.PREV_USER_NAME,
      // );
      // await AsyncStorage.removeItem(appConstants.ASYNC_STORAGE_KEY.USER_NAME);
      setStoreUsernam(undefined);
      setFullName(undefined);
      return true;
    } catch (error) {
      return false;
    }
  };

  const removeStoreUsername = () => {
    removeUserFromStorage()
      .then(() => {})
      .catch(() => {});
  };

  React.useEffect(() => {
    SplashScreen.hide();
    _getPrevUserFromStorage()
      .then(() => {})
      .catch(() => {});
  }, []);
  const dispatch = useDispatch();

  const changeForm = useAppSelector(state => state.loginState.isChangeForm);
  function handleChangeForm() {
    //console.log('aaaaaa');
    // setChangeForm(!changeForm);
    dispatch(setIsChangeForm(true));
  }
  return (
    <TouchableWithoutFeedback
      style={styles.container}
      onPress={() => {
        _logger();
        Keyboard.dismiss();
      }}>
      <LinearGradient
        colors={['#91F74D', '#59cc0c', '#4db806']}
        style={styles.container}>
        <SafeAreaView style={styles.container}>
          <AppView style={styles.logoView}>
            <Animatable.Image
              animation="fadeInDown"
              source={image.IC_Football_Logo}
              style={{width: '90%', height: '90%'}}
            />
          </AppView>
          {!changeForm ? (
            <Animatable.View animation="fadeInUp" style={styles.formBlock}>
              <AppView style={styles.formGroupView}>
                <AppView style={styles.userNameView}>
                  <View style={styles.userNameGroupView}>
                    <TextInput
                      style={styles.txt_username}
                      dense
                      value={userName}
                      label={translate('username')}
                      mode="outlined"
                      outlineColor="#DCDCDC"
                      onChangeText={text => setUserName(text)}
                    />
                    <EntypoIcon name="user" size={22} style={styles.IC_user} />
                  </View>
                  <View style={styles.passwordGroupView}>
                    <TextInput
                      style={styles.txt_password}
                      dense
                      label={translate('password')}
                      onSubmitEditing={() => {
                        callApiLogin();
                      }}
                      mode="outlined"
                      outlineColor="#DCDCDC"
                      onChangeText={text => setPassword(text)}
                    />
                    <EntypoIcon
                      name="key"
                      size={20}
                      style={styles.IC_password}
                    />
                  </View>
                  <Text style={styles.txt_forgetPassword}>
                    {translate('forgetPassword')}
                  </Text>
                  {errorMessage ? (
                    <AppText boldOrLight={'normal'} style={styles.invalidText}>
                      {errorMessage}
                    </AppText>
                  ) : null}
                  <View style={styles.btnLoginView}>
                    <LinearGradient
                      colors={['#4db806', '#59cc0c', '#79BD71']}
                      style={{borderRadius: 5}}>
                      <TouchableOpacity onPress={callApiLogin}>
                        <AppText style={styles.txt_login}>
                          {translate('login')}
                        </AppText>
                      </TouchableOpacity>
                    </LinearGradient>
                    <View style={styles.dontHavePasswordView}>
                      <Text>Bạn chưa có tài khoản?</Text>
                      <Text
                        //style={{backgroundColor: 'red'}}
                        onPress={() => {
                          handleChangeForm();
                        }}>
                        <Text style={{color: 'red'}}> Đăng ký</Text>
                      </Text>
                    </View>
                  </View>
                  <View style={styles.LoginOtherView}>
                    <AntDesignIcon
                      name="facebook-square"
                      size={40}
                      style={{color: 'blue'}}
                    />
                    <AntDesignIcon
                      name="google"
                      size={40}
                      style={{color: 'red'}}
                    />
                    <AntDesignIcon
                      name="twitter"
                      size={40}
                      style={{color: 'purple'}}
                    />
                  </View>
                </AppView>
              </AppView>
            </Animatable.View>
          ) : (
            <Register />
          )}
        </SafeAreaView>
      </LinearGradient>

      {/* <AppView style={styles.container}>
        <AppView style={styles.containerLogo}>
          <Image source={image.LOGO_LOGIN} />
        </AppView>
        <AppView style={styles.containerContent}>
          <AppView>
            {checkEmptyOrUnderfined(storeUsername) ? (
              <>
                <AppText style={styles.titleLogo}>
                  Vui lòng đăng nhập để sử dụng tất cả tính năng của ứng dụng
                </AppText>
                <AppView style={styles.containerInput}>
                  <TextInput
                    style={styles.input}
                    placeholder={'username222'}
                    placeholderTextColor={'#82888E'}
                    value={username}
                    onChangeText={(text: string) => setUsename(text)}
                  />
                  <AppText boldOrLight={'bold'} style={styles.textInput}>
                    {'username11'}
                  </AppText>
                </AppView>
              </>
            ) : (
              <AppView style={styles.containerStoreData}>
                <AppText style={styles.hello}>Xin chào,</AppText>
                <AppText style={styles.userName}>{fullName}</AppText>
              </AppView>
            )}

            <AppView style={[styles.containerInput, styles.paddingInput]}>
              <TextInput
                style={styles.input}
                placeholder={translate('password_placeholder')}
                placeholderTextColor={'#82888E'}
                onSubmitEditing={() => {
                  _onLogin(username, password);
                }}
                value={password}
                onChangeText={(text: string) => setPassword(text)}
                secureTextEntry={togglePassword}
              />
              <AppText
                boldOrLight={'bold'}
                style={[styles.textInput, styles.textInputPassword]}>
                {translate('password')}
              </AppText>
              <TouchableOpacity
                style={styles.eyeImage}
                onPress={() => setTogglePassword(!togglePassword)}>
                {!togglePassword ? (
                  <Image source={image.EYE_LOGIN2} style={styles.eyeLogin} />
                ) : (
                  <Image source={image.EYE_LOGIN} style={styles.eyeLogin} />
                )}
              </TouchableOpacity>
            </AppView>
            <TouchableOpacity
              style={styles.submitContent}
              onPress={() => _onLogin(username, password)}>
              <AppText style={styles.colorSubmit}>{translate('login')}</AppText>
            </TouchableOpacity>
            <AppView
              style={[
                styles.containerForgetPassword,
                !storeUsername ? styles.centerRow : styles.flexRow,
              ]}>
              <TouchableOpacity style={styles.backgroundForgetPassword}>
                <AppText style={styles.forgetPassword}>Quên mật khẩu</AppText>
              </TouchableOpacity>
              {storeUsername && (
                <TouchableOpacity
                  style={styles.backgroundForgetPassword2}
                  onPress={removeStoreUsername}>
                  <AppText style={styles.forgetPassword}>
                    Đăng nhập tài khoản khác
                  </AppText>
                </TouchableOpacity>
              )}
            </AppView>
          </AppView>
        </AppView>
        <AppView style={styles.containerFooter}>
          <Image
            source={image.BACKGROUND_LOGIN}
            resizeMode="stretch"
            style={styles.imageBackground}
          />
        </AppView>
      </AppView> */}
    </TouchableWithoutFeedback>
  );
};
export default Login;
