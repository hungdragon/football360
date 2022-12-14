import React, {useState} from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';
import _ from 'lodash';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from 'app/hooks';
import {findAwayTeamApi} from './findAwayTeamApi';
import AppView from 'components/view/AppView';
import AppText from 'components/text/AppText';
import AppHeader from 'components/AppHeader/AppHeader';
import RowInfoMiddle from 'components/RowInfomation/RowInfoMiddle';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {setSignal, setStatus} from './findAwayTeamSlice';
interface Detail {
  namePitch: string;
  location: string;
  timeSlot: string;
  dateTime: string;
  price: string;
  team: string;
  contact: string;
  phoneNumber: string;
  message: string;
  team2: string;
  message2: string;
  isStatus: string;
  _id: string;
}
interface Props {
  route: {
    params: {
      id: string;
    };
  };
}
const TeamDetail: React.FC<Props> = ({route}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const id = route.params.id;
  const teamListData = useAppSelector(
    state => state.findAwayTeamState.teamList,
  );
  const dataFilter = _.filter(teamListData, (o: Detail) => {
    return o._id === id;
  });
  const itemData: Detail = dataFilter[0];
  const [teamName2, setTeamName2] = useState('');
  const [message2, setMessage2] = useState('');
  const senRequest = async () => {
    const status = 'pending';
    const bodyRequest = {
      id: id,
      teamName2: teamName2,
      message2: message2,
      status: status,
    };
    console.log('====================================');
    console.log('teamName2', message2);
    console.log('====================================');
    if (!teamName2 || !message2) {
      Alert.alert('mISSING DATA');
    } else {
      findAwayTeamApi
        .updateTeams(bodyRequest)
        .then(() => {
          Alert.alert('successfull DATA');
          dispatch(setStatus('pending'));
          dispatch(setSignal(false));
          navigation.goBack();
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="Chi ti???t ?????i b??ng" />
      <AppView style={styles.titleView}>
        <AppText style={styles.titleBig}>{'Th??ng tin ?????i nh??'}</AppText>
      </AppView>
      <KeyboardAwareScrollView style={styles.detailBlock}>
        <RowInfoMiddle label="T??n S??n" content={itemData.pitchName} />
        <RowInfoMiddle label="Khung Gi???" content={itemData.timeSlot} />
        <RowInfoMiddle label="Ng??y" content={itemData.dateTime} />
        <RowInfoMiddle
          label="Ti???n S??n"
          content={itemData.pitchPrice}
          color="purple"
        />
        <RowInfoMiddle label="?????a ch???" content={itemData.location} />
        <RowInfoMiddle label="?????i nh??" content={itemData.team} />
        <RowInfoMiddle label="Ngu???i li??n h???" content={itemData.contact} />
        <RowInfoMiddle label="S??? ??i???n tho???i" content={itemData.phoneNumber} />
        <RowInfoMiddle label="L???i nh???n" content={itemData.message} />
        <AppView style={styles.formInput}>
          <TextInput
            style={styles.teamNameInput}
            placeholder="T??n ?????i b??ng"
            onChangeText={val => {
              setTeamName2(val);
            }}
          />
          <TextInput
            style={styles.messageRequestInput}
            multiline={true}
            placeholder="T??n ?????i b??ng"
            onChangeText={val => {
              setMessage2(val);
            }}
          />
        </AppView>
        <AppView style={styles.btnView}>
          <TouchableOpacity style={styles.btnSubmit} onPress={() => senRequest()}>
            <AppText>Submit</AppText>
          </TouchableOpacity>
        </AppView>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleView: {
    borderTopWidth: 1,
    flexDirection: 'row',
    backgroundColor: 'blue',
    marginHorizontal: 18,
    marginTop: 20,
    borderTopColor: '#dcdcdc',
  },
  titleBig: {
    position: 'absolute',
    top: -10,
    backgroundColor: '#fff',
    paddingEnd: 10,
    fontWeight: 'bold',
  },
  detailBlock: {
    flex: 1,
    // backgroundColor: 'pink',
    margin: 20,
  },
  formInput: {
    marginTop: 30,
    marginHorizontal: 20,
  },
  teamNameInput: {
    width: '100%',
    padding: 10,
    backgroundColor: '#dcdcdc',
    borderRadius: 5,
  },
  messageRequestInput: {
    height: 100,
    backgroundColor: '#dcdcdc',
    marginVertical: 20,
    padding: 10,
    borderRadius: 5,
  },
  btnView: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  btnSubmit: {
    backgroundColor: 'green',
    padding: 10,
    width: '40%',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 5,
  },
});
export default TeamDetail;
