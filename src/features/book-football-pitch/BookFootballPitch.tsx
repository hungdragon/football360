import {
  View,
  StyleSheet,
  Dimensions,
  Platform,
  FlatList,
  ListRenderItemInfo,
} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {
  setFootballTimeList,
  setId,
  setIsSignFootball,
  setLoading,
} from './FootballSlice';
import {SafeAreaView} from 'react-native-safe-area-context';
import moment from 'moment';
import 'moment/locale/vi';
import {FootballApi, FootballTime} from './FootballApi';
import {useAppSelector} from 'app/hooks';
import AppHeader from 'components/AppHeader/AppHeader';
import AppViewWithErrorAndLoading from 'components/view/AppViewWithErrorAndLoading';
import FootballTimeItem from './components/FootballTimeItem';
import CalendarAndTypePitch from './components/CalendarAndTypePitch';
const BookFootballPitch: React.FC = () => {
  const dispatch = useDispatch();
  const dataPitch = useAppSelector(
    state => state.FootballState.FootballTimeData,
  );
  const pitchName = useAppSelector(state => state.findPitchState.pitchName);
  const pitchId = useAppSelector(state => state.findPitchState.idPitch);
  const pitchType = useAppSelector(state => state.FootballState.pitchType);
  const loading = useAppSelector(state => state.FootballState.loading);
  const dateTimeBooking = useAppSelector(
    state => state.FootballState.dateTimeBooking,
  );
  const dateTime = moment().format('L');
  const isSignFootball = useAppSelector(
    state => state.FootballState.isSignFootball,
  );
  useEffect(() => {
    if (!isSignFootball) {
      callAPI_ONECE();
    } else {
      callAPI(pitchType, dateTimeBooking);
    }
    callAPI_ONECE();
  }, [isSignFootball]);

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
  const callAPI_ONECE = async () => {
    const params = {
      pitchName: pitchName,
      pitchType: pitchType,
      pitchId: pitchId,
      dateTime: moment().format('L'),
    };
    setLoading(true);
    FootballApi.book_football_Time(params)
      .then(response => {
        dispatch(setFootballTimeList(response.footballPitch));
        dispatch(setId(response._id));
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  };
  // const [refreshing, setRefreshing] = React.useState(false);
  // const onRefresh = useCallback(async () => {
  //   const params = {
  //     pitchName: pitchName,
  //     pitchType: pitchType,
  //     pitchId: pitchId,
  //     dateTime: dateTimeBooking,
  //   };
  //   setLoading(true);
  //   setRefreshing(true);
  //   FootballApi.book_football_Time(params)
  //     .then(response => {
  //       dispatch(setFootballTimeList(response.footballPitch));
  //       dispatch(setId(response._id));
  //       setLoading(false);
  //       setRefreshing(false);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       setLoading(false);
  //       setRefreshing(false);
  //     });
  // }, []);
  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title={pitchName} />
      <View style={styles.containerWrap}>
        <CalendarAndTypePitch />
      </View>
      <AppViewWithErrorAndLoading
        loading={loading}
        loadingSize="small"
        style={{zIndex: -1, flex: 1, justifyContent: 'center'}}
        errorString={''}>
        <FlatList
          data={dataPitch}
          contentContainerStyle={styles.Pitch_container}
          numColumns={3}
          renderItem={({item}: ListRenderItemInfo<FootballTime>) => (
            <FootballTimeItem
              item={item}
              dateTime={dateTime}
              dateTimeBooking={dateTimeBooking}
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
