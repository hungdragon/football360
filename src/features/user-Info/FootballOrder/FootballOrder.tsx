import * as React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import _ from 'lodash';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {useAppSelector} from 'app/hooks';
import {useAppUser} from 'context/AppUserContext';
import AppHeader from 'components/AppHeader/AppHeader';
interface Props {
  navigation: any;
}
const FootballOrder: React.FC<Props> = () => {
  const navigation = useNavigation();
  const customerDetailData = useAppSelector(
    state => state.userState.footballOrderData,
  );
  const EmptyComponent = () => {
    return (
      <View
        style={{height: 200, justifyContent: 'center', alignItems: 'center'}}>
        <Text>{'Không có lịch nào !'}</Text>
      </View>
    );
  };
  const RenderItems = ({item}) => {
    return <ListItem items={item} />;
  };
  const ListItem = ({items}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('FootballOrderDetail' as never, {id: items._id} as never)
        }>
        <View style={styles.itemView}>
          <Text style={{fontSize: 20, fontWeight: 'bold', padding: 1}}>
            {items.namePitch}
          </Text>
          <Text
            style={{
              fontSize: 14,
              padding: 1,
            }}>{`Khung giờ: ${items.timeSlot}`}</Text>
          <Text
            style={{
              fontSize: 14,
              padding: 1,
            }}>{`Ngày: ${items.timeBooking}`}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontSize: 14,
                padding: 1,
                fontWeight: 'bold',
                marginTop: 3,
              }}>
              Tổng tiền:
            </Text>
            <Text
              style={{
                fontSize: 17,
                padding: 1,
                fontWeight: 'bold',
                color: '#CC0099',
              }}>
              {items.total}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="Lịch Đặt Sân" />
      <View style={{alignItems: 'flex-end',marginRight:20}}>
        <TouchableOpacity
         onPress={()=>{navigation.navigate('HistoryOrder' as never)}}
        >

        <Text style={{textDecorationLine:'underline', color:'blue'}}>Lịch sử đặt sân >>></Text>
        </TouchableOpacity>
      </View> 
      <View style={styles.listView}>
        <FlatList
          data={customerDetailData}
          renderItem={RenderItems}
          ListEmptyComponent={EmptyComponent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5e5e5',
  },
  listView: {
    flex: 1,
    marginHorizontal: 15,
    // backgroundColor:'red'
    marginTop: 20,
  },
  itemView: {
    backgroundColor: '#fff',
    marginVertical: 5,
    padding: 5,
    paddingVertical: 20,
    borderRadius: 5,
  },
  btnDelete: {},
  //Modal
  modalView: {
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 15,
    borderRadius: 5,
  },
  modalTitle: {
    textAlign: 'center',
    fontSize: 16,
    height: 40,
  },
  modalMessage: {
    textAlign: 'center',
    fontSize: 14,
    height: 50,
  },
  btnView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    width: '100%',
  },
  btnCancel: {
    padding: 10,
    // backgroundColor: 'purple',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnModalDelete: {
    padding: 10,
    backgroundColor: 'red',
    width: '50%',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default FootballOrder;
