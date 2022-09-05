import {NavigatorScreenParams} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
//import {useAppUser} from '../context/AppUserContext';
import Login from '../features/login';
import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme, View} from 'react-native';
import AppTabNavigation, {AppTabParamList} from './AppTabNavigation';
import {useAppUser} from 'context/AppUserContext';
import PitchDetail from 'features/find-pitch-detail';
import BookFootballPitch from 'features/book-football-pitch/BookFootballPitch';
import FootballDetail from 'features/football-detail';
import Payment from 'features/Payment/Payment';
import ProductServices from 'features/add-product/ProductServices';
import PaymentMethod from 'features/Payment/PaymentMethod';
import PaymentCardInfo from 'features/Payment/PaymentCardInfo';
import CheckoutScreen from 'features/Payment/Pay/CheckoutScreen';
import ModalPayment from 'features/Payment/Pay/ModalPayment';
import EditScreen from 'components/EditScreen';
import UserUpdate from 'features/user-Info/UserUpdate';
import UserInfo from 'features/user-Info/UserInfo';
import FootballOrder from 'features/user-Info/FootballOrder/FootballOrder';
import FootballOrderDetail from 'features/user-Info/FootballOrder/FootballOrderDetail';
import HistoryOrder from 'features/user-Info/FootballOrder/HistoryOrder';
import CreateTeams from 'features/find-away-team/CreateTeams';
import TeamDetail from 'features/find-away-team/TeamDetail';
import TeamList from 'features/find-away-team/TeamList';
import FootballRequest from 'features/user-Info/footballRequest';
import FootballRequestDetail from 'features/user-Info/footballRequest/FootballRequestDetail';
import SearchNamePitch from 'features/find-pitch/search-name';
import Notification from 'notification';
import FootballPitchCreate from 'manage/footballPitch-create';
import BottomManageNavigation from './BottomManageNavigation';

export type RootStackParamList = {
  Login: undefined;
  AppTab: NavigatorScreenParams<AppTabParamList>;
  Dialog: undefined;
  FindPitchDetail: undefined;
  BookFootballPitch: undefined;
  FootballDetail: undefined;
  Payment: undefined;
  ProductServices: undefined;
  PaymentMethod: undefined;
  PaymentCardInfo: undefined;
  CheckoutScreen: undefined;
  StripeContainer: undefined;
  ModalPayment: undefined;
  EditScreen: undefined;
  UserUpdate: undefined;
  UserInfo: undefined;
  FootballOrder: undefined;
  FootballOrderDetail: undefined;
  HistoryOrder: undefined;
  CreateTeams: undefined;
  TeamDetail: undefined;
  TeamList: undefined;
  FootballRequest: undefined;
  FootballRequestDetail: undefined;
  SearchNamePitch: undefined;
  Notification: undefined;
  //manage
  FootballPitchCreate: undefined;
  BottomManageNavigation: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootStackNavigation: React.FC = () => {
  //const isDarkMode = useColorScheme() === 'dark';
  const isDarkMode = false;
  const backgroundStyle = {
    //backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
    // backgroundColor: 'red'
  };
  const {getBasiclUserLoginInfo, resetTimeOut} = useAppUser();
  const detailUserInfo = getBasiclUserLoginInfo();
  console.log('detailUserInfo -----', detailUserInfo);
  //const isLogin = true;
  /**options Show Screen cho thằng App Tab */
  const groupStackAppTabScreenOptions: NativeStackNavigationOptions = {
    headerShown: false,
    presentation: 'card',
  };
  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {detailUserInfo?.isAdmin === '0' ? (
        <RootStack.Navigator>
          <RootStack.Group screenOptions={() => groupStackAppTabScreenOptions}>
            <RootStack.Screen name="AppTab" component={AppTabNavigation} />
            <RootStack.Screen name="FindPitchDetail" component={PitchDetail} />
            <RootStack.Screen
              name="BookFootballPitch"
              component={BookFootballPitch}
            />
            <RootStack.Screen
              name="FootballDetail"
              component={FootballDetail}
            />
            <RootStack.Screen name="Payment" component={Payment} />
            <RootStack.Screen name="PaymentMethod" component={PaymentMethod} />
            <RootStack.Screen
              name="PaymentCardInfo"
              component={PaymentCardInfo}
            />
            <RootStack.Screen
              name="CheckoutScreen"
              component={CheckoutScreen}
            />

            <RootStack.Screen
              name="ProductServices"
              component={ProductServices}
            />
            <RootStack.Screen name="ModalPayment" component={ModalPayment} />
            <RootStack.Screen name="FootballOrder" component={FootballOrder} />
            <RootStack.Screen name="HistoryOrder" component={HistoryOrder} />
            <RootStack.Screen name="CreateTeams" component={CreateTeams} />
            <RootStack.Screen name="TeamList" component={TeamList} />
            <RootStack.Screen name="TeamDetail" component={TeamDetail} />
            <RootStack.Screen
              name="FootballRequest"
              component={FootballRequest}
            />
            <RootStack.Screen
              name="FootballOrderDetail"
              component={FootballOrderDetail}
            />
            <RootStack.Screen
              name="FootballRequestDetail"
              component={FootballRequestDetail}
            />
            <RootStack.Screen
              name="SearchNamePitch"
              component={SearchNamePitch}
            />
            <RootStack.Screen name="Notification" component={Notification} />
          </RootStack.Group>
          <RootStack.Group screenOptions={() => groupStackAppTabScreenOptions}>
            <RootStack.Screen name="UserInfo" component={UserInfo} />
            <RootStack.Screen name="EditScreen" component={EditScreen} />
            <RootStack.Screen name="UserUpdate" component={UserUpdate} />
          </RootStack.Group>
          {/* ---- */}
          <RootStack.Group screenOptions={() => groupStackAppTabScreenOptions}>
            <RootStack.Screen name="Dialog" component={View} />
          </RootStack.Group>
        </RootStack.Navigator>
      ) : detailUserInfo?.isAdmin === '1' ? (
        <RootStack.Navigator>
          <RootStack.Group screenOptions={() => groupStackAppTabScreenOptions}>
            <RootStack.Screen
              name="BottomManageNavigation"
              component={BottomManageNavigation}
            />
            <RootStack.Screen
              name="FootballPitchCreate"
              component={FootballPitchCreate}
            />
          </RootStack.Group>
        </RootStack.Navigator>
      ) : (
        <RootStack.Navigator>
          <RootStack.Group screenOptions={() => groupStackAppTabScreenOptions}>
            <RootStack.Screen name="Login" component={Login} />
          </RootStack.Group>
        </RootStack.Navigator>
      )}
    </>
  );
};
export default RootStackNavigation;
