import {image} from 'assets/icons';
import AppText from 'components/text/AppText';
import AppView from 'components/view/AppView';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
//import ImagePicker from 'react-native-image-crop-picker';
//import ImagePicker from 'react-native-image-picker';
const UploadFile: React.FC = () => {
  const [imageName, setImageName] = React.useState<string>();
  const options = {
    title: 'Select Image',
    type: 'library',
    options: {
      maxHeight: 200,
      maxWidth: 200,
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: true,
    },
  };
  const openGallery = async () => {
    const images = await launchImageLibrary(options);
    console.log('aaaaaa-----', images.assets[0]);
    setImageName(images.assets[0]?.fileName);
    const formdata = new FormData();
    formdata.append('file', {
      uri: images.assets[0].uri,
      type: images.assets[0].type,
      name: images.assets[0].fileName,
    });
    console.log('hung----', JSON.stringify(formdata));
  };

  return (
    <AppView style={styles.container}>
      <AppText boldOrLight="bold" style={styles.txtContract}>
        Hợp đồng đính kèm
      </AppText>
      <TouchableOpacity
        onPress={() => {
          openGallery()
            .then(() => {})
            .catch(() => {});
        }}>
        <AppView style={styles.btn}>
          <Image source={image.IC_UPLOADFILE} />
          <AppText style={[styles.txtContract, {color: '#002EDB'}]}>
            Chọn file tải lên
          </AppText>
        </AppView>
        {imageName && <AppText style={styles.image}>{imageName}</AppText>}
        <AppText style={styles.titleUpload}>
          <AppText style={styles.keyUpload}>{`${'* '}`}</AppText>File tải lên
          không quá 1Mb
        </AppText>
      </TouchableOpacity>
    </AppView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  txtContract: {
    fontSize: 14,
    paddingHorizontal: 5,
  },
  btn: {
    flexDirection: 'row',
    backgroundColor: '#E6E6FA',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRadius: 3,
  },
  titleUpload: {
    fontSize: 12,
    color: 'gray',
  },
  keyUpload: {
    color: 'red',
  },
  image: {
    fontSize: 12,
  },
});
export default UploadFile;
// const choosePhotoLibrary = () => {
//   ImagePicker.openPicker({
//     width: 300,
//     height: 400,
//     cropping: true,
//   }).then(image => {
//     console.log('000---', image);
//     setImageName(image.filename);
//   });
//   const options = {
//     noData: true,
//   };
//   launchImageLibrary(options, response => {
//     console.log('ccc----', response);
//     setImageName(response.assets[0].fileName);
//   });
// };
// const createFormData = (photo, body) => {
//   const data = new FormData();

//   data.append('photo', {
//     name: photo.fileName,
//     type: photo.type,
//     uri: Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
//   });

//   Object.keys(body).forEach(key => {
//     data.append(key, body[key]);
//   });

//   return data;
// };
// handleUploadPhoto = () => {
//   fetch('http://localhost:3000/api/upload', {
//     method: 'POST',
//     body: createFormData(this.state.photo, { userId: '123' }),
//   })
//     .then((response) => response.json())
//     .then((response) => {
//       console.log('upload succes', response);
//       alert('Upload success!');
//       this.setState({ photo: null });
//     })
//     .catch((error) => {
//       console.log('upload error', error);
//       alert('Upload failed!');
//     });
// };
