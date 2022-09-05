// import Geolocation from '@react-native-community/geolocation';
// import { useAppDispatch, useAppSelector } from 'app/hooks';
// import {getDistance} from 'geolib';
// import React, {useState} from 'react';
// import {
//   Platform,
//   View,
//   TouchableOpacity,
//   Dimensions,
//   StyleSheet,
// } from 'react-native';
// import {setPitchData} from '../findPitchSlice';
// const SearchGPS: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const [gpsActive, setGpsActive] = useState(true);
//   const [currentLong, setCurrentLong] = useState<number>(0);
//   const [currentLat, setCurrentLat] = useState<number>(0);
//   const pitchData = useAppSelector(state => state.findPitchState.pitchs);
//   const nearestSearch = () => {
//     if (!gpsActive) {
//       callApi();
//       setGpsActive(!gpsActive);
//     } else {
//       setLoading(true);
//       setGpsActive(!gpsActive);

//       if (Platform.OS === 'ios') {
//         Geolocation.getCurrentPosition(
//           position => {
//             //get long & let
//             setCurrentLong(position.coords.longitude);
//             setCurrentLat(position.coords.latitude);
//             console.log('aaaaa', position.coords.longitude);
//             let km = 0;
//             const dataFilters = _.filter(dataFilter, (o: any) => {
//               let distance = getDistance(
//                 {latitude: o.latitude, longitude: o.longitude},
//                 {
//                   latitude: currentLat,
//                   longitude: currentLong,
//                 },
//               );
//               km = distance / 1000;
//               return km;
//             });
//             const dataConvert = dataFilters.map((item: any): any => {
//               let distance = getDistance(
//                 {latitude: item.latitude, longitude: item.longitude},
//                 {
//                   latitude: currentLat,
//                   longitude: currentLong,
//                 },
//               );
//               km = Math.round((distance / 1000) * 100) / 100;
//               return {km: km, ...item};
//             });
//             const sortByData = _.sortBy(dataConvert, o => {
//               return o.km;
//             });
//             dispatch(setPitchData(sortByData));
//             setDataFilter(sortByData);
//             setLoading(false);
//           },
//           err => {
//             setError(err.message);
//             console.log('error GPS');
//           },
//         );
//       }
//       // if (gpsActive) {
//       //   console.log(gpsActive);
//       //   let {status} = await Location.requestForegroundPermissionsAsync();
//       //   if (status !== 'granted') {
//       //     Alert.alert('Không có quyền');
//       //     callAPI();
//       //     setGpsActive(gpsActive);
//       //     // return;
//       //   }

//       //   let location = await Location.getCurrentPositionAsync({});
//       //   console.log('lat1', location.coords.latitude);
//       //   console.log('long1', location.coords.longitude);
//       //   setCurrentLat(JSON.stringify(location.coords.latitude));
//       //   setCurrentLong(JSON.stringify(location.coords.longitude));
//       // const calculatePreciseDistance = () => {
//       //   var pdis = getDistance(
//       //     { latitude: currentLat, longitude: currentLong },
//       //     { latitude: 21.029589601988146, longitude:  105.85253991652326 }
//       //   );
//       //   const km = pdis / 1000;
//       //   Alert.alert("aaa"+Math.round(km));
//       // };
//     }
//   };
//   return (
//     <View style={styles.rightIconHeader}>
//       <TouchableOpacity
//         onPress={() => {
//           nearestSearch();
//         }}>
//         <MaterialIcon
//           name="crosshairs-gps"
//           size={25}
//           style={[!gpsActive ? {color: 'blue'} : {color: 'black'}]}
//         />
//       </TouchableOpacity>
//     </View>
//   );
// };
// const {height} = Dimensions.get('screen');
// const height_pitch = height * 0.25;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // backgroundColor: '#e5e5e5',
//   },
//   top_search: {
//     height: '5%',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginVertical: 10,
//   },
//   leftIconHeader: {
//     width: '10%',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   search_element: {
//     flexDirection: 'row',
//     borderColor: 'gray',
//     borderWidth: 0.4,
//     padding: 5,
//     borderRadius: 30,
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     width: '70%',
//   },
//   rightIconHeader: {
//     width: '10%',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   styleIconSearch: {
//     marginLeft: 8,
//     color: 'gray',
//   },
//   styleTxtSearch: {
//     width: '100%',
//     paddingVertical: 5,
//     color: 'gray',
//   },
//   txtResult: {
//     margin: 10,
//   },
//   styleItemImage: {
//     borderRadius: 20,
//   },
//   styleKM: {
//     // height: 35,
//     backgroundColor: '#fff',
//     padding: 5,
//     fontSize: Platform.OS === 'ios' ? 14 : 18,
//     borderRadius: 5,
//   },
//   txtKM: {
//     fontWeight: 'bold',
//   },
//   // Phần 2
//   body_block: {
//     // backgroundColor:'#e5e5e5',
//     flexDirection: 'column',
//     height: '100%',
//     //backgroundColor: "blue",
//   },
//   styleElementTimeBlock: {
//     borderRadius: 20,
//     backgroundColor: '#CC0066',
//     height: height_pitch / 5,
//     padding: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   list_pitch: {
//     marginHorizontal: 10,

//     //backgroundColor: "pink",
//     borderRadius: 20,
//     flexDirection: 'column',
//   },
//   time_block: {
//     height: height_pitch / 3,
//     // backgroundColor:'red',
//     padding: 10,
//     // backgroundColor:'red',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   text_time: {
//     // textAlign: 'center',
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: Platform.OS === 'ios' ? 14 : 16,
//   },
//   pitch_element: {
//     marginVertical: 5,
//     height: height_pitch,
//     borderRadius: 20,
//     // backgroundColor: "gray",
//     marginHorizontal: 10,
//     //flexDirection: "row",
//     backgroundColor: 'rgba(0, 0, 0, .5)',
//     zIndex: -1,
//   },
//   address_block: {
//     height: height_pitch / 1.6,
//     flexDirection: 'row',
//     // backgroundColor: "red",
//     alignItems: 'flex-end',
//     marginHorizontal: 10,
//     // width:height_pitch/2

//     //justifyContent: 'flex-end'
//   },
//   address_left: {
//     width: '60%',
//     // backgroundColor:'blue'
//   },
//   address_right: {
//     width: '40%',
//     flexDirection: 'column',
//     alignItems: 'center',
//     //paddingHorizontal: 2
//     // backgroundColor:'green',
//     //marginVertical:15
//   },
//   loadingAndErrorStyle: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
// export default SearchGPS;
