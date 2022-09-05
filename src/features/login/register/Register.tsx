import React, {useState} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {TextInput} from 'react-native-paper';
import AppText from 'components/text/AppText';
import AppView from 'components/view/AppView';
import LinearGradient from 'react-native-linear-gradient';
import {translate} from 'utils';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import {setIsChangeForm} from '../loginSlice';
const Register: React.FC = () => {
  const [username, setUsename] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch();
  return (
    <Animatable.View animation="fadeInUp" style={{flex: 0.65, elevation: 10}}>
      <AppView
        style={{
          flex: 0.85,
          backgroundColor: '#fff',
          marginHorizontal: 25,
          borderRadius: 20,
          marginVertical: 10,
        }}>
        <AppView
          style={{
            margin: 15,
            backgroundColor: '#fff',
            flex: 1,
            marginTop: '10%',
          }}>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              style={{height: 40, width: '100%'}}
              dense
              label={translate('email')}
              mode="outlined"
              outlineColor="#DCDCDC"
              onChangeText={text => setUsename(text)}
            />
            <EntypoIcon
              name="email"
              size={22}
              style={{position: 'absolute', right: '5%', top: '33%'}}
            />
          </View>
          <View style={{flexDirection: 'row', marginTop: 20}}>
            <TextInput
              style={{height: 40, width: '100%'}}
              dense
              label={translate('username')}
              mode="outlined"
              outlineColor="#DCDCDC"
              onChangeText={text => setUsename(text)}
            />
            <EntypoIcon
              name="user"
              size={22}
              style={{position: 'absolute', right: '5%', top: '33%'}}
            />
          </View>
          <View style={{flexDirection: 'row', marginTop: 20}}>
            <TextInput
              style={{height: 40, width: '100%'}}
              dense
              label={translate('password')}
              mode="outlined"
              outlineColor="#DCDCDC"
              onChangeText={text => setPassword(text)}
            />
            <EntypoIcon
              name="key"
              size={20}
              style={{position: 'absolute', right: '5%', top: '33%'}}
            />
          </View>
          <View style={{flexDirection: 'row', marginTop: 20}}>
            <TextInput
              style={{height: 40, width: '100%'}}
              dense
              label={translate('password')}
              mode="outlined"
              outlineColor="#DCDCDC"
              onChangeText={text => setPassword(text)}
            />
            <EntypoIcon
              name="key"
              size={20}
              style={{position: 'absolute', right: '5%', top: '33%'}}
            />
          </View>
          <View
            style={{
              marginVertical: 20,
              justifyContent: 'flex-end',
              //flex: 0.7,
            }}>
            <LinearGradient
              colors={['#4db806', '#59cc0c', '#79BD71']}
              style={{borderRadius: 5}}>
              <TouchableOpacity>
                <AppText
                  style={{
                    padding: 10,
                    color: '#FFF',
                    textAlign: 'center',
                  }}>
                  {translate('register')}
                </AppText>
              </TouchableOpacity>
            </LinearGradient>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                width: '100%',
                padding: 5,
                marginVertical: 10,
              }}>
             
              <Text
                onPress={() => {
                  dispatch(setIsChangeForm(false));
                }}>
                Đăng nhập ngay
              </Text>
            </View>
          </View>
        </AppView>
      </AppView>
    </Animatable.View>
  );
};
export default Register;
