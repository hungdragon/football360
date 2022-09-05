import React, {useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import {setSearchName} from '../findPitchSlice';
interface Props {
  navigation: any;
}
const SearchNamePitch: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const HA = 'Huyền Anh';
  const VH = 'Văn Hưng';
  const TL = 'Thủy Lợi';
  const GS = 'Giang Sơn';
  const MD2 = 'Mỹ Đình 2';
  const handleKeyPress = async (name: string) => {
    dispatch(setSearchName(name));
    navigation.goBack();
    setText('');
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="rgba(0,0,0,0)"
        barStyle="dark-content"
      />
      <View style={styles.top_search}>
        <View style={styles.leftIconHeader}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Icon name="arrowleft" size={22} style={{marginTop: 7}} />
          </TouchableOpacity>
        </View>
        <View style={styles.search_element}>
          <TextInput
            value={text}
            onSubmitEditing={() => {
              handleKeyPress(text);
            }}
            onChangeText={newText => setText(newText)}
            autoFocus={true}
            style={{width: '100%', paddingLeft: 5}}
            placeholder="Huyền Anh"
          />
        </View>
        <View style={styles.rightIconHeader}>
          {/* <TouchableOpacity >
        <MaterialIcon name ='crosshairs-gps' size={25} style={{marginBottom:6}}/>
        </TouchableOpacity> */}
        </View>
      </View>
      <View style={{}}>
        <View
          style={{
            marginHorizontal: 27,
            flexDirection: 'row',
            flexWrap: 'wrap',
            padding: 10,
            justifyContent: 'flex-start',
          }}>
          <TouchableOpacity
            onPress={() => {
              setText(HA);
            }}
            style={{
              backgroundColor: '#e5e5e5',
              borderWidth: 0.4,
              borderColor: 'gray',
              borderRadius: 20,
              marginHorizontal: 5,
              marginVertical: 5,
            }}>
            <Text style={{padding: 5}}>{HA}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setText(VH);
            }}
            style={{
              backgroundColor: '#e5e5e5',
              borderWidth: 0.4,
              borderColor: 'gray',
              borderRadius: 20,
              marginHorizontal: 5,
              marginVertical: 5,
            }}>
            <Text style={{padding: 5}}>{VH}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setText(GS);
            }}
            style={{
              backgroundColor: '#e5e5e5',
              borderWidth: 0.4,
              borderColor: 'gray',
              borderRadius: 20,
              marginHorizontal: 5,
              marginVertical: 5,
            }}>
            <Text style={{padding: 5}}>{GS}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setText(TL);
            }}
            style={{
              backgroundColor: '#e5e5e5',
              borderWidth: 0.4,
              borderColor: 'gray',
              borderRadius: 20,
              marginHorizontal: 5,
              marginVertical: 5,
            }}>
            <Text style={{padding: 5}}>{TL}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setText(MD2);
            }}
            style={{
              backgroundColor: '#e5e5e5',
              borderWidth: 0.4,
              borderColor: 'gray',
              borderRadius: 20,
              marginHorizontal: 5,
              marginVertical: 5,
            }}>
            <Text style={{padding: 5}}>{MD2}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top_search: {
    height: '10%',
    // backgroundColor:'blue',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    // backgroundColor: "red",
    width: '100%',
    paddingTop: 10,
  },
  leftIconHeader: {
    // backgroundColor: "blue",
    width: '10%',

    justifyContent: 'center',
    alignItems: 'center',
  },
  search_element: {
    flexDirection: 'row',
    backgroundColor: '#e5e5e5',
    //width: height / 3,
    padding: 5,
    borderRadius: 30,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '70%',
  },
  rightIconHeader: {
    width: '10%',
    // backgroundColor:'green',
    justifyContent: 'center',
    alignItems: 'center',
    //padding: 5,
  },
});
export default SearchNamePitch;
