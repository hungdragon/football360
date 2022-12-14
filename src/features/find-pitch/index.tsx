import React, {useEffect, useMemo, useState} from 'react';
import {FlatList, Platform, RefreshControl} from 'react-native';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {batch, useDispatch} from 'react-redux';
import {setPitchData} from './findPitchSlice';
import Geolocation from '@react-native-community/geolocation';
import {getDistance} from 'geolib';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAppSelector} from 'app/hooks';
import {findPitchApi, PitchInfo} from './findPitchApi';
import AppViewWithErrorAndLoading from 'components/view/AppViewWithErrorAndLoading';
import {FootballApi} from 'features/book-football-pitch/FootballApi';
import {
  setCountRequest,
  setFootballOrderData,
  setHistoryOrderData,
  setTeamListRequestData,
} from 'features/user-Info/userSlice';
import {getValue} from 'utils';
import {useAppUser} from 'context/AppUserContext';
import {useNavigation} from '@react-navigation/native';
import EmptyView from 'components/EmptyView';
import {findAwayTeamApi} from 'features/find-away-team/findAwayTeamApi';
import PitchItem from './PitchItem';
import Notification from 'notification';
import {useTheme} from 'react-native-paper';
const FindPitch: React.FC = () => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const pitchData = useAppSelector(state => state.findPitchState.pitchs);
  const seachName = useAppSelector(state => state.findPitchState.searchName);

  const [dataFilter, setDataFilter] = useState<Array<PitchInfo>>(pitchData);
  const [refreshing, setRefreshing] = React.useState(false);
  const [currentLong, setCurrentLong] = useState<number>(0);
  const [currentLat, setCurrentLat] = useState<number>(0);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const {getHrisCode} = useAppUser();
  const userName = getHrisCode();

  useEffect(() => {
    callApi();
  }, []);
  const onRefresh = React.useCallback(() => {
    setGpsActive(true);
    setRefreshing(true);
    callApi();
    setRefreshing(false);
  }, []);

  const callApi = async () => {
    setLoading(true);
    try {
      setTimeout(async () => {
        const getFootballOrder = await FootballApi.football_order(userName);
        const getFindPitchData = await findPitchApi.getPitchList();
        const teamListRequest = await findAwayTeamApi.getTeamList();
        const teamListData = teamListRequest.dataFilter;
        const teamListRequestData = _.filter(teamListData, (o: any) => {
          return o.userName === userName && o.isStatus === 'pending';
        });
        batch(() => {
          setDataFilter(getFindPitchData.pitchs);
          dispatch(setPitchData(getFindPitchData?.pitchs));
          dispatch(
            setFootballOrderData(getValue(getFootballOrder, 'data', [])),
          );
          dispatch(setHistoryOrderData(getValue(getFootballOrder, 'data', [])));
          dispatch(setCountRequest(teamListRequestData.length));
          dispatch(setTeamListRequestData(teamListRequestData));
          setLoading(false);
        });
      }, 500);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };
  const renderItem = ({item}: any) => <PitchItem item={item} />;
  //GPS
  const [gpsActive, setGpsActive] = useState(true);
  const nearestSearch = () => {
    if (!gpsActive) {
      callApi();
      setGpsActive(!gpsActive);
    } else {
      setLoading(true);
      setGpsActive(!gpsActive);

      if (Platform.OS === 'ios') {
        Geolocation.getCurrentPosition(
          position => {
            //get long & let
            setCurrentLong(position.coords.longitude);
            setCurrentLat(position.coords.latitude);
            console.log('aaaaa', position.coords.longitude);
            let km = 0;
            const dataFilters = _.filter(dataFilter, (o: any) => {
              let distance = getDistance(
                {latitude: o.latitude, longitude: o.longitude},
                {
                  latitude: currentLat,
                  longitude: currentLong,
                },
              );
              km = distance / 1000;
              return km;
            });
            const dataConvert = dataFilters.map((item: any): any => {
              let distance = getDistance(
                {latitude: item.latitude, longitude: item.longitude},
                {
                  latitude: currentLat,
                  longitude: currentLong,
                },
              );
              km = Math.round((distance / 1000) * 100) / 100;
              return {km: km, ...item};
            });
            const sortByData = _.sortBy(dataConvert, o => {
              return o.km;
            });
            dispatch(setPitchData(sortByData));
            setDataFilter(sortByData);
            setLoading(false);
          },
          err => {
            setError(err.message);
            console.log('error GPS');
          },
        );
      }
      // if (gpsActive) {
      //   console.log(gpsActive);
      //   let {status} = await Location.requestForegroundPermissionsAsync();
      //   if (status !== 'granted') {
      //     Alert.alert('Kh??ng c?? quy???n');
      //     callAPI();
      //     setGpsActive(gpsActive);
      //     // return;
      //   }

      //   let location = await Location.getCurrentPositionAsync({});
      //   console.log('lat1', location.coords.latitude);
      //   console.log('long1', location.coords.longitude);
      //   setCurrentLat(JSON.stringify(location.coords.latitude));
      //   setCurrentLong(JSON.stringify(location.coords.longitude));
      // const calculatePreciseDistance = () => {
      //   var pdis = getDistance(
      //     { latitude: currentLat, longitude: currentLong },
      //     { latitude: 21.029589601988146, longitude:  105.85253991652326 }
      //   );
      //   const km = pdis / 1000;
      //   Alert.alert("aaa"+Math.round(km));
      // };
    }
  };
  useMemo(() => {
    if (seachName) {
      const newData = _.filter(pitchData, (o: any) => {
        const itemData = o.pitchName
          ? o.pitchName.toUpperCase()
          : ''.toUpperCase();
        const nameData = seachName.toUpperCase();
        return itemData.indexOf(nameData) > -1;
      });
      setDataFilter(newData);
    } else {
      // callAPI();
      // dispatch(setDataFind(data));
    }
  }, [seachName]);
  //EMPTY VIEW
  const EmptyComponent = () => <EmptyView />;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top_search}>
        <View style={styles.leftIconHeader}>
          <Notification />
        </View>
        <View style={styles.search_element}>
          <Icon
            name="search1"
            size={20}
            style={[styles.styleIconSearch, {color: colors.gray}]}
          />
          <Text
            onPress={() => {
              navigation.navigate('SearchNamePitch' as never);
            }}
            style={styles.styleTxtSearch}>
            {!seachName ? 'T??m ki???m...' : seachName}
            {/* {'T??m ki???m...'} */}
          </Text>
        </View>
        <View style={styles.rightIconHeader}>
          <TouchableOpacity
            onPress={() => {
              nearestSearch();
            }}>
            <MaterialIcon
              name="crosshairs-gps"
              size={25}
              style={[
                !gpsActive ? {color: colors.blue} : {color: colors.black},
              ]}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.body_block}>
        <Text style={styles.txtResult}>K???t qu??? t??m ki???m</Text>
        <AppViewWithErrorAndLoading
          textLoading={'loading...'}
          loading={loading}
          loadingSize="small"
          style={styles.loadingAndErrorStyle}
          errorString={error}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={dataFilter}
            renderItem={renderItem}
            ListEmptyComponent={EmptyComponent}
            keyExtractor={item => item._id}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </AppViewWithErrorAndLoading>
      </View>
    </SafeAreaView>
  );
};
const {height} = Dimensions.get('screen');
const height_pitch = height * 0.25;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top_search: {
    height: '5%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  leftIconHeader: {
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  search_element: {
    flexDirection: 'row',
    borderColor: 'gray',
    borderWidth: 0.4,
    padding: 5,
    borderRadius: 30,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '70%',
  },
  rightIconHeader: {
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  styleIconSearch: {
    marginLeft: 8,
  },
  styleTxtSearch: {
    width: '100%',
    paddingVertical: 5,
    color: 'gray',
  },
  txtResult: {
    margin: 10,
  },
  styleItemImage: {
    borderRadius: 20,
  },
  styleKM: {
    padding: 5,
    borderRadius: 5,
  },
  txtKM: {
    fontWeight: 'bold',
  },
  // Ph???n 2
  body_block: {
    flexDirection: 'column',
    height: '100%',
  },
  styleElementTimeBlock: {
    borderRadius: 20,
    backgroundColor: '#CC0066',
    height: height_pitch / 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list_pitch: {
    marginHorizontal: 10,
    borderRadius: 20,
    flexDirection: 'column',
  },
  time_block: {
    height: height_pitch / 3,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text_time: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: Platform.OS === 'ios' ? 14 : 16,
  },
  pitch_element: {
    marginVertical: 5,
    height: height_pitch,
    borderRadius: 20,
    marginHorizontal: 10,
    backgroundColor: 'rgba(0, 0, 0, .5)',
    zIndex: -1,
  },
  address_block: {
    height: height_pitch / 1.6,
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginHorizontal: 10,
  },
  address_left: {
    width: '60%',
  },
  address_right: {
    width: '40%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  loadingAndErrorStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default FindPitch;
