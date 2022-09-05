import moment from 'moment';
import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Divider, Menu, Provider} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import _ from 'lodash';
const Notification: React.FC = () => {
  const [visible, setVisible] = React.useState(false);
  const toggleMenu = () => setVisible(!visible);
  //
  //  console.log('vvv--',customerDetailData);
  //   const newData = _.filter(customerDetailData, o => {
  //     if (moment().isBefore(o.date)) {
  //       // return o;
  //     } else if (moment().isAfter(o.date) && o.username === username) {

  //         }
  //     return o;
  //   });;
  //   console.log('jjj--', newData.length);
  return (
    <View style={{borderRadius: 0}}>
      <Menu
        style={{padding: 10, borderRadius: -5, width: '60%', flexWrap: 'wrap'}}
        visible={visible}
        onDismiss={toggleMenu}
        anchor={
          <View>
            <Text
              style={{
                backgroundColor: 'red',
                fontSize: 11,
                position: 'absolute',
                zIndex: 11,
                right: -7,
                top: -7,
                borderRadius: 50,
                padding: 1,
                paddingHorizontal: 6,
                textAlign: 'center',
              }}>
              1
            </Text>
            <TouchableOpacity onPress={toggleMenu}>
              <FontAwesome name="bell-o" size={22} />
            </TouchableOpacity>
          </View>
        }>
        <TouchableOpacity
          onPress={() => {
            toggleMenu();
            // onEdit();
          }}
          style={styles.btnPopupEdit}>
          <View style={{flexDirection: 'row'}}>
            <AntDesign
              name="check"
              size={20}
              style={[styles.iconEdit, {color: 'green'}]}
            />
            <Text>
              {'Bạn vừa đặt thành công sân bóng !'}
              <Text
                style={{
                  fontSize: 11,
                  textDecorationStyle: 'dashed',
                  color: 'blue',
                }}>
                {' '}
                Xem ngay
              </Text>
            </Text>
          </View>
          <Text
            style={{
              textAlign: 'right',
              fontSize: 11,
              marginHorizontal: 10,
              color: 'grey',
            }}>
            {'20/12/2022 15:30'}
          </Text>
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity
          onPress={() => {
            toggleMenu();
            // onEdit();
          }}
          style={styles.btnPopupEdit}>
          <View style={{flexDirection: 'row'}}>
            <AntDesign
              name="check"
              size={20}
              style={[styles.iconEdit, {color: 'green'}]}
            />
            <Text>
              {'Bạn vừa đặt thành công sân bóng !'}
              <Text
                style={{
                  fontSize: 11,
                  textDecorationStyle: 'dashed',
                  color: 'blue',
                }}>
                {' '}
                Xem ngay
              </Text>
            </Text>
          </View>
          <Text
            style={{
              textAlign: 'right',
              fontSize: 11,
              marginHorizontal: 10,
              color: 'grey',
            }}>
            {'20/12/2022 15:30'}
          </Text>
        </TouchableOpacity>
      </Menu>
    </View>
  );
};
const styles = StyleSheet.create({
  btnPopupEdit: {
    //  flexDirection: 'row',
    // paddingVertical: 10,
    // marginHorizontal: 2,
    //  borderBottomWidth: 0.5,
    marginRight: 5,
    //   borderColor: '#e5e5e5',
    borderRadius: 0,
    //  backgroundColor:'red'
  },
  iconEdit: {
    marginEnd: 5,
    padding: 5,
  },
  btnPopupDelete: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

export default Notification;
