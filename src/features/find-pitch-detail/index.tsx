import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from 'app/hooks';
import {
  setCodeName,
  setIdPitch,
  setLocation,
  setPitchName,
} from 'features/find-pitch/findPitchSlice';
import {batch} from 'react-redux';
import DisplayImageList from './components/DisplayImageList';
import PitchInfomation from './components/PitchInfomation';
import Evaluate from './components/Evaluate';
import {useTheme} from 'react-native-paper';
import { setDateTimeBooking } from 'features/book-football-pitch/FootballSlice';
import moment from 'moment';

interface Props {
  route: {
    params: {
      id: string;
    };
  };
}
const PitchDetail: React.FC<Props> = ({route}) => {
  const {id} = route?.params;
  const {colors} = useTheme();
  const dispatch = useAppDispatch();
  const pitchData = useAppSelector(state => state.findPitchState.pitchs);
  const dataFilter = pitchData.filter(o => {
    return o._id === id;
  });
  dispatch(setPitchName(dataFilter[0].pitchName));
  dispatch(setCodeName(dataFilter[0].code));

  const navigation = useNavigation();
  const [bg, setBg] = useState('rgba(0,0,0,0)');
  const handleScroll = (nativeEvent: any) => {
    const slide = nativeEvent.contentOffset.y;
    if (slide > 110) {
      setBg('#fff');
    } else {
      setBg('rgba(0,0,0,0)');
    }
  };
  return (
    <View style={styles.container}>
      {/* <Animatable.View
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
        </Animatable.View> */}
      <View
        style={[styles.goBackContainer, {backgroundColor: colors.sonicSilver}]}>
        <TouchableOpacity
          style={{padding: 5}}
          onPress={() => navigation.goBack()}>
          <Icon size={16} name="chevron-left" style={styles.iconGoBack} />
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        onScroll={({nativeEvent}) => {
          handleScroll(nativeEvent);
        }}>
        <DisplayImageList data={dataFilter} />
        <PitchInfomation data={dataFilter} />
        <Evaluate />
      </ScrollView>
      {/* BUTTON ORDER */}
      <View style={styles.btn_BookingPosotion}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            navigation.navigate('BookFootballPitch' as never);
            dispatch(setIdPitch(dataFilter[0]._id));
            dispatch(setLocation(dataFilter[0].location));
            dispatch(setDateTimeBooking(moment().format('L')));
          }}>
          <Text style={styles.textBooking}>?????t s??n ngay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
  },
  goBackContainer: {
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
  iconGoBack: {
    alignSelf: 'center',
    color: '#fff',
    justifyContent: 'center',
    alignContent: 'center',
    marginRight: 3,
  },
  arrayImageView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  arrayImageViewWrap: {
    // height: HEIGHT * 0.32,
    // width: WIDTH,
  },
  slideImage: {
    position: 'absolute',
    bottom: 2,
    right: '5%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 5,
    backgroundColor: '#FFF8DC',
  },
  iconChevrionStyle: {
    alignSelf: 'center',
    color: 'green',
  },
});
export default PitchDetail;
