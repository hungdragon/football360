import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Buffer} from 'buffer';
interface Props {
  item: any;
}
const PitchItem: React.FC<Props> = ({item}) => {
  const navigation = useNavigation();
  const base64Image = `data:image/png;base64,${item.image.image.data}`;
  return (
    <TouchableOpacity
      key={item._id}
      // style={{ backgroundColor: 'rgba(0, 0, 0, .5)',zIndex:9999}}
      onPress={() => {
        navigation.navigate(
          'FindPitchDetail' as never,
          {id: item._id} as never,
        );
        //dispatch(setNamePitch(item?.pitchName));
      }}>
      <ImageBackground
        source={{uri: base64Image}}
        imageStyle={styles.styleItemImage}
        style={styles.pitch_element}>
        <View style={styles.time_block}>
          <View style={styles.styleElementTimeBlock}>
            <Text style={styles.text_time}>{item?.fullTimeSlot}</Text>
          </View>

          {item.km == null || undefined ? null : (
            <Text style={styles.styleKM}>
              <Text style={styles.txtKM}>{item.km}</Text> km{' '}
            </Text>
          )}
        </View>
        <View style={styles.address_block}>
          <View style={styles.address_left}>
            <Text
              style={{
                fontSize: Platform.OS === 'ios' ? 18 : 18,
                fontWeight: 'bold',
                color: '#fff',
                textShadowRadius: 3,
                textShadowColor: 'black',
              }}>
              {item?.pitchName}
            </Text>
            <Text
              style={{
                color: '#FAFAD2',
                fontWeight: '800',
                fontSize: Platform.OS === 'ios' ? 13 : 16,
                // textShadowRadius: 3,
                // textShadowColor: 'black',
                //∂∂∂ textShadowOffset: {width: -1, height: 0},
                // backgroundColor:'red',
                //∂∂∂  padding: 2
              }}>
              {item?.location}
            </Text>
          </View>
          <View style={styles.address_right}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: '#00FFFF',
                textShadowColor: 'black',
                textShadowRadius: 4,
                marginHorizontal: 1,
              }}>
              Sân cỏ nhân tạo
            </Text>
            <Text
              style={{
                fontSize: Platform.OS === 'ios' ? 12 : 16,
                fontWeight: 'bold',
                color: '#FFD700',
                textShadowColor: 'black',
                textShadowRadius: 4,
              }}>
              {item?.priceRange}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};
export default PitchItem;
const {height} = Dimensions.get('screen');
const height_pitch = height * 0.25;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#e5e5e5',
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
    color: 'gray',
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
    // height: 35,
    backgroundColor: '#fff',
    padding: 5,
    fontSize: Platform.OS === 'ios' ? 14 : 18,
    borderRadius: 5,
  },
  txtKM: {
    fontWeight: 'bold',
  },
  // Phần 2
  body_block: {
    // backgroundColor:'#e5e5e5',
    flexDirection: 'column',
    height: '100%',
    //backgroundColor: "blue",
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

    //backgroundColor: "pink",
    borderRadius: 20,
    flexDirection: 'column',
  },
  time_block: {
    height: height_pitch / 3,
    // backgroundColor:'red',
    padding: 10,
    // backgroundColor:'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text_time: {
    // textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: Platform.OS === 'ios' ? 14 : 16,
  },
  pitch_element: {
    marginVertical: 5,
    height: height_pitch,
    borderRadius: 20,
    // backgroundColor: "gray",
    marginHorizontal: 10,
    //flexDirection: "row",
    backgroundColor: 'rgba(0, 0, 0, .5)',
    zIndex: -1,
  },
  address_block: {
    height: height_pitch / 1.6,
    flexDirection: 'row',
    // backgroundColor: "red",
    alignItems: 'flex-end',
    marginHorizontal: 10,
    // width:height_pitch/2

    //justifyContent: 'flex-end'
  },
  address_left: {
    width: '60%',
    // backgroundColor:'blue'
  },
  address_right: {
    width: '40%',
    flexDirection: 'column',
    alignItems: 'center',
    //paddingHorizontal: 2
    // backgroundColor:'green',
    //marginVertical:15
  },
  loadingAndErrorStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
