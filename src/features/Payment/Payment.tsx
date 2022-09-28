import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
  Dimensions,
} from 'react-native';
import {useDispatch} from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import 'moment/locale/vi';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAppSelector} from 'app/hooks';
import {
  setBayUpData,
  setCocaData,
  setComment,
  setMarData,
  setProductServiceData,
  setReviveData,
  setTimeSlot,
  setTotalCustomer,
} from 'features/book-football-pitch/FootballSlice';
import AppHeader from 'components/AppHeader/AppHeader';
import RowInfoMiddle from 'components/RowInfomation/RowInfo';
import ProductItem from './components/ProductItem';
const Payment: React.FC<{navigation: any; route: any}> = ({
  navigation,
  route,
}) => {
  const dispatch = useDispatch();
  const {codeService, codePrice, price} = route?.params;
  const fullName = useAppSelector(state => state.FootballState.fullNameTxt);
  const content = useAppSelector(state => state.FootballState.comment);
  const phoneNumber = useAppSelector(
    state => state.FootballState.phoneNumberTxt,
  );
  const pitch_price = useAppSelector(state => state.FootballState.PitchPrice);
  const id_slotTime = useAppSelector(state => state.FootballState.idSlot);
  const pitchName = useAppSelector(state => state.findPitchState.pitchName);
  const timeBooking = useAppSelector(
    state => state.FootballState.dateTimeBooking,
  );
  const timeSlot = useAppSelector(state => state.FootballState.timeSlot);
  const isToday = moment().format('L');
  const productServiceDATA = useAppSelector(
    state => state.FootballState.productServiceData,
  );
  const cocaData = useAppSelector(state => state.FootballState.cocaData);
  const bayUpData = useAppSelector(state => state.FootballState.bayUpData);
  const reviveData = useAppSelector(state => state.FootballState.reviveData);
  const marData = useAppSelector(state => state.FootballState.marData);
  const back = useCallback(
    async (total: number) => {
      navigation.navigate('PaymentMethod', {
        ID_goback: id_slotTime,
        Total: total,
      });
      dispatch(setTotalCustomer(total.toFixed(3)));
      dispatch(setComment(content));
      dispatch(setTimeSlot(timeSlot));
      //dispatch(setPriceFootball(price));
    },
    [content, id_slotTime, price, timeSlot],
  );
  // const kk = JSON.stringify(productServiceDATA);
  // const hh = JSON.stringify(cocaData);
  // const jj = JSON.stringify(bayUpData);
  // const pp = JSON.stringify(reviveData);
  // const ll = JSON.stringify(marData);
  // console.log('kk------', kk);
  // console.log('hh------', hh);
  // console.log('jj------', jj);
  // console.log('pp------', pp);
  // console.log('ll------', ll);
  const pricePP = Number(price); //tien nuoc uong
  React.useEffect(() => {
    if (codeService) {
      if (codeService === 'coca') {
        setTotal(Total + pricePP);
      } else if (codeService === '7up') {
        setTotal(Total + pricePP);
      } else if (codeService === 'revive') {
        setTotal(Total + pricePP);
      } else {
        setTotal(Total + pricePP);
      }
    }
    // navigation.addListener('beforeRemove', e => {
    //   const action = e.data.action;
    //   setText('1');
    //   if (hasUnsavedChanges) {
    //     Alert.alert('12321');
    //   }
    //   // Prevent default behavior of leaving the screen
    //   e.preventDefault();
    //   // Prompt the user before leaving the screen
    //   Alert.alert('Xác nhận!', 'Bạn có muốn thoát !', [
    //     {
    //       text: 'Hủy',
    //       style: 'cancel',
    //       onPress: () => {
    //         return;
    //       },
    //     },
    //     {
    //       text: 'Đồng ý',
    //       style: 'default',
    //       onPress: () => {
    //         dispatch(setProductServiceData([]));
    //         dispatch(setReviveData([]));
    //         dispatch(setCocaData([]));
    //         dispatch(setBayUpData([]));
    //         dispatch(setMarData([]));
    //         navigation.dispatch(action);
    //       },
    //     },
    //   ]);
    // });
  }, [codeService]);
  const [addCoca, setAddCoca] = useState<number>(1);
  const [addRevive, setAddRevive] = useState<number>(1);
  const [add7up, setAdd7up] = useState<number>(1);
  const [addMar, setAddMar] = useState<number>(1);

  const [Total, setTotal] = useState<number>(Number(pitch_price));
  /////// service
  const Revive__DECREASE = (codeName: string, prices: number) => {
    if (addRevive === 1) {
      setTotal(Total - prices);
      navigation.setParams({codeService: null});
      const arr_new = _.filter(productServiceDATA, o => {
        return o.codeService !== codeName;
      });
      dispatch(setProductServiceData(arr_new));
      dispatch(setReviveData([]));
    } else {
      setTotal(Total - prices);
      setAddRevive(addRevive - 1);
      const arr_new = _.filter(reviveData, o => {
        return o.codeService === codeName;
      });
      let quantity = arr_new[0].quantity;
      quantity = quantity - 1;
      const obj = {...arr_new[0], quantity: quantity};
      dispatch(setReviveData([obj]));
    }
  };
  const Cocacola__DECREASE = (codeName: string, prices: number) => {
    if (addCoca === 1) {
      setTotal(Total - prices);
      navigation.setParams({codeService: null});
      const arr_new = _.filter(productServiceDATA, o => {
        return o.codeService !== codeName;
      });
      dispatch(setProductServiceData(arr_new));
      dispatch(setCocaData([]));
    } else {
      const arr_new = _.filter(cocaData, o => {
        return o.codeService === codeName;
      });
      setTotal(Total - prices);
      setAddCoca(addCoca - 1);
      let quantity = arr_new[0].quantity;
      quantity = quantity - 1;
      const obj = {...arr_new[0], quantity: quantity};
      dispatch(setCocaData([obj]));
    }
  };
  const SevenUp__DECREASE = (codeName: string, prices: number) => {
    if (add7up === 1) {
      setTotal(Total - prices);
      navigation.setParams({codeService: null});
      const arr_new = _.filter(productServiceDATA, o => {
        return o.codeService !== codeName;
      });
      dispatch(setProductServiceData(arr_new));
      dispatch(setBayUpData([]));
    } else {
      setTotal(Total - prices);
      setAdd7up(add7up - 1);
      const arr_new = _.filter(bayUpData, o => {
        return o.codeService === codeName;
      });
      let quantity = arr_new[0].quantity;
      quantity = quantity - 1;
      const obj = {...arr_new[0], quantity: quantity};
      dispatch(setBayUpData([obj]));
    }
  };
  const Marboro__DECREASE = (codeName: any, prices: number) => {
    if (addMar === 1) {
      setTotal(Total - prices);
      navigation.setParams({codeService: null});
      const arr_new = _.filter(productServiceDATA, o => {
        return o.codeService !== codeName;
      });
      dispatch(setProductServiceData(arr_new));
      dispatch(setMarData([]));
    } else {
      setTotal(Total - prices);
      setAddMar(addMar - 1);
      const arr_new = _.filter(marData, o => {
        return o.codeService === codeName;
      });
      let quantity = arr_new[0]?.quantity;
      quantity = quantity - 1;
      const obj = {...arr_new[0], quantity: quantity};
      dispatch(setMarData([obj]));
    }
  };
  ///----------------------------------------------------------------
  const Cocacola__INCREASE = (codeName: string, prices: number) => {
    setAddCoca(addCoca + 1);
    setTotal(Total + prices);
    const arr_new = _.filter(cocaData, o => {
      return o.codeService === codeName;
    });
    let quantity = arr_new[0].quantity;
    quantity = quantity + 1;
    const obj = {...arr_new[0], quantity: quantity};
    dispatch(setCocaData([obj]));
  };
  const Revive__INCREASE = (codeName: string, prices: number) => {
    setAddRevive(addRevive + 1);
    setTotal(Total + prices);
    const arr_new = _.filter(reviveData, o => {
      return o.codeService === codeName;
    });
    let quantity = arr_new[0].quantity;
    quantity = quantity + 1;
    const obj = {...arr_new[0], quantity: quantity};
    dispatch(setReviveData([obj]));
  };
  const SevenUp__INCREASE = (codeName: string, prices: number) => {
    setAdd7up(add7up + 1);
    setTotal(Total + prices);
    const arr_new = _.filter(bayUpData, o => {
      return o.codeService === codeName;
    });
    let quantity = arr_new[0].quantity;
    quantity = quantity + 1;
    const obj = {...arr_new[0], quantity: quantity};
    dispatch(setBayUpData([obj]));
  };
  const Marboro__INCREASE = (codeName: string, prices: number) => {
    setAddMar(addMar + 1);
    setTotal(Total + prices);
    const arr_new = _.filter(marData, (o: any) => {
      return o.codeService === codeName;
    });
    let quantity = arr_new[0].quantity;
    quantity = quantity + 1;
    const obj = {...arr_new[0], quantity: quantity};
    dispatch(setMarData([obj]));
  };
  const renderAddSL = (CODE: string, prices: string) => {
    const PRICE = Number(prices);
    switch (CODE) {
      case 'coca':
        return (
          <ProductItem
            quantity={addCoca}
            decrease={() => Cocacola__DECREASE(CODE, PRICE)}
            increase={() => Cocacola__INCREASE(CODE, PRICE)}
          />
        );
      case 'revive':
        return (
          <ProductItem
            quantity={addRevive}
            decrease={() => Revive__DECREASE(CODE, PRICE)}
            increase={() => Revive__INCREASE(CODE, PRICE)}
          />
        );
      case '7up':
        return (
          <ProductItem
            quantity={add7up}
            decrease={() => SevenUp__DECREASE(CODE, PRICE)}
            increase={() => SevenUp__INCREASE(CODE, PRICE)}
          />
        );
      case 'mar':
        return (
          <ProductItem
            quantity={addMar}
            decrease={() => Marboro__DECREASE(CODE, PRICE)}
            increase={() => Marboro__INCREASE(CODE, PRICE)}
          />
        );
      default:
        return;
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title={pitchName} color="green" colortext="#fff" />
      <View style={styles.Headers} />
      <View style={styles.Body_block}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.body_wrap}>
            <View style={styles.body_top_view}>
              <Text style={[styles.title_payment_H2]}>Chi tiết thanh Toán</Text>
              <Text style={styles.title_payment}>Khung giờ: {timeSlot}</Text>
              <Text style={styles.title_payment}>Sân: {pitchName}</Text>
              <Text style={styles.title_payment}>
                Ngày: {isToday}, {moment().format('dddd')}
              </Text>
              <Text style={styles.title_payment}>{'------'}</Text>
            </View>
            <View style={styles.body_body_view}>
              <RowInfoMiddle label="Khách hàng" content={fullName} />
              <RowInfoMiddle label="Số điện thoại" content={phoneNumber} />
              <RowInfoMiddle label="Ngày đặt" content={timeBooking} />
              <RowInfoMiddle label="Thông tin thêm" content={content} />
              <RowInfoMiddle
                label="Tiền sân"
                content={pitch_price}
                color="red"
              />
            </View>
            {/* RENDER PRODUCT SERVICES */}
            {productServiceDATA.length > 0
              ? productServiceDATA?.map((item: any, index: any) => {
                  return (
                    <View key={index} style={styles.service_view}>
                      <View style={styles.service_view_left}>
                        <Text style={{fontWeight: 'bold'}}>
                          {`${item.nameService}`}
                        </Text>
                        <Text>{`${item.codePrice}`}</Text>
                      </View>
                      {renderAddSL(item.codeService, item.price)}
                    </View>
                  );
                })
              : null}
            {/* RENDER PRODUCT SERVICES */}
            <View style={styles.footer_view}>
              <View style={styles.footer_wrap}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('ProductServices');
                  }}>
                  <Text style={styles.footer_btn}>Thêm sản phẩm</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={styles.payment_view}>
        <View style={styles.payment_view_left}>
          <Text style={styles.txt_Total}>Tổng thanh toán</Text>
          <Text style={styles.number_Total}>đ {Total.toFixed(3)}</Text>
        </View>
        <View style={styles.payment_view_right}>
          <TouchableOpacity onPress={() => back(Total)}>
            <Text style={styles.btn_payment}>Thanh toán</Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: 'white',
    marginHorizontal: '10%',
    borderRadius: 10,
    //elevation: 20,
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
});
export default Payment;
