import IconFontAntDesign from 'react-native-vector-icons/AntDesign';
import IconFontEntypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useAppUser} from 'context/AppUserContext';
import React, {useEffect} from 'react';
import {
  View,
  StatusBar,
  ScrollView,
  RefreshControl,
  ImageBackground,
  Image,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import {image} from 'assets/icons';
import {AppError, getValue, translate} from 'utils';
import {useDialog} from 'components/dialog/AppDialogContext';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from 'app/hooks';
import {FootballApi} from 'features/book-football-pitch/FootballApi';
import {findPitchApi} from 'features/find-pitch/findPitchApi';
import {setPitchData} from 'features/find-pitch/findPitchSlice';
import {batch} from 'react-redux';
import {setFootballOrderData, setHistoryOrderData} from './userSlice';
const UserInfo: React.FC = () => {
  const navigation = useNavigation();
  const {getBasiclUserLoginInfo, onLogout} = useAppUser();
  const user = getBasiclUserLoginInfo();
  const footballOrderData = useAppSelector(
    state => state.userState.footballOrderData,
  );
  const countOrder = footballOrderData.length;
  const countRequest = useAppSelector(state => state.userState.countRequest);
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const bookedFootball = useAppSelector(
    state => state.FootballState.isSignFootball,
  );
  const dispatch = useAppDispatch();
  const {showDialog} = useDialog();
  const {getHrisCode} = useAppUser();
  const userName = getHrisCode();
  useEffect(() => {
    callApi();
  }, [bookedFootball]);
  const callApi = async () => {
    setLoading(true);
    try {
      setTimeout(async () => {
        const getFootballOrder = await FootballApi.football_order(userName);
        const getFindPitchData = await findPitchApi.getPitchList();
        batch(() => {
          dispatch(setPitchData(getFindPitchData?.pitchs));
          dispatch(
            setFootballOrderData(getValue(getFootballOrder, 'data', [])),
          );
          dispatch(setHistoryOrderData(getValue(getFootballOrder, 'data', [])));
          setLoading(false);
        });
      }, 5000);
    } catch (err) {
      //setError(err);
      setLoading(false);
    }
  };
  const refershApi = async () => {
    setRefreshing(true);
  };
  const handleLogout = () => {
    if (!loading) {
      setLoading(true);
      onLogout()
        .then(() => {
          setLoading(false);
        })
        .catch(error => {
          setLoading(false);
          const message = (error as AppError).message as string;
          showDialog({
            dialogType: 'error',
            title: translate('notification'),
            message: message,
            description: 'description',
            buttonCancel: {
              label: translate('close'),
              color: 'blue',
            },
          });
        });
    }
  };

  const logOutPress = () => {
    console.log('logout--------------');
    showDialog({
      dialogType: 'info',
      title: translate('logout'),
      message: translate('warning_logout'),
      description: 'description',
      buttonAccept: {
        onPress: handleLogout,
        label: translate('accept'),
        // color: theme.colors.primaryBlue,
        color: 'blue',
      },
      buttonCancel: {label: translate('cancel'), color: 'blue'},
    });
  };
  console.log('uuu---', user);
  return (
    <View style={styles.container}>
      {/* <StatusBar
        translucent
        backgroundColor="rgba(0,0,0,0)"
        barStyle="light-content"
      /> */}
      <ScrollView
        contentContainerStyle={{flex: 1}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refershApi} />
        }>
        <ImageBackground source={image.BG_Profile} style={styles.block_top}>
          <View style={styles.block_top_view}>
            <View style={styles.wrapHeader}>
              <View style={styles.View_avartar}>
                <Image
                  source={image.IC_Football_Logo}
                  style={styles.Image_Profile}
                />
              </View>

              <View style={styles.View2_Title}>
                <Text style={styles.txtHello}>Hello</Text>
                <Text style={styles.txtFullName}>{user?.fullName}</Text>
              </View>

              <View style={styles.View_block_edit}>
                <TouchableOpacity
                  style={styles.iconEditProfile}
                  onPress={() => {
                    navigation.navigate('UserUpdate', {
                      name: user?.fullName,
                      email: 'email',
                    });
                  }}>
                  <Text style={styles.View_Edit}>
                    <IconFontEntypo name="pencil" size={20} color="#fff" />
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.iconMini}>
            <Image source={image?.mini} style={{width: 100, height: 60}} />
          </View>
        </ImageBackground>

        <View style={styles.View_Body_block}>
          <View style={styles.Item}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('FootballOrder' as never);
              }}>
              <View style={styles.Item_title}>
                <IconFontAntDesign name="calendar" style={styles.icon_text} />
                <Text style={styles.txt_name}>Lịch đặt sân</Text>
                <Text style={styles.bagetBooked}>
                  {/* {numberbooked} */}
                  {countOrder}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.Item}>
            <TouchableOpacity>
              <View style={styles.Item_title}>
                <IconFontAntDesign name="message1" style={styles.icon_text} />
                <Text style={styles.txt_name}>Tin nhắn</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.Item}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('FootballRequest' as never);
              }}>
              <View style={styles.Item_title}>
                <IconFontAntDesign
                  name="notification"
                  style={styles.icon_text}
                />
                <Text style={styles.txt_name}>Yêu cầu cáp đội </Text>
                <Text style={styles.bagetCable}>
                  {/* {countCable} */}
                  {countRequest}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.Item}>
            <TouchableOpacity
              onPress={() => {
                // navigation.navigate('ChangePassword');
              }}>
              <View style={styles.Item_title}>
                <Ionicons name="keypad-outline" style={styles.icon_text} />
                <Text style={styles.txt_name}>Đổi mật khẩu</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.Item}>
            <TouchableOpacity
              onPress={() => {
                //  navigation.navigate('ModalPayment');
                Alert.alert('Liên hệ hỗ trợ 19005555');
              }}>
              <View style={styles.Item_title}>
                <MaterialIcons name="support-agent" style={styles.icon_text} />
                <Text style={styles.txt_name}>Hỗ trợ</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.Item}>
            <TouchableOpacity onPress={logOutPress}>
              <View style={styles.Item_title}>
                <IconFontAntDesign
                  name="logout"
                  style={styles.icon_text}
                  color="red"
                />
                <Text style={styles.styleLogout}>Đăng xuất</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height:"100%",
    // backgroundColor:'blue'
  },
  block_top: {
    flex: 2,
    backgroundColor: '#FFCCCC',
    justifyContent: 'flex-end',
    elevation: 50,
  },
  block_top_view: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    // backgroundColor:'blue'
    marginHorizontal: 10,
  },
  View_avartar: {
    width: '25%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  View2_Title: {
    flexDirection: 'column',

    justifyContent: 'center',
    // backgroundColor:'green',
    marginLeft: 5,
    width: '50%',
  },
  Image_Profile: {
    width: 80,
    height: 80,
    //alignItems: 'flex-end',
    //alignSelf:'stretch',
    borderRadius: 80,
    borderWidth: 3,
    borderColor: 'white',
  },
  View_block_edit: {
    //  backgroundColor:'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: '25%',
  },
  View_Edit: {
    width: 40,
    //height:40,
    //borderRadius: 30,
    padding: 10,
    textAlign: 'center',
  },
  View_Body_block: {
    flex: 6,
    backgroundColor: '#ededef',
    // flexDirection:'column',
  },
  Item: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    paddingVertical: 15,
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    elevation: 20,

    //borderColor:'#C4C4C4',
    // borderBottomWidth:1
  },
  Item_title: {
    flexDirection: 'row',
  },
  icon_text: {
    fontSize: 20,
    marginRight: 10,
  },
  txt_name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  txtHello: {
    color: 'gray',
    justifyContent: 'flex-start',
    // textShadowColor: 'black',
    // textShadowRadius: 10,
  },
  wrapHeader: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  txtFullName: {
    fontWeight: 'bold',
    fontSize: 22,
    color: 'lightgray',
    // textShadowColor: 'black',
    // textShadowRadius: 20,
  },
  iconEditProfile: {
    borderRadius: 50,
    backgroundColor: '#0066FF',
  },
  iconMini: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '95%',
  },
  bagetBooked: {
    color: 'purple',
    fontSize: 12,
    marginBottom: 5,
    fontWeight: 'bold',
    marginHorizontal: 3,
  },
  bagetCable: {
    color: 'red',
    fontSize: 10,
    fontWeight: 'bold',
  },
  styleLogout: {
    borderRadius: 50,
    color: 'red',
  },
});
export default UserInfo;
