import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  Dimensions,
  StatusBar,
  FlatList,
} from 'react-native';
import _ from 'lodash';
import moment from 'moment';
import 'moment/locale/vi';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAppSelector} from 'app/hooks';
import AppHeader from 'components/AppHeader/AppHeader';
import RowInfoMiddle from 'components/RowInfomation/RowInfo';
import filter from 'lodash/filter';
import {checkNullOrEmpty, getValue} from 'utils';
import {useNavigation} from '@react-navigation/native';
const FootballOrderDetail: React.FC<{navigation: any; route: any}> = ({
  route,
}) => {
  //const [currentDate, setCurrentDate] = useState('');
  const navigation = useNavigation();
  const id = route.params.id;
  console.log('nnnn', id);

  const customerDetailData = useAppSelector(
    state => state.userState.footballOrderData,
  );
  const dataFilter = filter(customerDetailData, o => {
    return o._id === id;
  });
  const data = dataFilter[0];
  console.log('bb1--', dataFilter);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="#61dafb"
        barStyle="dark-content"
      />
      <AppHeader title={'Chi tiết đặt sân'} color="green" colortext="#fff" />
      <View style={styles.Headers} />
      <View style={styles.Body_block}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.body_wrap}>
            <View style={styles.body_top_view}>
              <Text style={[styles.title_payment_H2]}>Hoá đơn thanh Toán</Text>
              <Text style={styles.title_payment}>
                Khung giờ: {data.timeSlot}
              </Text>
              <Text style={styles.title_payment}>Sân: {data.pitchName}</Text>
              <Text style={styles.title_payment}>
                Ngày: {data.timeBooking}, {moment().format('dddd')}
              </Text>
              <Text style={styles.title_payment}>{'------'}</Text>
            </View>
            <View style={styles.body_body_view}>
              <RowInfoMiddle label="Khách hàng" content={data.customerName} />
              <RowInfoMiddle label="Số điện thoại" content={data.numberPhone} />
              <RowInfoMiddle label="Ngày đặt" content={data.timeBooking} />
              <RowInfoMiddle label="Thông tin thêm" content={data.content} />
              <RowInfoMiddle
                label="Tiền sân"
                content={data.pricePitch}
                color="red"
              />
            </View>
            <View style={styles.serviceView}>
              <View style={styles.serviceLeftView}>
                {
                  <Text style={{color: 'gray', fontSize: 16}}>
                    {checkNullOrEmpty(data.dataService) ? '' : 'Dịch Vụ'}
                  </Text>
                }
              </View>
              <View style={styles.serviceRightView}>
                {data.dataService.map((item, index) => (
                  <View style={styles.serviceSubView}>
                    <View>
                      <Text style={styles.serviceName}>{item.nameService}</Text>
                      <Text style={styles.serviceCode}>{item.codePrice}</Text>
                    </View>
                    <View style={styles.txtQuantity}>
                      <Text>x{item.quantity}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
            <View style={styles.totalView}>
              <View style={styles.totalLeftView}>
                <Text style={{fontSize: 16, color: 'gray'}}>{'Tổng Tiền'}</Text>
              </View>
              <View style={styles.totalRightView}>
                <Text style={styles.txtTotal}>{data.total}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
const HEIGHT = Dimensions.get('screen').height;
const styles = StyleSheet.create({
  container: {
    //  backgroundColor:'red',
    flex: 1,
  },
  Headers: {
    width: '100%',
    height: '28%',
    backgroundColor: 'green',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    //  position: 'absolute',
  },
  // Body
  Body_block: {
    // height: 500,
    minHeight: HEIGHT / 2,
    maxHeight: HEIGHT,
    position: 'absolute',
    top: '15%',
    backgroundColor: '#e5e5e5',
    marginHorizontal: '10%',
    borderRadius: 10,
    elevation: 20,
    width: '80%',
  },
  body_wrap: {
    marginHorizontal: 10,
    justifyContent: 'center',
    flex: 1,
    //  backgroundColor:'green'
    //alignItems: 'center',
    // marginBottom: 20
  },
  body_top_view: {
    // backgroundColor:'red',
    alignItems: 'center',
    marginVertical: 10,
  },
  title_payment: {
    paddingVertical: 2,
  },
  title_payment_H2: {
    fontSize: Platform.OS === 'ios' ? 16 : 22,
    fontWeight: 'bold',
    paddingVertical: 10,
  },
  body_body_view: {},
  body_body_left: {
    //  backgroundColor:'red',
    width: '50%',
    padding: 5,
  },
  body_body_right: {
    //  backgroundColor:'green',
    width: '50%',
    padding: 5,
  },
  body_body_text: {
    padding: 7,
  },

  /// service
  service_view: {
    // backgroundColor:'red',
    flexDirection: 'row',
  },
  service_view_left: {
    // backgroundColor:'green',
    width: '47%',
    padding: 5,
    marginLeft: 10,
  },
  service_view_right: {
    //  backgroundColor:'red',
    width: '50%',
    justifyContent: 'center',
  },
  right_view: {
    // backgroundColor:'blue',
    flexDirection: 'row',
    //backgroundColor:'green',
    borderWidth: 1,
    borderColor: 'gray',
    width: '80%',
    borderRadius: 10,
    //justifyContent: 'center',
    height: 40,
    // alignItems: 'center',
    justifyContent: 'space-between',
  },
  right_view_view: {
    // borderRightWidth:1,
    width: '33%',
    borderRightWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  right_view_view1: {
    // borderRightWidth:1,
    width: '33%',
    // borderRightWidth:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  right_btn: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  // footer

  footer_view: {
    // backgroundColor:'pink',
    marginVertical: 10,
    marginBottom: 20,
  },
  footer_wrap: {
    marginHorizontal: 40,
    // justifyContent:'center',8i
    // backgroundColor:'red',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'gray',
  },
  footer_btn: {
    textAlign: 'center',
    padding: 8,
    color: 'green',
  },
  payment_view: {
    // backgroundColor:'pink',
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 4 : 0,
    height: '8%',
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 10,
  },
  payment_view_left: {
    width: '70%',
    // backgroundColor:'red',
    alignItems: 'flex-end',
    padding: 10,
  },
  payment_view_right: {
    backgroundColor: 'orange',
    width: '30%',
    justifyContent: 'center',
  },
  txt_Total: {
    fontSize: Platform.OS === 'ios' ? 12 : 16,
  },
  number_Total: {
    fontWeight: 'bold',
    color: 'red',
  },
  btn_payment: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: Platform.OS === 'ios' ? 12 : 16,
    marginHorizontal: 10,
  },
  serviceView: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  serviceLeftView: {
    width: '50%',
  },
  serviceRightView: {
    width: '50%',
  },
  serviceName: {
    fontWeight: 'bold',
  },
  serviceCode: {
    fontSize: 11,
  },
  serviceSubView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  txtQuantity: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalView: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  totalLeftView: {
    width: '50%',
  },
  totalRightView: {
    width: '50%',
    alignItems: 'center',
  },
  txtTotal: {
    color: 'purple',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
export default FootballOrderDetail;
