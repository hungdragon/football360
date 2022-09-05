import React from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {useAppSelector} from 'app/hooks';
import {useNavigation} from '@react-navigation/native';
import {image} from 'assets/icons';

interface Props {
  route: any;
}
const UserUpdate: React.FC<Props> = ({route}) => {
  const {name, email} = route.params;
  const navigation = useNavigation();
  const phone = useAppSelector(state => state.loginState.phoneNumber);

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="rgba(0,0,0,0)"
        barStyle="light-content"
      />
      <ImageBackground
        source={image.BG_Profile}
        resizeMode="cover"
        imageStyle={{borderBottomLeftRadius: 5, borderBottomRightRadius: 5}}
        style={styles.View_Top}>
        <View style={styles.View_top_header}>
          <View style={{width: '33%'}}>
            <Text />
          </View>
          <View style={styles.Title_Header_block}>
            <Text style={styles.Title_Header}>Thông tin</Text>
          </View>
        </View>
        <View style={styles.View_top_body}>
          <Image source={image.IC_Football_Logo} style={styles.Avatar} />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(
                'EditScreen' as never,
                {
                  id: 1,
                  title: 'Họ & tên',
                  label: 'Họ & tên gồm 2 từ trở lên',
                  name: name,
                } as never,
              );
            }}>
            <View style={styles.fullNameView}>
              <Text style={styles.txt_UserName}>{name}</Text>
              <AntDesignIcon
                name="edit"
                size={25}
                color="#1E90FF"
                style={{marginLeft: 10}}
              />
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View style={styles.View_body}>
        <View style={styles.body_block}>
          <TouchableOpacity
            onPress={() => {
              // navigation.navigate("EditScreen", {
              //   id: 2,
              //   title: "Email",
              //   name: "hungvan804@gmail.comm",
              // });
              Alert.alert('Thông tin trường này không được thay đổi.');
            }}>
            <View style={{flexDirection: 'row'}}>
              <Icon name="pencil" size={20} color="#900" style={{padding: 5}} />
              <Text style={styles.txt_info}> Email</Text>
            </View>
            <TextInput
              value={email}
              editable={false}
              placeholder="abcxyz@gmail.com"
              style={styles.txt_info_2}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.body_block}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(
                'EditScreen' as never,
                {
                  id: 3,
                  title: 'Điện thoại',
                  label: 'Số điện thoải phải đủ 10 số',
                  name: phone,
                } as never,
              );
            }}>
            <View style={{flexDirection: 'row'}}>
              <Icon name="mobile" size={24} color="#900" style={{padding: 5}} />
              <Text style={styles.txt_info}> Điện thoại</Text>
            </View>
            <TextInput
              editable={false}
              placeholder="0961..."
              style={styles.txt_info_2}
              value={phone}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.body_block}>
          <View style={{flexDirection: 'row'}}>
            <Icon
              name="facebook-square"
              size={20}
              color="#900"
              style={{padding: 5}}
            />
            <Text style={styles.txt_info}> Facebook</Text>
          </View>
          <TextInput placeholder="shyn.one.love" style={styles.txt_info_2} />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
  View_Top: {
    flex: 0.35,
    height: '100%',
    //backgroundColor: "purple",
    borderRadius: 50,
  },
  View_top_header: {
    flexDirection: 'row',
    height: '30%',
    //justifyContent: 'space-around',
    alignItems: 'flex-end',
    // backgroundColor:'green',
    marginBottom: 5,
  },
  Title_Header_block: {
    width: '33%',
    //  backgroundColor:'red',
    // fontSize:17,
    // fontWeight:'bold',
    alignItems: 'center',
    height: 30,
    //fontWeight:'bold',
  },
  Title_Header: {
    // width:'33%',
    //backgroundColor:'red',
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 5,
    // alignItems: 'center',
    // height:50,
    //fontWeight:'bold',
    color: 'white',
  },
  btn_Save_block: {
    width: '33%',
    // backgroundColor:'green',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  btn_Save: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    backgroundColor: 'green',
    fontWeight: 'bold',
    color: 'white',
  },
  View_top_body: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    // backgroundColor:'pink'
  },
  Avatar: {
    height: 120,
    width: 120,
    borderRadius: 60,
    borderColor: 'white',
    borderWidth: 2,
  },
  txt_UserName: {
    fontSize: 28,
    marginVertical: 10,
    textAlign: 'center',
    marginStart: 5,
    color: 'white',
    fontWeight: 'bold',
  },

  //View_body
  View_body: {
    flex: 0.5,
    marginTop: 20,
  },
  body_block: {
    marginHorizontal: 30,
    marginTop: 5,
    //paddingVertical: 15,
    elevation: 3,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  txt_info: {
    fontSize: 15,
    paddingVertical: 3,
    color: 'grey',
    marginTop: 5,
  },
  txt_info_2: {
    fontSize: 15,
    paddingVertical: 3,
    color: 'black',
    marginHorizontal: 33,
  },
  fullNameView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
  },
});
export default UserUpdate;
