import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from 'app/hooks';
import EmptyView from 'components/EmptyView';
import React, {useState} from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {findAwayTeamApi} from './findAwayTeamApi';
import {setSignal, setStatus, setTeamListData} from './findAwayTeamSlice';

const TeamList: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [teamlists, setTeamList] = useState<Array<any>>([]);
  const isSignal = useAppSelector(state => state.findAwayTeamState.signal);
  const status = useAppSelector(state => state.findAwayTeamState.status);

  React.useEffect(() => {
    if (!isSignal) {
      callApi();
      dispatch(setStatus('open'));
    }
  
    
    // dispatch(setStatus('open'));
    dispatch(setStatus('open'));
  }, [isSignal]);
  const callApi = async () => {
    await findAwayTeamApi
      .getTeamList()
      .then(response => {
        setTeamList(response.dataFilter);
        dispatch(setTeamListData(response.dataFilter));
        dispatch(setSignal(true));
      })
      .catch(err => {
        console.log(err);
        dispatch(setSignal(true));
      });
  };
  const EmptyComponent = () => <EmptyView />;

  const RenderItems = ({item}) => (
    <View style={styles.subItemView}>
      <View style={styles.cable_wrapper}>
        <View style={styles.left}>
          <Text style={styles.txtTeam1}>{item?.team}</Text>
        </View>
        <View style={styles.mid}>
          <View style={styles.mid_wrap}>
            <Text style={styles.txtDateTime}>{item?.dateTime}</Text>
            <Text style={styles.txtVS}>{'VS'}</Text>
            <Text>{item.timeSlot}</Text>
          </View>
        </View>
        <View style={styles.right}>
          {item.isStatus === 'pending' ? (
            <Text>{'Chờ phản hồi'}</Text>
          ) : item.isStatus === 'locked' ? (
            <Text style={styles.txtTeam2}>{item?.teamName2}</Text>
          ) : (
            <View style={styles.right_wrap}>
              <Text style={styles.txtIconQuestion}>{'???'}</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(
                    'TeamDetail' as never,
                    {id: item._id} as never,
                  );
                }}>
                <Text style={styles.txtCable}>{'Bắt kèo ngay'}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      <View style={styles.txtLocation}>
        <Text>{item.location}</Text>
      </View>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapp}>
        <FlatList
          data={teamlists}
          contentContainerStyle={styles.flatlistStyle}
          // showsVerticalScrollIndicator={false}
          renderItem={RenderItems}
          keyExtractor={item => item._id}
          ListEmptyComponent={EmptyComponent}
          // refreshControl={
          //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          // }
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#e5e5e5',
  },
  wrapp: {
    // width: '100%',
    paddingHorizontal: 10,
    elevation: 10,
    flex: 1,
  },
  cable_wrapper: {
    // marginHorizontal:10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    width: '100%',
    padding: 10,
    //elevation: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  left: {
    width: '38%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mid: {
    width: '24%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mid_wrap: {},
  right: {
    width: '38%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  right_wrap: {},
  subItemView: {
    marginVertical: 10,
  },
  txtTeam1: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  txtDateTime: {
    textAlign: 'center',
    color: 'black',
  },
  txtVS: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'red',
    fontSize: 22,
  },
  txtTeam2: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  txtIconQuestion: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: 'orange',
  },
  txtCable: {
    color: 'blue',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  txtLocation: {
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    paddingBottom: 5,
    //  elevation:10
  },
  flatlistStyle: {
    flex: 1,
    alignItems: 'center',
  },
});
export default TeamList;
