import {setMarData} from 'features/book-football-pitch/FootballSlice';
import _ from 'lodash';
import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
interface Props {
  quantity: number;
  increase?: () => any;
  decrease?: () => any;
}
//handle7up(code, prices)
const ProductItem: React.FC<Props> = ({quantity, decrease, increase}) => {
  return (
    <View style={styles.service_view_right}>
      <View style={styles.right_view}>
        <View style={styles.right_view_view}>
          <TouchableOpacity onPress={decrease}>
            <Text style={[styles.right_btn, {fontSize: 28}]}>-</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.right_view_view}>
          <Text style={styles.right_btn}>{quantity}</Text>
        </View>
        <View style={styles.right_view_view1}>
          <TouchableOpacity onPress={increase}>
            <Text style={[styles.right_btn, {fontSize: 22}]}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
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
});
export default ProductItem;
