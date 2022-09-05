import {useNavigation} from '@react-navigation/native';
import React from 'react';
import * as Animatable from 'react-native-animatable';
import {
  Alert,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {FootballTime} from '../FootballApi';
import {setTimeBooking, setTimeSlot} from '../FootballSlice';
import Icon from 'react-native-vector-icons/AntDesign';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
interface Props {
  item: FootballTime;
  codeNewDay: string;
  codeToday: string;
  dateBooked: string;
}
const FootballItem: React.FC<Props> = ({
  item,
  codeNewDay,
  codeToday,
  dateBooked,
}) => {
  let getHour = new Date().getHours();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <View style={Styles.Pitch_wrap}>
      <View style={Styles.Pitch_element}>
        <Text style={Styles.Time_Football}>{item.timeSlot}</Text>
        {item.timeEnd <= getHour && codeToday === codeNewDay ? (
          <Animatable.View animation="flash" duration={1000}>
            <Icon name="close" style={[Styles.Icon_Close]} />
          </Animatable.View>
        ) : getHour < item.timeStart &&
          item.status === 'payed' &&
          codeToday === codeNewDay ? (
          <TouchableOpacity
            onPress={() => {
              Alert.alert('da dat san');
            }}>
            <IoniconsIcon name="football" style={[Styles.Icon_Payed]} />
          </TouchableOpacity>
        ) : item.timeStart <= getHour &&
          getHour <= item.timeEnd &&
          item.status === 'payed' &&
          codeToday === codeNewDay ? (
          <TouchableOpacity
            onPress={() => {
              Alert.alert('đang chơi...');
            }}>
            <IoniconsIcon name="football" style={[Styles.Icon_Playing]} />
          </TouchableOpacity>
        ) : item.status === 'pending' && codeToday !== codeNewDay ? (
          <TouchableOpacity
            onPress={() => {
              dispatch(setTimeSlot(item.timeSlot));
              navigation.navigate(
                'FootballDetail' as never,
                {
                  id: item.id,
                  // nanmePitch: pitchName,
                  price: item.price,
                } as never,
              );
            }}>
            <Icon name="plus" style={[Styles.Icon_Plus]} />
          </TouchableOpacity>
        ) : item.status === 'payed' && codeToday !== codeNewDay ? (
          <TouchableOpacity
            onPress={() => {
              Alert.alert('đã có người đặt sân này!');
            }}>
            <IoniconsIcon name="football" style={[Styles.Icon_Payed]} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              dispatch(setTimeBooking(dateBooked));
              dispatch(setTimeSlot(item.timeSlot));
              navigation.navigate(
                'FootballDetail' as never,
                {
                  id: item.id,
                  price: item.price,
                } as never,
              );
            }}>
            <Icon name="plus" style={[Styles.Icon_Plus]} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
export default FootballItem;
const {height} = Dimensions.get('screen');
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5e5e5',
  },
  containerWrap: {
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  header: {
    flexDirection: 'row',
  },
  backView: {
    flexDirection: 'row',
    marginHorizontal: 15,
    paddingVertical: 10,
  },
  header_typePitch: {
    width: '50%',
    justifyContent: 'center',
  },
  _typePitch: {
    backgroundColor: 'white',
    margin: 10,
    paddingVertical: 2,
    borderRadius: 10,
    elevation: 10,

    marginHorizontal: 20,
  },
  calendar: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  calendar_block: {
    flexDirection: 'row',
    width: '65%',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    borderRadius: 10,
    elevation: 10,
    paddingHorizontal: 20,
    // overflow:'hidden',
  },
  dayofMonth: {
    backgroundColor: 'orange',
    padding: 8,
    margin: 5,
    marginVertical: 5,
    borderRadius: 80,
    fontWeight: 'bold',
    color: '#fff',
  },
  btn_navigation: {},

  /// Book Football Pitch
  Pitch_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  Pitch_wrap: {
    flexDirection: 'row',
    margin: 8,
  },
  Pitch_element: {
    justifyContent: 'center',
    alignItems: 'center',
    //padding:5,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 3,
    width: Platform.OS === 'ios' ? height / 8 : height / 8,
    height: Platform.OS === 'ios' ? height / 7.5 : height / 7.5,
    padding: 5,
  },
  Time_Football: {
    fontWeight: 'bold',
    justifyContent: 'center',
    fontSize: Platform.OS === 'ios' ? 10 : 16,
  },
  Icon_Football: {
    fontSize: 35,
    paddingVertical: 5,
    marginTop: 8,
    color: 'red',
  },
  Icon_Close: {
    fontSize: 35,
    paddingVertical: 5,
    marginTop: 8,
    color: 'red',
  },
  Icon_Plus: {
    fontSize: 35,
    paddingVertical: 5,
    marginTop: 8,
    color: 'gray',
  },
  Icon_Payed: {
    fontSize: 35,
    paddingVertical: 5,
    marginTop: 8,
    color: 'purple',
  },
  Icon_Playing: {
    fontSize: 35,
    paddingVertical: 5,
    marginTop: 8,
    color: 'green',
  },
  btnPopupEdit: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderColor: '#e5e5e5',
  },
  iconEdit: {
    marginEnd: 10,
  },
  btnPopupDelete: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  /// calendar
  calendarView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  dropdownView: {
    backgroundColor: '#fff',
    padding: 17,
    borderRadius: 10,
    elevation: 3,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
