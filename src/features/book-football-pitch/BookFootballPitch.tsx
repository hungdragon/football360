import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  RefreshControl,
  TouchableOpacity,
  Alert,
  Platform,
  FlatList,
  ListRenderItemInfo,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch} from 'react-redux';
import {
  setCode,
  setFootballTimeList,
  setId,
  setIsSignFootball,
  setTimeBooking,
} from './FootballSlice';
import {SafeAreaView} from 'react-native-safe-area-context';
import moment from 'moment';
import 'moment/locale/vi';
import {FootballApi, FootballTime} from './FootballApi';
import {useAppSelector} from 'app/hooks';
import AppHeader from 'components/AppHeader/AppHeader';
import AppViewWithErrorAndLoading from 'components/view/AppViewWithErrorAndLoading';
import FootballTimeItem from './components/FootballTimeItem';
interface Props {
  route: {
    params: {
      ID_goback?: number;
    };
  };
}
const BookFootballPitch: React.FC<Props> = ({route}) => {
  const ID_goback = route.params?.ID_goback || 0;
  const dispatch = useDispatch();
  const pitchName = useAppSelector(state => state.findPitchState.pitchName);
  const code = useAppSelector(state => state.FootballState.code);
  const id_Pitch = useAppSelector(state => state.findPitchState.idPitch);
  const codeNewDay = useAppSelector(state => state.FootballState.code);
  const dataPitch = useAppSelector(
    state => state.FootballState.FootballTimeData,
  );
  const [loading, setLoading] = useState(false);
  const [currentDay, setCurrentDay] = useState(moment());
  const [dateTimes, setDateTimes] = useState('');
  const [selectedId, setSelectedId] = useState(0);
  const [dateBooked, setDateBooked] = useState(moment().format('L'));
  const length = 6;
  const dd = moment().format('DD');
  const mm = moment().format('MM');
  const codeToday = String(dd + mm);
  let COLOR__DISABLE = '#696969';
  let COLOR__DISABLE_PREV = '#696969';
  if (selectedId === 0) {
    COLOR__DISABLE_PREV = selectedId ? '#DCDCDC' : 'gray';
  }
  if (selectedId === length - 1) {
    COLOR__DISABLE = selectedId ? '#DCDCDC' : 'gray';
  }
  const [visible, setVisible] = React.useState(false);
  const [typePitch, setTypePitch] = React.useState('Sân 5');
  const [valueTypePitch, setValueTypePitch] = React.useState('5');
  const isSignFootball = useAppSelector(
    state => state.FootballState.isSignFootball,
  );
  console.log('vvv111', ID_goback);
  useEffect(() => {
    // if (!ID_goback) {
    //   callAPI(code, dateTimes);
    // } else {
    //   callAPI_ONECE();
    //   console.log('jjjjjj');
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (!isSignFootball) {
      callAPI_ONECE();
    } else {
      callAPI(code, dateTimes);
    }
  }, [isSignFootball]);
  //NEXT DAY
  const nextDay = () => {
    dispatch(setIsSignFootball(true));
    setSelectedId(selectedId === length - 1 ? length - 1 : selectedId + 1);
    if (selectedId >= 5) {
      console.log(Alert.alert('Không thể Next được !'));
    } else {
      setCurrentDay(moment(currentDay).add(1, 'days'));
      const tomorrow = moment(currentDay).add(1, 'days').format('L');
      // console.log('tomorrow---', moment(currentDay).add(1, 'days').format('L')); //tomorrow +1;
      const month = tomorrow.slice(3, 5);
      dispatch(setTimeBooking(tomorrow));
      const day = moment(currentDay).add(1, 'days').format('DD');
      const dayCode = day + month;
      setDateBooked(tomorrow);
      callAPI(dayCode, tomorrow);
    }
  };
  // PREV DAY
  const prevDate = () => {
    dispatch(setIsSignFootball(true));
    setSelectedId(selectedId === 0 ? 0 : selectedId - 1);
    if (selectedId <= 0) {
      console.log(Alert.alert('Không thể Prev được !'));
    } else {
      setCurrentDay(moment(currentDay).subtract(1, 'days')); //prev Day -1
      const prevDay = moment(currentDay).subtract(1, 'days').format('L');
      dispatch(setTimeBooking(prevDay));
      const day = moment(currentDay).subtract(1, 'days').format('DD');
      const month = prevDay.slice(3, 5);
      const dayCode = day + month;
      setDateBooked(prevDay);
      callAPI(dayCode, prevDay);
    }
  };
  const callAPI_ONECE = async () => {
    dispatch(setIsSignFootball(true));
    const dateTime = currentDay.format('L');
    const params = {
      pitchName: pitchName,
      code: codeToday,
      typePitch: typePitch,
      id_Pitch: id_Pitch,
      dateTime: dateTime,
    };
    setLoading(true);
    FootballApi.book_football_Time(params)
      .then(response => {
        dispatch(setFootballTimeList(response.footballPitch));
        dispatch(setCode(codeToday));
        dispatch(setId(response._id));
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  };
  const callAPI = async (dayCode: string, tomorrow?: string) => {
    setDateTimes(tomorrow);
    const params = {
      pitchName: pitchName,
      code: dayCode,
      typePitch: typePitch,
      id_Pitch: id_Pitch,
      dateTime: tomorrow,
    };
    setLoading(true);
    FootballApi.book_football_Time(params)
      .then(response => {
        dispatch(setFootballTimeList(response.footballPitch));
        dispatch(setCode(dayCode));
        dispatch(setId(response._id));
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  };
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = async () => {
    const params = {
      pitchName: pitchName,
      code: dayCode,
      typePitch: typePitch,
      id_Pitch: id_Pitch,
      dateTime: tomorrow,
    };
    setRefreshing(true);
    setLoading(true);
    FootballApi.book_football_Time(params)
      .then(response => {
        dispatch(setFootballTimeList(response.footballPitch));
        dispatch(setCode(codeToday));
        dispatch(setId(response._id));
        setCurrentDay(moment());
        setLoading(false);
        setRefreshing(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
        setRefreshing(false);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title={pitchName} />
      <View style={styles.containerWrap}>
        <View style={styles.calendarView}>
          <>
            <View style={styles.dropdownView}>
              <TouchableOpacity
                onPress={() => {
                  setVisible(!visible);
                }}>
                <View style={styles.dropdown}>
                  <Text>{typePitch} </Text>
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
                    setTypePitch('Sân 5');
                    setValueTypePitch('5');
                    console.log(valueTypePitch);
                    //callAPI(codeNewDay, dateBooked);
                  }}
                  style={styles.Type5}>
                  <Text>{'Sân 5'}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setVisible(!visible);
                    setTypePitch('Sân 7');
                    setValueTypePitch('7');
                    console.log(valueTypePitch);
                    //callAPI(codeNewDay, dateBooked);
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
                  style={[styles.btn_navigation, {color: COLOR__DISABLE_PREV}]}
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
                  style={[styles.btn_navigation, {color: COLOR__DISABLE}]}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <AppViewWithErrorAndLoading
        loading={loading}
        loadingSize="small"
        style={{zIndex: -1}}
        errorString={''}>
        <FlatList
          data={dataPitch}
          contentContainerStyle={styles.Pitch_container}
          numColumns={3}
          renderItem={({item}: ListRenderItemInfo<FootballTime>) => (
            <FootballTimeItem
              item={item}
              codeNewDay={codeNewDay}
              codeToday={codeToday}
              dateBooked={dateBooked}
            />
          )}
          // refreshControl={
          //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          // }
        />
      </AppViewWithErrorAndLoading>

      {/* <FooterFootball /> */}
    </SafeAreaView>
  );
};
const {height} = Dimensions.get('screen');
// const height_pitch = height * 0.25;
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
export default BookFootballPitch;
