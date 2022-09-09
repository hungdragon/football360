import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
const Dashboard: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerWrap}>
        <View style={styles.headerView}>
          <AntDesignIcon name="setting" size={20} />
          <Text> Dashboard</Text>
          <AntDesignIcon name="search1" size={20} />
        </View>
        <View style={styles.sectionView}>
            <View style={styles.squareView}>
                <Text>1</Text>
            </View>
            <View style={styles.squareView}>
                <Text>2</Text>
            </View>
            <View style={styles.squareView}>
                <Text>3</Text>
            </View>
            <View style={styles.squareView}>
                <Text>4</Text>
            </View>
        </View>
        <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
            <Text>Task</Text>
            <Text>All</Text>
        </View>
        <View style={{flex: 1, backgroundColor:'#fff',marginHorizontal:15,paddingVertical: 10}}>
            <View style={{flexDirection: 'row',justifyContent: 'space-between',padding:10,backgroundColor:'#e5e5e5',marginVertical:3}}>
                <Text>{'Van Hung Vuong'}</Text>
                <Text>{'success'}</Text>
                <Text style={{color:'green',fontWeight: 'bold'}}>{'+ 450.000VND'}</Text>
            </View>
            <View style={{flexDirection: 'row',justifyContent: 'space-between',padding:10,backgroundColor:'#e5e5e5',marginVertical:3}}>
                <Text>{'Van Hung Vuong'}</Text>
                <Text>{'success'}</Text>
                <Text style={{color:'green',fontWeight: 'bold'}}>{'+ 450.000VND'}</Text>
            </View>
            <View style={{flexDirection: 'row',justifyContent: 'space-between',padding:10,backgroundColor:'#e5e5e5',marginVertical:3}}>
                <Text>{'Van Hung Vuong'}</Text>
                <Text>{'success'}</Text>
                <Text style={{color:'green',fontWeight: 'bold'}}>{'+ 450.000VND'}</Text>
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
    marginHorizontal: 30,
    backgroundColor: 'blue',
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: 'red',
    padding: 10,
  },
  sectionView: {
    //backgroundColor: 'green',
    padding: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  squareView: {
    width: '46%',
    backgroundColor: 'pink',
    margin: 5,
    height: 100,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
export default Dashboard;
