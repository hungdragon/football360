import {setFullName, setPhoneNumber} from 'features/login/loginSlice';
import React, {useState} from 'react';
import {
  Text,
  Button,
  TextInput,
  Alert,
  StatusBar,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {userProfileApi} from './userProfileApi';
interface Props {
  route: any;
  navigation: any;
}

const EditScreen: React.FC<Props> = ({navigation, route}) => {
  const props = route.params;
  console.log(props.id);

  const [textInput, setTextInput] = useState(props.name);
  const dispatch = useDispatch();
  const updateFullName = async (fullName: string) => {
    console.log('fullname', fullName);
    userProfileApi
      .updateFullName(fullName)
      .then(() => {
        console.log('ss');
        dispatch(setFullName(fullName));
        Alert.alert('Thành công', 'Đổi Tên thành công', [
          {text: 'OK', onPress: () => navigation.popToTop()},
        ]);
      })
      .catch(err => {
        Alert.alert('Thất bại', err.message, [{text: 'OK'}]);
      });
  };
  const updatePhoneNumber = async (phoneNumber: string) => {
    console.log('phoneNumber', phoneNumber);
    userProfileApi
      .updatePhoneNumber(phoneNumber)
      .then(() => {
        dispatch(setPhoneNumber(phoneNumber));
        Alert.alert('Thành công', 'Đổi SDT thành công', [
          {text: 'OK', onPress: () => navigation.popToTop()},
        ]);
      })
      .catch(err => {
        console.log('bbbbb---', err);
        Alert.alert('Thất bại', err.message, [{text: 'OK'}]);
      });
    // const response = await axios.post(
    //   `${'http://localhost:3000/'}api/change-phoneNumber`,
    //   {phoneNumber},
    //   {
    //     headers: {
    //       Authorization: 'Bearer ' + token,
    //     },
    //   },
    // );

    // const {status, error, PhoneNumbers} = response.data;
    // if (status == 'ok') {
    //   dispatch(setPhoneNumber(PhoneNumbers));
    //   Alert.alert('Thành công', 'Đổi Số điện thoại thành công', [
    //     {text: 'OK', onPress: () => navigation.navigate('UserInfo')},
    //   ]);
    // } else {
    //   Alert.alert('Thất bại', error, [{text: 'OK'}]);
    //   console.log(error);
    // }
  };
  const back = () => {
    if (props.id === 1) {
      updateFullName(textInput);
    } else if (props.id === 2) {
      console.log('Email');
    } else if (props.id === 3) {
      updatePhoneNumber(textInput);
    } else {
      console.log('lỗi ID');
    }
  };
  return (
    <SafeAreaView style={styles.styleSafe}>
      <StatusBar
        translucent
        backgroundColor="rgba(0,0,0,0)"
        barStyle="dark-content"
      />
      <Text>{props.title}</Text>
      <TextInput
        value={textInput}
        style={styles.textInput}
        onChangeText={setTextInput}
      />
      <Text style={styles.label}>{props.label}</Text>
      <Button
        title="Lưu thay đổi"
        onPress={() => {
          back();
        }}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: 'blue',
    marginTop: 10,
    borderRadius: 5,
    paddingHorizontal: 5,
    padding: 2,
  },
  label: {
    marginVertical: 5,
    fontSize: 12,
    marginBottom: 15,
  },
  styleSafe: {
    marginHorizontal: 20,
    marginVertical: 5,
  },
});
export default EditScreen;
