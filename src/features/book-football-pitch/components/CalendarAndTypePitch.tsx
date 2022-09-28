import {useAppSelector} from 'app/hooks';
import moment from 'moment';
import React, {useState} from 'react';
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
import {
  setDateTimeBooking,
  setFootballTimeList,
  setId,
  setIsSignFootball,
  setLoading,
  setPitchType,
} from '../FootballSlice';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/FontAwesome';
import {FootballApi} from '../FootballApi';
import {useTheme} from 'react-native-paper';

const CalendarAndTypePitch: React.FC = () => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const pitchType = useAppSelector(state => state.FootballState.pitchType);
  const pitchName = useAppSelector(state => state.findPitchState.pitchName);
  const pitchId = useAppSelector(state => state.findPitchState.idPitch);
  const dateTimeBooking = useAppSelector(
    state => state.FootballState.dateTimeBooking,
  );
  const [selectedId, setSelectedId] = useState(0);
  const [currentDay, setCurrentDay] = useState(moment());
  const [visible, setVisible] = React.useState(false);
  const size = 6;
  let COLOR__NEXT = colors.sonicSilver;
  let COLOR__PREV = colors.sonicSilver;
  let COLOR__DISABLE = colors.lightGrey;

  if (selectedId === 0) {
    COLOR__PREV = selectedId ? COLOR__NEXT : COLOR__PREV;
  }
  if (selectedId === size - 1) {
    COLOR__NEXT = selectedId ? COLOR__DISABLE : 'red';
  }
  //NEXT DAY
  const nextDay = () => {
    setSelectedId(selectedId === size - 1 ? size - 1 : selectedId + 1);
    if (selectedId >= 5) {
      console.log(Alert.alert('Không thể Next được !'));
    } else {
      setCurrentDay(moment(currentDay).add(1, 'days')); // display on UI
      const tomorrow = moment(currentDay).add(1, 'days').format('L'); // format: dd/mm/yyyy
      dispatch(setDateTimeBooking(tomorrow));
      callAPI(pitchType, tomorrow);
    }
  };
  // PREV DAY
  const prevDate = () => {
    setSelectedId(selectedId === 0 ? 0 : selectedId - 1);
    if (selectedId <= 0) {
      console.log(Alert.alert('Không thể Prev được !'));
    } else {
      setCurrentDay(moment(currentDay).subtract(1, 'days')); //prev Day -1
      const prevDay = moment(currentDay).subtract(1, 'days').format('L');
      dispatch(setDateTimeBooking(prevDay));
      callAPI(pitchType, prevDay);
    }
  };
  const callAPI = async (typePitchs?: string, dateTimeParams?: string) => {
    const params = {
      pitchName: pitchName,
      pitchType: typePitchs,
      pitchId: pitchId,
      dateTime: dateTimeParams,
    };
    dispatch(setLoading(true));
    FootballApi.book_football_Time(params)
      .then(response => {
        dispatch(setFootballTimeList(response.footballPitch));
        dispatch(setId(response._id));
        dispatch(setIsSignFootball(false));
        dispatch(setLoading(false));
      })
      .catch(error => {
        console.log(error);
        dispatch(setIsSignFootball(false));
        dispatch(setLoading(false));
      });
  };
  return (
    <View style={styles.calendarView}>
      <>
        <View style={styles.dropdownView}>
          <TouchableOpacity
            onPress={() => {
              setVisible(!visible);
            }}>
            <View style={styles.dropdown}>
              <Text>{pitchType} </Text>
              <Text>
                <AntDesign name="caretdown" size={14} />
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {visible && (
          <View style={styles.openViewDropdown}>
            <TouchableOpacity
              onPress={() => {
                setVisible(!visible);
                dispatch(setPitchType('Sân 5'));
                // setValueTypePitch('5');
                callAPI('Sân 5', dateTimeBooking);
              }}
              style={styles.Type5}>
              <Text>{'Sân 5'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setVisible(!visible);
                dispatch(setPitchType('Sân 7'));
                callAPI('Sân 7', dateTimeBooking);
              }}
              style={styles.Type7}>
              <Text>{'Sân 7'}</Text>
            </TouchableOpacity>
          </View>
        )}
      </>
      <View style={styles.calendar}>
        <View style={styles.calendar_block}>
          <TouchableOpacity onPress={prevDate}>
            <Icon
              name="chevron-left"
              size={22}
              style={[styles.btn_navigation, {color: COLOR__PREV}]}
            />
          </TouchableOpacity>
          <View style={styles.numberdayCalendar}>
            <Text style={styles.txtNumberDayCalendar}>
              {currentDay.format('DD')}
            </Text>
            <Icon name="calendar" size={16} style={styles.icon_calendar} />
          </View>
          <TouchableOpacity onPress={nextDay}>
            <Icon
              name="chevron-right"
              size={22}
              style={[styles.btn_navigation, {color: COLOR__NEXT}]}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const {height} = Dimensions.get('screen');
export const styles = StyleSheet.create({
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
    // width: "80%",
    backgroundColor: 'white',
    margin: 10,
    paddingVertical: 2,
    borderRadius: 10,
    elevation: 10,
    // backgroundColor:"blue",
    marginHorizontal: 20,
  },
  // Calendar
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
  btn_navigation: {
    // margin:5
  },

  /// Book Football Pitch
  Pitch_container: {
    // flex:1,
    //  backgroundColor: "red",
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    //  flexWrap: 'wrap',
    marginTop: 20,
    zIndex: -1,
    // position: "absolute",
    // backgroundColor:'#e5e5e5'
  },
  Pitch_wrap: {
    flexDirection: 'row',
    margin: 8,
  },
  Pitch_element: {
    //  backgroundColor: "pink",
    justifyContent: 'center',
    alignItems: 'center',
    //padding:5,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 3,
    width: Platform.OS === 'ios' ? height / 8 : height / 8,
    height: Platform.OS === 'ios' ? height / 7.5 : height / 7.5,
    // height: height / 7.5,
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
    color: '#C0C0C0',
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
    backgroundColor: '#FFF',
    padding: 17,
    borderRadius: 10,
    elevation: 3,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  openViewDropdown: {
    elevation: 10,
    //zIndex: 11,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    position: 'absolute',
    bottom: '-188%',
    borderRadius: 3,
    backgroundColor: '#fff',
    zIndex: 1,
    width: '26%',
  },
  Type5: {
    padding: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e5e5e5',
  },
  Type7: {
    padding: 15,
  },
  numberdayCalendar: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'center',
  },
  txtNumberDayCalendar: {
    fontSize: 18,
  },
  icon_calendar: {
    color: 'black',
    padding: 3,
  },
});
export default CalendarAndTypePitch;
