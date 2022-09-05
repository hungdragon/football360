import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from 'app/hooks';
import {
  setCodeName,
  setIdPitch,
  setLocation,
  setPitchName,
} from 'features/find-pitch/findPitchSlice';
import {setIdSlot} from 'features/book-football-pitch/FootballSlice';
const wait = (timeout: any) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const evaluateData = [
  {
    id: 1,
    star: '5',
    //image: Images.On1,
  },
  {
    id: 2,
    star: '4',
    // image: Images.On2,
  },
  {
    id: 3,
    star: '3',
    // image: Images.On3,
  },
  {
    id: 4,
    star: '2',
    // image: Images.On3,
  },
  {
    id: 5,
    star: '1',
    // image: Images.On3,
  },
];
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
interface Props {
  route: {
    params: {
      id: string;
    };
  };
}
const PitchDetail: React.FC<Props> = ({route}) => {
  const {id} = route?.params;
  const dispatch = useAppDispatch();
  const pitchData = useAppSelector(state => state.findPitchState.pitchs);
  const dataFilter = pitchData.filter(o => {
    return (o._id = id);
  });
  dispatch(setPitchName(dataFilter[0].pitchName));
  dispatch(setCodeName(dataFilter[0].code));
  dispatch(setIdPitch(dataFilter[0]._id));
  dispatch(setLocation(dataFilter[0].location));

  console.log('pitchName----', dataFilter[0].pitchName);
  console.log('pitchName----', dataFilter[0].code);
  console.log('pitchName----', dataFilter[0]._id);
  console.log('location----', dataFilter[0].location);
  // const [data, setData] = useState<any>();
  // const [imgArray, setImgArray] = useState<any>([]);
  // const [loading, setLoading] = useState<boolean>(false);
  const data = [];
  useEffect(() => {
    // callApi();
  }, []);
  // console.log("666", data);
  const callApi = async () => {
    // try {
    //   setLoading(true);
    //   const code = codeName;
    //   const res = await axios.get(
    //     `${BASE_URL}api/football-detail?code=${code}`,
    //   );
    //   setData(res.data);
    //   setImgArray(res.data.imgArray);
    //   setLoading(false);
    // } catch (error) {
    //   console.log(error);
    //   setLoading(false);
    // }
  };

  const navigation = useNavigation();
  const [onpenMore, setOpenMore] = useState(true);
  const [evaluate, setEvaluate] = useState(-1);
  const [height, setHeight] = useState<any>(300);
  const imgArray = [];
  const handleMore = () => {
    if (onpenMore) {
      console.log(onpenMore);
      setOpenMore(false);
      setHeight('auto');
    } else {
      console.log(onpenMore);
      setOpenMore(true);
      setHeight(300);
    }
  };
  const handleEvaluate = (e: any) => {
    setEvaluate(e);
    console.log(evaluate);
  };
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const [imgActive, setImgActive] = useState(0);
  const onChange = (nativeEvent: any) => {
    //  const contentOffset = 0;
    // console.log(nativeEvent.contentOffset.x);
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
    );
    // console.log("slide" + slide);

    if (slide !== imgActive) {
      //  console.log(imgActive);
      setImgActive(slide);
    }
  };
  const [bg, setBg] = useState('rgba(0,0,0,0)');
  const handleScroll = (nativeEvent: any) => {
    const slide = nativeEvent.contentOffset.y;
    // console.log("scroll" + slide);
    if (slide > 110) {
      setBg('#fff');
    } else {
      setBg('rgba(0,0,0,0)');
    }
  };
  return (
    <>
      <View style={styles.container}>
        <Animatable.View
          animation="zoomIn"
          style={{
            backgroundColor: bg,
            height: 90,
            zIndex: 3,
            width: '100%',
            position: 'absolute',
            top: 0,
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'flex-end',
          }}>
          <Text>{}</Text>
        </Animatable.View>
        <View
          style={{
            alignSelf: 'center',
            zIndex: 99,
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            top: '5%',
            width: 35,
            height: 35,
            left: '6%',
            borderRadius: 50,
            backgroundColor: '#787878',
          }}>
          <TouchableOpacity
            style={{padding: 5}}
            onPress={() => navigation.goBack()}>
            <Icon
              size={16}
              name="chevron-left"
              style={{
                alignSelf: 'center',
                color: '#fff',

                justifyContent: 'center',
                alignContent: 'center',
                marginRight: 3,
              }}
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onScroll={({nativeEvent}) => {
            handleScroll(nativeEvent);
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <View style={{height: HEIGHT * 0.32, zIndex: 0, width: WIDTH}}>
              <ScrollView
                horizontal
                style={{height: HEIGHT * 0.32, width: WIDTH}}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={({nativeEvent}) => {
                  onChange(nativeEvent);
                }}>
                {imgArray?.map((item: any, index: any): any => {
                  let base64 = `data:image/png;base64,${item.img}`;
                  return (
                    <Image
                      key={index}
                      source={{uri: base64}}
                      resizeMode="cover"
                      style={{height: HEIGHT * 0.32, width: WIDTH}}
                    />
                  );
                })}
              </ScrollView>
              <View
                style={{
                  position: 'absolute',
                  bottom: 2,
                  right: '5%',
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: 'gray',
                  paddingHorizontal: 5,
                  backgroundColor: '#FFF8DC',
                }}>
                <Text>
                  {imgActive + 1}/{imgArray.length}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.Header}>
            <Text style={styles.title}>{dataFilter[0]?.pitchName}</Text>
            <View style={styles.review}>
              <Text style={styles.star}>⭐⭐⭐⭐⭐</Text>
              <Text style={styles.textReview}>
                ({dataFilter[0]?.rate} đánh giá)
              </Text>
            </View>
            <View style={styles.location}>
              <IconIonicons size={18} name="location" />
              <Text style={styles.textAddress}>{dataFilter[0]?.location}</Text>
            </View>
          </View>

          <View style={styles.content}>
            <View style={styles.headerContent}>
              <Text style={styles.h1}>{dataFilter[0]?.title}</Text>
            </View>
            <View style={[styles.bodyContent, {height: height}]}>
              <Text style={styles.textBodyContent}>
                {dataFilter[0]?.content}
              </Text>
            </View>
            {/* //XEM THEM */}
            <TouchableOpacity
              onPress={() => {
                handleMore();
              }}>
              <View style={styles.moreView}>
                <Text style={styles.textMore}>XEM THÊM</Text>
                {!onpenMore ? (
                  <Icon
                    size={16}
                    style={{alignSelf: 'center', color: 'green'}}
                    name="chevron-up"
                  />
                ) : (
                  <Icon
                    size={16}
                    style={{alignSelf: 'center', color: 'green'}}
                    name="chevron-down"
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.footer}>
            <Text style={styles.h1Footer}>Đánh giá sân</Text>
            <View style={styles.listButonREVIEW}>
              {evaluateData.map((e, index) => (
                <TouchableOpacity
                  onPress={() => {
                    handleEvaluate(index);
                  }}
                  key={index}
                  //  style={styles.buttonStarPress}
                >
                  {evaluate === index ? (
                    <View style={styles.buttonStarPress} key={index}>
                      <IconAntDesign
                        name="check"
                        style={{padding: 4, color: 'green'}}
                        size={16}
                      />
                      <Text style={styles.numberStartACtive}>{e.star}</Text>
                      <IconAntDesign
                        name="star"
                        style={{padding: 4, color: '#FFCC00'}}
                        size={16}
                      />
                    </View>
                  ) : (
                    <View style={styles.buttonStarP}>
                      <Text style={styles.numberStart}>{e.star}</Text>
                      <IconAntDesign
                        name="staro"
                        style={{padding: 4, color: 'gray'}}
                        size={16}
                      />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>

        <View style={styles.btn_BookingPosotion}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              // dispatch(setLocation(data?.location));;
              // dispatch(setNamePitch(data?.name_pitch));;
              // dispatch(setCodeNamePitch(data?.code_name));;
              navigation.navigate('BookFootballPitch' as never);
              setLocation(dataFilter[0].location);
            }}>
            <Text style={styles.textBooking}>Đặt sân ngay</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    //flexDirection: "column",
    // position: "relative",
  },
  Header: {
    backgroundColor: '#fff',
    padding: 5,
    //height: 250,
    justifyContent: 'flex-end',
    //backgroundColor: 'rgba(0, 0, 0, .5)',
  },
  title: {
    //fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 5,
    elevation: 10,
    fontSize: Platform.OS === 'ios' ? 14 : 20,
    // textShadowColor: 'rgba(0, 0, 0, 0.75)',
    // textShadowOffset: {width: -1, height: 1},
    // textShadowRadius: 10
  },
  review: {
    flexDirection: 'row',
    marginHorizontal: 5,
  },
  star: {},
  textReview: {},
  location: {
    flexDirection: 'row',
    paddingVertical: 5,
    marginHorizontal: 4,
    flexWrap: 'wrap',
  },
  textAddress: {},

  content: {
    marginTop: 10,
    borderTopColor: '#E8E8E8',
    borderTopWidth: 1,
    // flex:1
    height: 'auto',
    // backgroundColor: "red",
  },
  headerContent: {
    backgroundColor: '#FFF',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  h1: {
    fontWeight: 'bold',
    //  fontSize: 16,
    fontSize: Platform.OS === 'ios' ? 14 : 16,
  },
  bodyContent: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    // height: 400,
    height: '40%',
    overflow: 'hidden',
  },
  textBodyContent: {
    fontSize: Platform.OS === 'ios' ? 13 : 16,
  },
  moreView: {
    backgroundColor: '#ffffff',
    // alignItems:'center'
    borderTopColor: '#E8E8E8',
    borderTopWidth: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textMore: {
    paddingVertical: 15,
    textAlign: 'center',
    color: 'green',
    paddingHorizontal: 5,
  },
  footer: {
    height: 200,
    maxHeight: 400,
    backgroundColor: '#ffffff',
    marginTop: 8,
    borderTopColor: '#E8E8E8',
    borderTopWidth: 1,
    //flex:1
  },
  h1Footer: {
    padding: 10,
    // marginVertical:10
    fontWeight: 'bold',
    fontSize: 16,
  },
  listButonREVIEW: {
    flexDirection: 'row',
    marginHorizontal: 10,
    // justifyContent:'space-around'
  },
  buttonStar: {
    marginTop: 10,
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '15%',
    padding: '1.5%',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 10,
    marginStart: 5,
    borderColor: '#E8E8E8',
    borderWidth: 1,
  },
  buttonStarPress: {
    backgroundColor: '#000066',
    borderColor: '#CCFFCC',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: '2.5%',
    paddingVertical: '5%',
    marginLeft: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStarP: {
    // backgroundColor: "red",
    borderColor: '#E8E8E8',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: '2.5%',
    paddingVertical: '5%',
    marginLeft: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'#A9A9A9'
  },

  numberStart: {
    fontSize: 18,
    color: 'gray',
  },
  numberStartACtive: {
    fontSize: 18,
    color: '#fff',
  },

  btn_BookingPosotion: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: '#fff',
    // backgroundColor: "red",
  },

  btn: {
    //position: "absolute",
    bottom: 20,
    backgroundColor: 'green',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 20,
    // height: 60,
    //  zIndex: 88,
    //elevation:20
  },
  textBooking: {
    color: '#ffffff',
    fontSize: Platform.OS === 'ios' ? 14 : 14,
  },
});
export default PitchDetail;
