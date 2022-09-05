import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from 'app/hooks';
import {findAwayTeamApi} from 'features/find-away-team/findAwayTeamApi';
import filter from 'lodash/filter';
import React from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {setIsStatusRequest} from '../userSlice';
interface Props {
  route: {
    params: {
      id: any;
    };
  };
}
const FootballRequestDetail: React.FC<Props> = ({route}) => {
  const id = route.params?.id;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const data = useAppSelector(state => state.userState.teamListRequestData);
  const newData = filter(data, o => {
    return o._id === id;
  });
  const senRequestApprove = async () => {
    const bodyRequest = {
      status: 'locked',
      id: id,
    };
    findAwayTeamApi
      .updateTeamsRequest(bodyRequest)
      .then(() => {
        Alert.alert('Success Locked');
        dispatch(setIsStatusRequest(true));
        navigation.goBack();
      })
      .catch(error => {
        Alert.alert(error, 'err Locked');
        dispatch(setIsStatusRequest(true));
      });
  };
  const senRequestReject = async () => {
    const bodyRequest = {
      status: 'open',
      id: id,
    };
    findAwayTeamApi
      .updateTeamsRequest(bodyRequest)
      .then(() => {
        Alert.alert('ReJect Locked');
        dispatch(setIsStatusRequest(true));
        navigation.goBack();
      })
      .catch(error => {
        Alert.alert(error, 'err Locked');
        dispatch(setIsStatusRequest(true));
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.modalView}>
        <View style={styles.header}>
          <Text>{}</Text>
          <Text style={styles.title}>CÁP ĐỘI</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Ionicons name="close" size={32} />
          </TouchableOpacity>
        </View>
        <View style={styles.viewContent}>
          <Text style={styles.textTeam}>
            {' '}
            Tên đội bóng: {newData[0]?.teamName2}
          </Text>
          <Text style={styles.textTeam}>
            {' '}
            Số điện thoại: {newData[0]?.phoneNumber}
          </Text>
          <Text style={styles.textTeam}> Nội dụng: {newData[0]?.message2}</Text>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity onPress={senRequestReject}>
            <Text style={styles.btnReject}>Từ chối</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={senRequestApprove}>
            <Text style={styles.btnApprove}>Chấp nhận</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e5e5e5',
  },
  modalView: {
    flex: 0.45,
    backgroundColor: '#fff',
    width: '85%',
    borderRadius: 10,
    elevation: 10,
  },
  header: {
    marginHorizontal: 15,
    marginVertical: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  title: {
    fontSize: 26,
    marginLeft: 20,
  },
  viewContent: {
    //  backgroundColor:'red',
    marginHorizontal: 30,
    marginVertical: 10,
    flex: 0.8,
  },
  textTeam: {
    fontSize: 16,
    marginVertical: 5,
  },
  footer: {
    marginHorizontal: 30,
    // backgroundColor:'pink',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  btnReject: {
    backgroundColor: '#e5e5e5',
    padding: 10,
    width: 110,
    textAlign: 'center',
    borderRadius: 15,
    fontWeight: 'bold',
  },
  btnApprove: {
    backgroundColor: 'green',
    padding: 10,
    width: 110,
    textAlign: 'center',
    borderRadius: 15,
    color: 'white',
    fontWeight: 'bold',
  },
});
export default FootballRequestDetail;
