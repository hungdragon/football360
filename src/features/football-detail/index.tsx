import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  StatusBar,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {useDispatch} from 'react-redux';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {SafeAreaView} from 'react-native-safe-area-context';

import moment from 'moment';
import 'moment/locale/vi';
import {useAppSelector} from 'app/hooks';
import {image} from 'assets/icons';
import AppHeader from 'components/AppHeader/AppHeader';
import {
  setIdSlot,
  setPitchPrice,
} from 'features/book-football-pitch/FootballSlice';
import {useNavigation} from '@react-navigation/native';
import {HelperText} from 'react-native-paper';
const FootballDetail: React.FC<{route: any}> = ({route}) => {
  const {id, price} = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const fullName = useAppSelector(state => state.loginState.fullName);
  const phoneNumber = useAppSelector(state => state.loginState.phoneNumber);
  const pitchName = useAppSelector(state => state.findPitchState.pitchName);
  const timeSlot = useAppSelector(state => state.FootballState.timeSlot);
  const currentDate = moment().format('L');
  dispatch(setIdSlot(id));
  const [txtFullName, setTxtFullName] = useState<string>(fullName);
  const [txtPhoneNumber, setTxtPhoneNumber] = useState<string>(phoneNumber);
  const [content, setContent] = useState('...');
  const discount = 15.0;
  const Total = price - discount;
  console.log(Total.toFixed(3));
  useEffect(() => {}, []);
  const changeFullName = (value: string) => {
    setTxtFullName(value);
  };
  const contentInputChange = (value: string) => {
    setContent(value);
  };
  const changePhoneNumber = (value: string) => {
    setTxtPhoneNumber(value);
  };
  function next() {
    dispatch(setPitchPrice(Total.toFixed(3)));
    navigation.navigate(
      'Payment' as never,
      {
        id_slotTime: id,
        pitch_price: Total.toFixed(3),
        timeSlot: timeSlot,
        fullName: txtFullName,
        content: content,
        phoneNumber: txtPhoneNumber,
      } as never,
    );
  }
  const textErrorPhoneNumber = () => {
    return !txtPhoneNumber.toString();
  };
  const textErrorPhoneFullName = () => {
    return !txtFullName?.toString();
  };
  return (
    <View>
      <StatusBar backgroundColor="green" barStyle="dark-content" />
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <SafeAreaView>
          <View style={styles.Header}>
            <AppHeader title={pitchName} />
            <View style={styles.text_Date_View}>
              <IconFontAwesome
                style={{paddingVertical: 5, fontSize: 20}}
                name="calendar"
                color="white"
              />
              <Text style={styles.text_Date}>{currentDate}</Text>
            </View>
          </View>
          <View style={styles.Body_block}>
            <View style={styles.body_wrap}>
              <View style={styles.top_block}>
                <IconAntDesign
                  name="clockcircleo"
                  color="black"
                  style={styles.IC_clock}
                />
                <Text style={styles.text_timeFootball}>{timeSlot}</Text>
                <Image
                  source={image?.Icon_pitch}
                  style={{width: 30, height: 30}}
                />
              </View>

              <View style={styles.input_info}>
                <IconAntDesign
                  name="user"
                  style={{fontSize: 18, paddingVertical: 5}}
                />

                <TextInput
                  style={{width: '96%', paddingHorizontal: 5}}
                  onChangeText={val => changeFullName(val)}
                  placeholder="Nhập tên">
                  {txtFullName}
                </TextInput>
              </View>
              <HelperText type="error" visible={textErrorPhoneFullName()}>
                FullName is invalid!
              </HelperText>
              <View style={styles.input_info}>
                <IconFontAwesome
                  name="phone"
                  style={{fontSize: 18, paddingVertical: 5}}
                />

                <TextInput
                  style={{width: '96%', paddingHorizontal: 5}}
                  onChangeText={val => changePhoneNumber(val)}
                  placeholder="Nhập số điện thoại">
                  {txtPhoneNumber}
                </TextInput>
              </View>
              <HelperText type="error" visible={textErrorPhoneNumber()}>
                Phone Number is invalid!
              </HelperText>
              <TextInput
                placeholder="Thông tin thêm"
                multiline={true}
                numberOfLines={4}
                style={styles.input_info_area}
                onChangeText={val => contentInputChange(val)}
              />

              <View style={styles.input_info_2}>
                <View style={styles.input_info_2_1}>
                  <Text>Tiền sân</Text>
                  <Text style={{fontWeight: 'bold', marginRight: 3}}>
                    {price}
                  </Text>
                </View>
                <View style={styles.input_info_2_1}>
                  <Text style={styles.input_info_2_0}>Được giảm giá</Text>
                  <View style={styles.input_info_2_2}>
                    <Text style={{marginVertical: 5}}>15.000</Text>
                    <Text style={styles.discount_LINE_STYLE} />
                    <Text style={{marginVertical: 5, fontWeight: 'bold'}}>
                      %
                    </Text>
                  </View>
                </View>
                <View style={styles.input_info_2_1}>
                  <Text style={styles.input_info_2_0}>Tổng tiền</Text>
                  <Text style={styles.input_info_2_3}>{Total.toFixed(3)}</Text>
                </View>
              </View>

              <View>
                {/* <Text style={styles.btn_ss} onPress={()=>navigation.navigate('NavigationBack',{ix:5})}> ĐẶT SÂN</Text> */}

                {!txtFullName.toString() || !txtPhoneNumber.toString() ? (
                  <View style={[styles.btnView, {backgroundColor: '#e5e5e5'}]}>
                    <Text style={[styles.btn_ss]}>ĐẶT SÂN</Text>
                  </View>
                ) : (
                  <View style={styles.btnView}>
                    <Text style={styles.btn_ss} onPress={() => next()}>
                      ĐẶT SÂN
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </View>
  );
};
const styles = StyleSheet.create({
  Header: {
    height: '40%',
    backgroundColor: 'green',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  text_Date_View: {
    flexDirection: 'row',
    backgroundColor: '#006400',
    padding: 5,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    borderRadius: 5,

    //marginTop: 10,
  },
  text_Date: {
    height: 30,
    fontSize: Platform.OS === 'ios' ? 16 : 20,
    marginLeft: 5,
    color: 'white',
    padding: 2,
  },

  // Body
  Body_block: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    marginHorizontal: 20,
    marginTop: '-40%',
    borderRadius: 10,
    elevation: 20,
  },
  body_wrap: {
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 5,
  },
  top_block: {
    flexDirection: 'row',
  },
  text_timeFootball: {
    fontSize: Platform.OS === 'ios' ? 12 : 15,
    color: 'black',
    marginBottom: 15,
    //marginVertical: 5,
    marginVertical: Platform.OS === 'ios' ? 6 : 5,
    marginEnd: 3,
    fontWeight: 'bold',
  },
  input_info: {
    flexDirection: 'row',
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'grey',
    marginVertical: 8,
  },
  input_info_area: {
    height: 100,
    textAlignVertical: 'top',
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'grey',
    marginVertical: 8,
  },
  input_info_2: {
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'grey',
    marginVertical: 8,
  },
  input_info_2_0: {
    paddingVertical: 6,
  },
  input_info_2_1: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'space-between',
    //alignItems:'flex-start'
    marginEnd: 30,
  },
  input_info_2_2: {
    flexDirection: 'row',
    //marginVertical:10,
    // justifyContent:'space-between',
    //alignItems:'flex-start'
    //marginEnd:30,
    paddingHorizontal: 6,
    //paddingVertical:6,
    width: '40%',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'gray',
    justifyContent: 'flex-end',
  },
  input_info_2_3: {
    flexDirection: 'row',
    //marginVertical:10,
    // justifyContent:'space-between',
    //alignItems:'flex-start'
    //marginEnd:30,
    paddingHorizontal: 6,
    paddingVertical: 6,
    width: '40%',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'gray',
    textAlign: 'right',
    color: 'red',
  },
  discount_LINE_STYLE: {
    borderLeftWidth: 1,
    // borderLeftColor: 'gray',
    backgroundColor: 'gray',
    marginHorizontal: 5,
    textAlign: 'right',
  },
  IC_clock: {
    paddingVertical: 6,
    fontSize: 20,
    paddingHorizontal: 3,
  },
  btnView: {
    borderRadius: 20,
    backgroundColor: 'green',
    marginVertical: 10,
  },
  btn_ss: {
    justifyContent: 'center',
    // backgroundColor: 'green',
    color: 'white',
    // borderRadius: 30,
    paddingVertical: 10,

    textAlign: 'center',
    // marginHorizontal: 60,
    // marginBottom: 20,
  },
  //back
  backView: {
    flexDirection: 'row',
    marginHorizontal: 15,
    paddingVertical: 10,
  },
});
export default FootballDetail;
