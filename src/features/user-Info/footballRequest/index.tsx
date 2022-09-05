import axios from 'axios';
import React, {useEffect, useMemo, useState} from 'react';
import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import _ from 'lodash';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {useAppSelector} from 'app/hooks';
import AppHeader from 'components/AppHeader/AppHeader';
import EmptyView from 'components/EmptyView';
import {findAwayTeamApi} from 'features/find-away-team/findAwayTeamApi';
import {useAppUser} from 'context/AppUserContext';
import {
  setCountRequest,
  setIsStatusRequest,
  setTeamListRequestData,
} from '../userSlice';


const FootballRequest: React.FC = () => {
  const navigation = useNavigation();
  const teamListRequestData = useAppSelector(
    state => state.userState.teamListRequestData,
  );
  const isStatusRequest = useAppSelector(
    state => state.userState.isStatusRequest,
  );
  const dispatch = useDispatch();
  const {getHrisCode} = useAppUser();
  const userName = getHrisCode();

  useEffect(() => {
    if (isStatusRequest) {
      callApi();
    }
  });
  const callApi = async () => {
    await findAwayTeamApi
      .getTeamList()
      .then(teamList => {
        const teamListRequestDataNew = _.filter(teamList, o => {
          return o.userName === userName && o.isStatus === 'pending';
        });
        dispatch(setCountRequest(teamListRequestDataNew.length));
        dispatch(setTeamListRequestData(teamListRequestDataNew));
        dispatch(setIsStatusRequest(false));
      })
      .catch(err => {
        Alert.alert('err footballRequest', err);
      });
  };
  const RenderEmptyItems = () => <EmptyView />;
  const RenderItems = ({item}: any) => (
    <View style={styles.itemRight}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(
            'FootballRequestDetail' as never,
            {id: item._id} as never,
          );
        }}>
        <View style={styles.item}>
          <View style={styles.itemLeft}>
            <Text style={styles.nameTeam}>{item?.teamName2}</Text>
            <Text style={styles.message}>{item?.message2 + '...'}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title={'Yêu cầu cáp đội'} />
      <View style={styles.listRequest}>
        <FlatList
          data={teamListRequestData}
          renderItem={RenderItems}
          ListEmptyComponent={RenderEmptyItems}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5e5e5',
    paddingVertical: 15,
  },
  listRequest: {
    marginHorizontal: 15,
    borderRadius: 5,
    // backgroundColor:'white'
  },
  item: {
    height: 80,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    borderRadius: 5,
    elevation: 3,
    flexDirection: 'row',
    marginVertical: 5,
  },
  itemLeft: {
    justifyContent: 'center',
    width: '85%',
  },
  itemRight: {
    justifyContent: 'center',
  },
  nameTeam: {
    fontSize: 22,
  },
  message: {},
});
export default FootballRequest;
