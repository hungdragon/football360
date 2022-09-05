import React from 'react';
import {Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import _ from 'lodash';
import { useAppSelector } from 'app/hooks';
import { setBayUpData, setCocaData, setMarData, setProductServiceData, setReviveData } from 'features/book-football-pitch/FootballSlice';
import { image } from 'assets/icons';
import AppHeader from 'components/AppHeader/AppHeader';
const productData = [
  {
    nameService: 'Thuê Giày',
    codeService: 'shoes',
    price: '20.000',
    codePrice: '20K/lượt',
    quantity: 1,
  },

  {
    nameService: 'Nước giải khát',
    codeService: 'water',
    price: '10.000',
    codePrice: '10K/xô',
    quantity: 1,
  },

  {
    nameService: 'Thuê bóng',
    codeService: 'ball',
    price: '25.000',
    codePrice: '25K/lượt',
    quantity: 1,
  },

  {
    nameService: 'Thue áo',
    codeService: 'shirt',
    price: '10.000',
    codePrice: '10K/lượt',
    quantity: 1,
  },
];
const productDataOther = [
  {
    nameService: 'Cocacola',
    codeService: 'coca',
    price: '15.000',
    codePrice: '15K/lon',
    quantity: 1,
  },

  {
    nameService: 'Revive chanh muoi',
    codeService: 'revive',
    price: '12.000',
    codePrice: '12K/chai',
    quantity: 1,
  },

  {
    nameService: '7 up',
    codeService: '7up',
    price: '10.000',
    codePrice: '10K/lon',
    quantity: 1,
  },

  {
    nameService: 'Marlboro',
    codeService: 'mar',
    price: '35.000',
    codePrice: '35K/bao',
    quantity: 1,
  },
];
interface Props {
  navigation: any;
}
const ProductServices: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const productServiceDATA = useAppSelector(
    state => state.FootballState.productServiceData,
  );
  const cocaData = useAppSelector(state => state.FootballState.cocaData);
  const bayUpData = useAppSelector(state => state.FootballState.bayUpData);
  const reviveData = useAppSelector(state => state.FootballState.reviveData);
  const marData = useAppSelector(state => state.FootballState.marData);
  const Coca = (
    nameService: string,
    codeService: string,
    price: string,
    codePrice: string,
    quantity: number,
  ) => {
    const codeServiceCoca = _.filter(productServiceDATA, (o: any) => {
      return o.codeService === codeService;
    });
    if (codeServiceCoca[0]?.codeService !== codeService) {
      dispatch(
        setProductServiceData([
          ...productServiceDATA,
          {
            nameService: nameService,
            codeService: codeService,
            price: price,
            codePrice: codePrice,
            quantity: quantity,
          },
        ]),
      );
      dispatch(
        setCocaData([
          ...cocaData,
          {
            nameService: nameService,
            codeService: codeService,
            price: price,
            codePrice: codePrice,
            quantity: quantity,
          },
        ]),
      );
    } else {
      navigation.navigate('Payment', {
        nameService: nameService,
        codeService: codeService,
        price: price,
        codePrice: codePrice,
        quantity: quantity,
      });
    }
    console.log('aaaaaaaaa');
    navigation.navigate('Payment', {
      nameService: nameService,
      codeService: codeService,
      price: price,
      codePrice: codePrice,
      quantity: quantity,
    });
  };
  const Revive = (
    nameService: string,
    codeService: string,
    price: string,
    codePrice: string,
    quantity: number,
  ) => {
    const codeServiceRevive = _.filter(productServiceDATA, (o: any) => {
      return o.codeService === codeService;
    });
    if (codeServiceRevive[0]?.codeService !== codeService) {
      dispatch(
        setProductServiceData([
          ...productServiceDATA,
          {
            nameService: nameService,
            codeService: codeService,
            price: price,
            codePrice: codePrice,
            quantity: quantity,
          },
        ]),
      );
      dispatch(
        setReviveData([
          ...reviveData,
          {
            nameService: nameService,
            codeService: codeService,
            price: price,
            codePrice: codePrice,
            quantity: quantity,
          },
        ]),
      );
    } else {
      console.log('aaaaaaaaa');
      navigation.navigate('Payment', {
        nameService: nameService,
        codeService: codeService,
        price: price,
        codePrice: codePrice,
        quantity: quantity,
      });
    }
    console.log('aaaaaaaaa');
    navigation.navigate('Payment', {
      nameService: nameService,
      codeService: codeService,
      price: price,
      codePrice: codePrice,
      quantity: quantity,
    });
  };
  const bayup = (
    nameService: string,
    codeService: string,
    price: string,
    codePrice: string,
    quantity: number,
  ) => {
    const codeServiceBayup = _.filter(productServiceDATA, (o: any) => {
      return o.codeService === codeService;
    });
    if (codeServiceBayup[0]?.codeService !== codeService) {
      dispatch(
        setProductServiceData([
          ...productServiceDATA,
          {
            nameService: nameService,
            codeService: codeService,
            price: price,
            codePrice: codePrice,
            quantity: quantity,
          },
        ]),
      );
      dispatch(
        setBayUpData([
          ...bayUpData,
          {
            nameService: nameService,
            codeService: codeService,
            price: price,
            codePrice: codePrice,
            quantity: quantity,
          },
        ]),
      );
    } else {
      console.log('aaaaaaaaa');
      navigation.navigate('Payment', {
        nameService: nameService,
        codeService: codeService,
        price: price,
        codePrice: codePrice,
        quantity: quantity,
      });
    }
    console.log('aaaaaaaaa');
    navigation.navigate('Payment', {
      nameService: nameService,
      codeService: codeService,
      price: price,
      codePrice: codePrice,
      quantity: quantity,
    });
  };
  const Mar = (
    nameService: string,
    codeService: string,
    price: string,
    codePrice: string,
    quantity: number,
  ) => {
    const codeServiceMar = _.filter(productServiceDATA, (o: any) => {
      return o.codeService === codeService;
    });
    if (codeServiceMar[0]?.codeService != codeService) {
      dispatch(
        setProductServiceData([
          ...productServiceDATA,
          {
            nameService: nameService,
            codeService: codeService,
            price: price,
            codePrice: codePrice,
            quantity: quantity,
          },
        ]),
      );
      dispatch(
        setMarData([
          ...marData,
          {
            nameService: nameService,
            codeService: codeService,
            price: price,
            codePrice: codePrice,
            quantity: quantity,
          },
        ]),
      );
    } else {
      console.log('aaaaaaaaa');
      navigation.navigate('Payment', {
        nameService: nameService,
        codeService: codeService,
        price: price,
        codePrice: codePrice,
        quantity: quantity,
      });
    }
    console.log('aaaaaaaaa');
    navigation.navigate('Payment', {
      nameService: nameService,
      codeService: codeService,
      price: price,
      codePrice: codePrice,
      quantity: quantity,
    });
  };

  const RenderImageAsset = (code: string) => {
    if (code === 'shoes') {
      return (
        <TouchableOpacity>
          <View style={styles.shoes}>
            <Image source={image?.shoes} />
          </View>
        </TouchableOpacity>
      );
    }
    if (code === 'water') {
      return (
        <TouchableOpacity>
          <View style={styles.watercup}>
            <MaterialIcon
              name="cup"
              style={{
                color: '#00BFFF',
                fontSize: 30,
                textAlign: 'center',
              }}
            />
          </View>
        </TouchableOpacity>
      );
    }
    if (code === 'ball') {
      return (
        <TouchableOpacity>
          <View style={styles.ball}>
            <Ionicons
              name="football"
              style={{
                color: '#00FF7F',
                fontSize: 30,
                textAlign: 'center',
              }}
            />
          </View>
        </TouchableOpacity>
      );
    }
    if (code === 'shirt') {
      return (
        <TouchableOpacity>
          <View style={styles.shirt}>
            <Ionicons
              name="shirt"
              style={{
                color: '#00BFFF',
                fontSize: 30,
                textAlign: 'center',
              }}
            />
          </View>
        </TouchableOpacity>
      );
    }
  };

  const RenderImage = (
    nameService: string,
    codeService: string,
    price: string,
    codePrice: string,
    quantity: number,
  ) => {
    if (codeService === 'coca') {
      console.log('444--', codeService);
      return (
        <TouchableOpacity
          onPress={() => {
            Coca(nameService, codeService, price, codePrice, quantity);
          }}>
          <Image source={image?.coca} style={{width: 80, height: 80}} />
        </TouchableOpacity>
      );
    }
    if (codeService === 'revive') {
      return (
        <TouchableOpacity
          onPress={() => {
            Revive(nameService, codeService, price, codePrice, quantity);
          }}>
          <Image source={image?.revive} style={{width: 80, height: 80}} />
        </TouchableOpacity>
      );
    }
    if (codeService === '7up') {
      return (
        <TouchableOpacity
          onPress={() => {
            bayup(nameService, codeService, price, codePrice, quantity);
          }}>
          <Image source={image?.bayup} style={{width: 80, height: 80}} />
        </TouchableOpacity>
      );
    }
    if (codeService === 'mar') {
      return (
        <TouchableOpacity
          onPress={() => {
            Mar(nameService, codeService, price, codePrice, quantity);
          }}>
          <Image source={image?.marlboro} style={{width: 80, height: 80}} />
        </TouchableOpacity>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="Quay lai" />
      <View style={styles.basicService}>
        <Text style={{padding: 10}}>Dịch vụ cơ bản</Text>
        <View style={styles.serviceWrap}>
          {productData.map((item, index) => {
            return (
              <View key={index} style={styles.basicProduct}>
                {RenderImageAsset(item.codeService)}
                <Text style={styles.title}>{item.nameService}</Text>
                <Text style={styles.price}>{item.codePrice}</Text>
              </View>
            );
          })}
        </View>
      </View>
      <View style={styles.productOther}>
        <Text style={{padding: 15}}>Sản phẩm dịch vụ khác</Text>
        <View style={styles.otherWrap}>
          {productDataOther.map((item, index) => {
            return (
              <View key={index} style={styles.otherItemWrap}>
                <View style={styles.Item}>
                  {RenderImage(
                    item.nameService,
                    item.codeService,
                    item.price,
                    item.codePrice,
                    item.quantity,
                  )}
                  <Text style={{textAlign: 'center', fontSize: 12}}>
                    {item.nameService}
                  </Text>
                  <Text style={{textAlign: 'center'}}>{item.codePrice}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  basicService: {},
  basicProduct: {
    padding: 5,
    width: '25%',
    // backgroundColor:'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {marginTop: 4, fontSize: 12, fontWeight: 'bold'},
  price: {fontSize: 12, textAlign: 'center'},
  watercup: {
    justifyContent: 'center',
    backgroundColor: 'red',
    alignItems: 'center',
    padding: 5,
    borderRadius: 50,
    width: 60,
    height: 60,
  },
  ball: {
    justifyContent: 'center',
    backgroundColor: 'pink',
    alignItems: 'center',
    padding: 5,
    borderRadius: 50,
    width: 60,
    height: 60,
  },
  shirt: {
    justifyContent: 'center',
    backgroundColor: 'yellow',
    alignItems: 'center',
    padding: 5,
    borderRadius: 50,
    width: 60,
    height: 60,
  },
  shoes: {
    justifyContent: 'center',
    backgroundColor: 'green',
    alignItems: 'center',
    padding: 5,
    borderRadius: 50,
    width: 60,
    height: 60,
  },
  serviceWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    //width:'100%'
  },
  //productOther
  productOther: {
    backgroundColor: '#fff',
  },
  otherWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  otherItemWrap: {},
  Item: {
    padding: 20,
  },
});

export default ProductServices;
