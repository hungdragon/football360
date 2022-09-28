import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
interface Props {
  data: any;
}
const DisplayImageList: React.FC<Props> = ({data}) => {
  const imgArray = data[0].imgArray;
  const [imgActive, setImgActive] = useState(0);
  const onChange = (nativeEvent: any) => {
    //  const contentOffset = 0;
    // console.log(nativeEvent.contentOffset.x);
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
    );
    if (slide !== imgActive) {
      setImgActive(slide);
    }
  };
  return (
    <View style={styles.arrayImageView}>
      <View
      //style={styles.arrayImageViewWrap}
      >
        <ScrollView
          horizontal
          style={{height: HEIGHT * 0.32, width: WIDTH}}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={({nativeEvent}) => {
            onChange(nativeEvent);
          }}>
          {imgArray?.map((item: any, index: any): any => {
            let base64 = `data:image/png;base64,${item.data}`;
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
        <View style={styles.slideImage}>
          <Text>
            {imgActive + 1}/{imgArray.length}
          </Text>
        </View>
      </View>
    </View>
  );
};
export default DisplayImageList;
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
