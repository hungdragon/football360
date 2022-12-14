import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useDialog} from 'components/dialog/AppDialogContext';
import AppViewWithFullScreenLoading from 'components/view/AppViewWithFullScreenLoading';
import {useAppUser} from 'context/AppUserContext';

import React, {useState} from 'react';
import {BackHandler, StyleSheet, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import {translate} from 'utils';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {AppError} from 'utils/Utils';
import UserInfo from 'features/user-Info/UserInfo';
import FindPitch from 'features/find-pitch';
import TeamList from 'features/find-away-team/TeamList';
//Params
export type AppTabParamList = {
  Menu: undefined;
  PersonalInformation: undefined;
  Dashboard: {dashboardId: 'dashboardId1' | 'dashboardId2'};
  Relative: undefined;
  CommunistParty: undefined;
  Home: undefined;
  User: undefined;
  FindAwayTeam: undefined;
};
const AppTab = createBottomTabNavigator<AppTabParamList>();
const AppTabNavigation: React.FC = () => {
  const theme = useTheme();
  const {onLogout} = useAppUser();
  const {showDialog} = useDialog();
  const [loading, setLoading] = useState<boolean>(false);
  const handleLogout = () => {
    if (!loading) {
      setLoading(true);
      onLogout()
        .then(() => {
          setLoading(false);
        })
        .catch(error => {
          setLoading(false);
          const message = (error as AppError).message;
          showDialog({
            dialogType: 'error',
            title: translate('notification'),
            message: message,
            description: 'description',
            buttonCancel: {
              label: translate('close'),
              color: theme.colors.clearBlue,
            },
            buttonCancel: {label: translate('close'), color: theme.colors.blue},
          });
        });
    }
  };
  ///useEffect
  //it is Android
  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);
  const backAction = () => {
    showDialog({
      dialogType: 'info',
      title: translate('logout'),
      message: translate('warning_logout'),
      description: 'description',
      buttonAccept: {
        onPress: handleLogout,
        label: translate('accept'),
        color: theme.colors.primaryBlue,
      },
      buttonCancel: {label: translate('cancel'), color: theme.colors.clearBlue},
      buttonAccept: {
        onPress: handleLogout,
        label: translate('accept'),
        color: theme.colors.blue,
      },
      buttonCancel: {label: translate('cancel'), color: theme.colors.blue},
    });
    return true;
  };
  return (
    <AppViewWithFullScreenLoading
      isLoading={loading}
      textLoading={translate('logging_out')}
      style={[styles.container, {backgroundColor: theme.colors.white}]}>
      <AppTab.Navigator>
        <AppTab.Screen
          name="Home"
          component={FindPitch}
          options={{
            headerShown: false,
            title: translate('home'),
            tabBarIcon: () => <AntDesignIcon name="appstore-o" size={22} />,
          }}
        />
        <AppTab.Screen
          name="User"
          component={UserInfo}
          options={{
            headerShown: false,
            title: translate('user'),
            tabBarIcon: () => (
              <View
                style={{
                  backgroundColor: 'blue',
                  position: 'absolute',
                  bottom: 10,
                  
                  paddingHorizontal:15,
                  paddingVertical:11,
                  borderRadius: 40,
                }}>
                <FontAwesome name="user" size={30} style={{color: '#fff'}} />
              </View>
            ),
          }}
        />
        <AppTab.Screen
          name="FindAwayTeam"
          component={TeamList}
          options={{
            title: translate('findAwayTeam'),
            tabBarIcon: () => <AntDesignIcon name="scan1" size={22} />,
          }}
        />
      </AppTab.Navigator>
    </AppViewWithFullScreenLoading>
  );
};
export default AppTabNavigation;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    marginLeft: 70,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  logoContainer: {
    height: 70,
    flex: 1,
    overflow: 'hidden',
    alignItems: 'center',
  },
});
