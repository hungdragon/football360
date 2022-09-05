import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  StatusBar,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';
import RowInfoMiddle from 'components/RowInfomation/RowInfo';
import {useAppSelector} from 'app/hooks';
import {useNavigation} from '@react-navigation/native';
import {useAppUser} from 'context/AppUserContext';
import {findAwayTeamApi} from './findAwayTeamApi';
import {setSignal} from './findAwayTeamSlice';
interface Props {
  route: {
    params: {
      idBack: string | number;
    };
  };
  navigation: any;
}
const CreateTeams: React.FC<Props> = ({route, navigation}) => {
  const idBack = route.params.idBack;
  const dispatch = useDispatch();
  // const navigation = useNavigation();
  const {getHrisCode} = useAppUser();
  const userName = getHrisCode();
  const [team, setTeam] = useState('');
  const [message, setMessage] = useState('');
  const pitchName = useAppSelector(state => state.findPitchState.pitchName);
  const contact = useAppSelector(state => state.loginState.fullName);
  const timeSlot = useAppSelector(state => state.FootballState.timeSlot);
  const dateTime = useAppSelector(state => state.FootballState.timeBooking);
  const phoneNumber = useAppSelector(state => state.loginState.phoneNumber);
  const pitchPrice = useAppSelector(state => state.FootballState.PitchPrice);
  const location = useAppSelector(state => state.findPitchState.location);
  ///fomat
  console.log('timeSlot---:', timeSlot);
  const hh = timeSlot.slice(0, 3);
  console.log('timeSlot--', hh);
  const dateTimeHH = `${dateTime} ${hh}`;
  console.log('dateTime----', dateTimeHH);
  const bodyRequest = {
    userName,
    team,
    pitchName,
    contact,
    timeSlot,
    dateTime,
    phoneNumber,
    pitchPrice,
    location,
    dateTimeHH,
    message,
  };
  const handleCreateCable = async () => {
    if (
      !pitchName ||
      !location ||
      !timeSlot ||
      !dateTime ||
      !dateTimeHH ||
      !pitchPrice ||
      !team ||
      !contact ||
      !phoneNumber ||
      !message ||
      !userName
    ) {
      Alert.alert('error field');
    } else {
      findAwayTeamApi
        .createTeams(bodyRequest)
        .then(() => {
          dispatch(setSignal(false));
          navigation.popToTop();
        })
        .catch(err => {
          console.log('eer', err);
        });
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar translucent backgroundColor="green" barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              // navigation.popToTop();
            }}>
            <Ionicons name="close" size={32} />
          </TouchableOpacity>
        </View>
        <View style={styles.body}>
          <ScrollView>
            <View style={styles.cardView}>
              <View style={styles.cardHeader}>
                <Text style={styles.H1}>{'Đăng ký cáp đội'}</Text>
                <Text style={styles.textHeader}>
                  {'Khung giờ :' + timeSlot}
                </Text>
                <Text style={styles.textHeader}>{dateTime}</Text>
                <Text style={styles.textHeader}>{'----------------'}</Text>
              </View>
              <View style={styles.cardBody}>
                <RowInfoMiddle label="Tên sân: " content={pitchName} />
                <RowInfoMiddle label="Người liên hệ: " content={contact} />
                <RowInfoMiddle label="Số điện thoại: " content={phoneNumber} />
                <RowInfoMiddle
                  label="Tiền sân: "
                  content={pitchPrice}
                  color="red"
                />
                <Text style={{marginTop: 15}} />
                {/* <View style={styles.cardLabel}>
                <View>
                  <Text style={[styles.cardTextLabel,{height:'auto'}]}>{"Tên sân:"}</Text>
                  <Text style={styles.cardTextLabel}>{"Người liên hệ:"}</Text>
                  <Text style={styles.cardTextLabel}>{"Số điện thoại:"}</Text>
                  <Text style={styles.cardTextLabel}>{"Tiền sân:"}</Text>
                </View>
              </View> */}
                {/* <View style={styles.cardContent}>
                <View>
                  <Text style={[styles.cardTextContent,{height:'auto'}]}>{namePitch}</Text>
                  <Text style={styles.cardTextContent}>{contact}</Text>
                  <Text style={styles.cardTextContent}>{phoneNumber}</Text>
                  <Text style={[styles.cardTextContent, { color: "red" }]}>
                    {price}
                  </Text>
                </View>
              </View> */}
              </View>
              <View style={styles.addressView}>
                <View style={styles.addressView_Wrap}>
                  <Text>Địa chỉ:</Text>
                  <Text style={styles.address}>{location}</Text>
                </View>
              </View>
              <View style={styles.formRegisterView}>
                <View style={styles.form}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Tên đội bóng..."
                    onChangeText={text => setTeam(text)}
                  />
                  <TextInput
                    style={styles.textInputArea}
                    multiline
                    maxLength={50}
                    numberOfLines={3}
                    placeholder="Nội dụng..."
                    onChangeText={text => setMessage(text)}
                  />
                </View>
                <TouchableOpacity onPress={handleCreateCable}>
                  <Text style={styles.btn}> Tạo cáp đội</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  header: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 15,
  },
  body: {
    flex: 9,
  },
  //CARD
  cardView: {
    backgroundColor: '#fff',
    flex: 1,
    marginHorizontal: 30,
    marginVertical: 20,
    elevation: 5,
    borderRadius: 10,
  },
  cardHeader: {
    // backgroundColor: "#fff",
    flex: 0.2,
  },
  H1: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 5,
  },
  textHeader: {
    textAlign: 'center',
    padding: 1,
  },
  cardBody: {
    flex: 0.3,
    backgroundColor: '#fff',
    //  flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 30,
    flexWrap: 'wrap',
  },
  cardLabel: {
    width: '50%',
    backgroundColor: '#fff',
    padding: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  cardContent: {
    width: '50%',
    flexWrap: 'wrap',
    padding: 10,
    alignItems: 'center',
  },
  cardTextLabel: {
    paddingVertical: 8,
  },
  cardTextContent: {
    paddingVertical: 8,
  },
  addressView: {
    flex: 0.1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  addressView_Wrap: {
    width: '76%',
    backgroundColor: '#fff',
  },
  address: {
    fontWeight: 'bold',
  },
  //register
  formRegisterView: {
    alignItems: 'center',
    flex: 0.4,
    // backgroundColor:'orange'
  },
  form: {
    width: '76%',
    //  backgroundColor:'pink',
  },
  textInput: {
    height: 40,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginVertical: 2,
    paddingHorizontal: 5,
    marginTop: 7,
  },
  textInputArea: {
    height: 100,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginTop: 10,
    textAlignVertical: 'top',
    padding: 5,
  },
  btn: {
    padding: 10,
    backgroundColor: 'green',
    marginVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    fontWeight: 'bold',
    color: '#fff',
  },
});
export default CreateTeams;
