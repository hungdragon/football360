import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import * as Animatable from 'react-native-animatable';
import {useDispatch} from 'react-redux';
import moment from 'moment';
import 'moment/locale/vi';
import axios from 'axios';
import {useAppSelector} from 'app/hooks';
import {appConstants} from 'constants/const';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  setBayUpData,
  setCocaData,
  setIsSignFootball,
  setMarData,
  setProductServiceData,
  setReviveData,
} from 'features/book-football-pitch/FootballSlice';
import {FootballApi} from 'features/book-football-pitch/FootballApi';
interface Props {
  navigation: any;
  route: any;
}
const ModalPayment: React.FC<Props> = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {ID_goback, Total} = route.params;
  console.log('aaa---', ID_goback);
  const idBack = ID_goback;

  // const productServiceDATA = useAppSelector(
  //   state => state.FootballState.productServiceData,
  // );
  const [userName, setUserName] = useState<any>('');
  //const id = useAppSelector(state => state.FootballState.id);
  useEffect(() => {
    getUserInfomation();
  }, []);
  const gotoHome = () => {
    callApi();
    navigation.navigate('BookFootballPitch', {
      ID_goback: ID_goback,
    }); // truyền lại về View A
  };
  const getUserInfomation = async () => {
    setUserName(
      await AsyncStorage.getItem(appConstants.ASYNC_STORAGE_KEY.USER_NAME),
    );
  };
  const customerName = useAppSelector(state => state.loginState.fullName);
  const numberPhone = useAppSelector(state => state.loginState.phoneNumber);
  // const username = useAppSelector(state => state.loginState.username);

  const pitchName = useAppSelector(state => state.findPitchState.pitchName);
  console.log('pitchName----', pitchName);
  const timeBooking = useAppSelector(
    state => state.FootballState.dateTimeBooking,
  );
  const date = moment().format('L');
  const location = useAppSelector(state => state.findPitchState.location);
  const total = useAppSelector(state => state.FootballState.totalCustomer);
  const comment = useAppSelector(state => state.FootballState.comment);
  const timeSlot = useAppSelector(state => state.FootballState.timeSlot);
  const pricePitch = useAppSelector(state => state.FootballState.PitchPrice);

  const cocaData = useAppSelector(state => state.FootballState.cocaData);
  const bayUpData = useAppSelector(state => state.FootballState.bayUpData);
  const reviveData = useAppSelector(state => state.FootballState.reviveData);
  const marData = useAppSelector(state => state.FootballState.marData);
  const dataService = [...cocaData, ...bayUpData, ...reviveData, ...marData];
  console.log(
    customerName,
    numberPhone,
    userName,
    pitchName,
    timeBooking,
    date,
    location,
    total,
    comment,
  );
  const time = timeSlot.slice(0, 5);
  const timeBookingDateTime = `${timeBooking} ${time}`;
  const params = {
    pitchName,
    timeSlot,
    timeBookingDateTime,
    date,
    customerName,
    numberPhone,
    comment,
    pricePitch,
    dataService,
    location,
    total,
    userName,
  };
  const callApi = async () => {
    FootballApi.football_bill(params)
      .then(() => {
        dispatch(setProductServiceData([]));
        // dispatch(setProductServiceData([]));
        console.log('da xoa san pham');
        dispatch(setReviveData([]));
        dispatch(setCocaData([]));
        dispatch(setBayUpData([]));
        dispatch(setMarData([]));
        dispatch(setIsSignFootball(true));
      })
      .catch((err: any) => {
        console.log('Err API product Service', err);
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.modalBlock}>
        <View style={styles.modalWrap}>
          <Animatable.Text animation="bounceIn">
            <AntDesignIcon
              name="circledown"
              size={Platform.OS === 'ios' ? 30 : 50}
              style={{color: '#00FF00'}}
            />
          </Animatable.Text>
          <Text style={styles.textSuccess}>
            {/* {"Thanh toán thành công" + Total + "---" + ID_goback} */}
            {'Thanh toán thành công'}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('CreateTeams', {idBack: idBack});
            callApi();
          }}>
          <View style={styles.cableView}>
            <AntDesignIcon
              name="pluscircle"
              size={20}
              style={{color: 'orange'}}
            />
            <Text style={styles.textCable}>Tạo cáp kèo</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.goHome}>
          <TouchableOpacity
            onPress={() => {
              gotoHome();
              // callApiBooking();
            }}>
            <Text style={styles.textHome}>Đi đến trang chủ</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'gray',
  },
  modalBlock: {
    height: 200,
    width: 300,
    backgroundColor: '#FFF',
    elevation: 20,
    borderRadius: 10,
  },
  modalWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.8,
    //flexWrap:'wrap'
  },
  textSuccess: {
    fontSize: Platform.OS === 'ios' ? 12 : 20,
    marginLeft: 3,
  },
  cableView: {
    flexDirection: 'row',
    //justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 40,
  },
  textCable: {
    marginLeft: 3,
  },
  goHome: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginHorizontal: 30,
  },
  textHome: {
    color: 'red',
    textDecorationLine: 'underline',
  },
});

export default ModalPayment;
