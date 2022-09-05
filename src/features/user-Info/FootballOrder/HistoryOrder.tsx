import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import _ from 'lodash';
import 'moment/locale/vi';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAppSelector} from 'app/hooks';
import AppHeader from 'components/AppHeader/AppHeader';
import {FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
const HistoryOrder: React.FC = () => {
  const navigation = useNavigation();
  const historyOrderData = useAppSelector(
    state => state.userState.historyOrderData,
  );
  const RenderItems = ({item}) => {
    return <ListItem items={item} />;
  };
  const ListItem = ({items}) => {
    return (
      <TouchableOpacity
        disabled
        onPress={() =>
          navigation.navigate(
            'FootballOrderDetail' as never,
            {id: items._id} as never,
          )
        }>
        <View style={styles.itemView}>
          <Text style={{fontSize: 20, fontWeight: 'bold', padding: 1}}>
            {items.namePitch}
          </Text>
          <Text
            style={{
              fontSize: 14,
              padding: 1,
              color: 'gray',
            }}>{`Khung giờ: ${items.timeSlot}`}</Text>
          <Text
            style={{
              fontSize: 14,
              padding: 1,
              color: 'gray',
            }}>{`Ngày: ${items.timeBooking}`}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontSize: 14,
                padding: 1,
                fontWeight: 'bold',
                marginTop: 3,
                color: 'gray',
              }}>
              Tổng tiền:
            </Text>
            <Text
              style={{
                fontSize: 17,
                padding: 1,
                fontWeight: 'bold',
                color: 'gray',
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
      <AppHeader title="Lịch sử đặt sân" />
      <View style={styles.listView}>
        <FlatList
          data={historyOrderData}
          renderItem={RenderItems}
          //   ListEmptyComponent={EmptyComponent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listView: {
    flex: 1,
    marginHorizontal: 15,
    // backgroundColor:'red'
    marginTop: 20,
  },
  itemView: {
    backgroundColor: '#e5e5e5',
    marginVertical: 5,
    padding: 5,
    paddingVertical: 20,
    borderRadius: 5,
  },
  btnDelete: {},
  //Modal
  modalView: {
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
export default HistoryOrder;
