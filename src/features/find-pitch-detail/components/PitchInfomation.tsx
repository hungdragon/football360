import React, { useState } from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconIonicons from 'react-native-vector-icons/Ionicons';
interface Props {
  data: any;
}
const PitchInfomation: React.FC<Props> = ({data}) => {
  const [onpenMore, setOpenMore] = useState(true);
  const [height, setHeight] = useState<any>(300);
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
  return (
    <>
      <View style={styles.Header}>
        <Text style={styles.title}>{data[0]?.pitchName}</Text>
        <View style={styles.review}>
          <Text style={styles.star}>⭐⭐⭐⭐⭐</Text>
          <Text style={styles.textReview}>({data[0]?.rate} đánh giá)</Text>
        </View>
        <View style={styles.location}>
          <IconIonicons size={18} name="location" />
          <Text style={styles.textAddress}>{data[0]?.location}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.headerContent}>
          <Text style={styles.h1}>{data[0]?.title}</Text>
        </View>
        <View style={[styles.bodyContent, {height: height}]}>
          <Text style={styles.textBodyContent}>{data[0]?.content}</Text>
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
                style={styles.iconChevrionStyle}
                name="chevron-up"
              />
            ) : (
              <Icon
                size={16}
                style={styles.iconChevrionStyle}
                name="chevron-down"
              />
            )}
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};
export default PitchInfomation;
const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    //flexDirection: "column",
    // position: "relative",
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
    backgroundColor: '#787878',
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
