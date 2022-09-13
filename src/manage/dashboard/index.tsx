import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ProgressBar, MD3Colors} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
const Dashboard: React.FC = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerWrap}>
        <View style={styles.headerView}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <AntDesignIcon name="menu-fold" size={20} />
          </TouchableOpacity>

          <Text> Dashboard</Text>
          <FontAwesomeIcon name="bell-o" size={20} />
        </View>
        <View style={styles.totalView}>
          <View style={styles.squareView}>
            <View style={styles.txtRevenueView}>
              <Text style={{color: '#fff'}}>Doanh Thu</Text>
            </View>
            <View style={styles.numberRevenue}>
              <View style={{width: '80%'}}>
                <Text style={styles.txtTotal}>$ 500</Text>
                <ProgressBar
                  progress={0.7}
                  color={'#fff'}
                  style={{height: 6}}
                />
              </View>
              <View style={styles.chartIconView}>
                <AntDesignIcon
                  name="barschart"
                  size={20}
                  style={{color: '#fff'}}
                />
                <Text style={{color: '#fff'}}>70%</Text>
              </View>
            </View>

            <View style={styles.targetView}>
              <Text style={{color: '#fff'}}> Daily spend target: 16.89$</Text>
            </View>
          </View>
        </View>
        <View style={styles.sectionView}>
          <View
            style={[
              styles.boxView,
              {backgroundColor: '#000080', elevation: 10},
            ]}>
            <TouchableOpacity>
              <View style={styles.titleBox}>
                <Text style={{fontSize: 12, color: '#fff'}}>Số trận</Text>
              </View>
              <View style={{padding: 10, flexDirection: 'row'}}>
                <IoniconsIcon
                  name="md-football"
                  size={22}
                  style={{color: '#C5B4E3'}}
                />
                <Text
                  style={{fontWeight: '600', fontSize: 18, color: '#C5B4E3'}}>
                  20
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={[
              styles.boxView,
              {backgroundColor: '#DAA520', elevation: 10},
            ]}>
            <View style={styles.titleBox}>
              <Text style={styles.txtRoot}>Trận huỷ</Text>
            </View>
            <View style={{padding: 10, flexDirection: 'row'}}>
              <IoniconsIcon
                name="md-football"
                size={22}
                style={{color: '#ff1e1e'}}
              />
              <Text style={{fontWeight: '600', fontSize: 18, color: '#ff1e1e'}}>
                3
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.boxView,
              {backgroundColor: '#800080', elevation: 10},
            ]}>
            <View style={styles.titleBox}>
              <Text style={styles.txtRoot}>Dịch Vụ CB</Text>
            </View>
            <View style={{padding: 10, flexDirection: 'row'}}>
              <MaterialCommunityIcons
                name="shoe-cleat"
                size={22}
                style={{color: '#fff'}}
              />
              <Text style={{fontWeight: '600', fontSize: 18, color: '#fff'}}>
                3
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.boxView,
              {backgroundColor: '#228b22', elevation: 10},
            ]}>
            <View style={styles.titleBox}>
              <Text style={styles.txtRoot}>Đồ uống</Text>
            </View>
            <View style={{padding: 10, flexDirection: 'row'}}>
              <EntypoIcon name="cup" size={20} style={{color: '#00ffff'}} />
              <Text style={{fontWeight: '600', fontSize: 18, color: '#00ffff'}}>
                333
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.tableGridView}>
          <Text style={{color: 'blue', fontWeight: '600'}}>See All</Text>
        </View>
        <View style={styles.th}>
          <View style={{width: '40%'}}>
            <Text>Khách hàng</Text>
          </View>
          <View style={{width: '25%',alignItems: 'center'}}>
            <Text>Trạng thái</Text>
          </View>
          <View style={{width: '35%', alignItems: 'flex-end'}}>
            <Text>Tổng tiền</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 10,
            backgroundColor: '#E5E5E5',
            marginTop: 3,
            paddingVertical: 8,
            paddingHorizontal: 7,
          }}>
          <View style={{width: '40%'}}>
            <Text style={{color: '#3B3B3B'}}>{'Van Hung Vuong'}</Text>
          </View>
          <View style={{width: '25%'}}>
            <Text style={{textAlign: 'center'}}>{'success'}</Text>
          </View>
          <View style={{width: '35%', alignItems: 'flex-end'}}>
            <Text style={{color: 'green', fontWeight: 'bold', fontSize: 12}}>
              {'+ 450.000VND'}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 10,
            backgroundColor: '#E5E5E5',
            marginTop: 3,
            paddingVertical: 8,
            paddingHorizontal: 7,
          }}>
          <View style={{width: '40%'}}>
            <Text style={{color: '#3B3B3B'}}>{'Van Hung Vuong'}</Text>
          </View>
          <View style={{width: '25%'}}>
            <Text style={{textAlign: 'center'}}>{'success'}</Text>
          </View>
          <View style={{width: '35%', alignItems: 'flex-end'}}>
            <Text style={{color: 'green', fontWeight: 'bold', fontSize: 12}}>
              {'+ 450.000VND'}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerWrap: {
    flex: 1,
    margin: 15,
    marginHorizontal: 20,
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  totalView: {
    //backgroundColor: 'green',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  txtRevenueView: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  numberRevenue: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 3,
  },
  txtTotal: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingVertical: 5,
    color: '#fff',
  },
  chartIconView: {
    paddingVertical: 10,
  },
  targetView: {
    paddingHorizontal: 5,
  },
  sectionView: {
    //backgroundColor: 'green',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  squareView: {
    flex: 1,
    backgroundColor: '#009FFD',
    height: 140,
    margin: 5,
    borderRadius: 10,
    justifyContent: 'space-evenly',
  },
  boxView: {
    width: '22%',
    margin: 5,
    height: 75,
    borderRadius: 10,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  titleBox: {
    padding: 5,
    justifyContent: 'space-evenly',
  },
  txtRoot: {
    fontSize: 12,
    color: '#fff',
  },
  tableGridView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginHorizontal: 10,
    marginTop: 10,
  },
  th: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    backgroundColor: '#C5C5C5',
    marginVertical: 3,
    paddingVertical: 12,
    paddingHorizontal: 7,
  },
});
export default Dashboard;
