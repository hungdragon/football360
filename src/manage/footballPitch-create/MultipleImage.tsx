import React, {useState} from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import DesignIcon from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-crop-picker';
import {useDispatch} from 'react-redux';
import {setImgArray} from './footballSlice';
const MultipleImage: React.FC = () => {
  const [arrImage, setArrayImage] = useState([]);
  const dispatch = useDispatch();
  const uploadMultiple = () => {
    ImagePicker.openPicker({
      multiple: true,
      forceJpg: true,
    }).then(images => {
      console.log('cn1---', images);
      setArrayImage(images);
      dispatch(setImgArray(images));
    });
  };
  return (
    <View style={{backgroundColor: '#fff', marginVertical: 7}}>
      <TouchableOpacity
        onPress={uploadMultiple}
        style={{
          backgroundColor: 'blue',
          width: '53%',
          padding: 5,
          borderRadius: 5,
          flexDirection: 'row',
        }}>
        <Text style={{color: '#fff'}}>Thêm ảnh cho sân bóng</Text>
        <DesignIcon
          name="cloudupload"
          size={18}
          style={{color: '#fff', marginHorizontal: 5}}
        />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          marginVertical: 10,
          marginHorizontal: 5,
        }}>
        {arrImage.map((item, index) => (
          <View
            key={index}
            style={{
              backgroundColor: '#fff',
              borderRadius: 5,
              borderWidth: 0.5,
              borderColor: 'gray',
              marginHorizontal: 10,
            }}>
            {/* <DesignIcon name="plus" size={18} /> */}
            <Image
              source={{uri: item.path}}
              style={{width: 40, height: 40, borderRadius: 5}}
            />
          </View>
        ))}
      </View>
    </View>
  );
};
export default MultipleImage;
