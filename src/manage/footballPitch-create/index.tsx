import AppHeader from 'components/AppHeader/AppHeader';
import AppText from 'components/text/AppText';
import AppView from 'components/view/AppView';
import {Formik} from 'formik';
import React, {useCallback, useEffect, useState} from 'react';
import * as yup from 'yup';
import {
  Alert,
  Button,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import UploadFile from './UploadFile';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import {pitchAPI} from './api';
import {image} from 'assets/icons';
import {v4 as uuidv4} from 'uuid';
import 'react-native-get-random-values';
import AppViewWithErrorAndLoading from 'components/view/AppViewWithErrorAndLoading';
import FootballLoading from './FootballLoading';
import {useNavigation} from '@react-navigation/native';
import DesignIcon from 'react-native-vector-icons/AntDesign';
import MultipleImage from './MultipleImage';
import {useAppSelector} from 'app/hooks';
const footballPitchSchema = yup.object({
  pitchName: yup.string().required('Tên sân bóng không được để trống').max(80),
  location: yup
    .string()
    .required('Địa chỉ sân bóng không được để trống')
    .max(80),
  longitude: yup.string().required('longitude is Required').max(20),
  latitude: yup.string().required('latitude is Required').max(20),
  image: yup
    .mixed()
    .nullable()
    .required('Required Filed')
    .test('size', 'File is too large', value => {
      return value && value.fileSize <= 1 * 1024 * 1024;
    }),
  content: yup.string().required('Chi tiết sân không được để trống').max(100),
  openTime: yup.string().required('Giờ mở cửa không được để trống').max(3),
  closeTime: yup.string().required('Giờ đóng của không được để trống').max(3),
  minPrice: yup.string().required('Giá tối tiểu không được trống').max(9),
  maxPrice: yup.string().required('Giá tối đa không được trống').max(9),
  // imgArray: yup
  //   .mixed()
  //   .nullable()
  //   .required('Required Image')
  //   .test('size', 'File is too large', value => {
  //     return value && value.size <= 3 * 1024 * 1024;
  //   }),
});

const FootballPitchCreate: React.FC = () => {
  const navigation = useNavigation();
  const arrImage = useAppSelector(state => state.managerState.imgArray);
  const bodyRequestValue = {
    pitchName: '',
    code: uuidv4(),
    openTime: '',
    closeTime: '',
    location: '',
    priceRange: '',
    image: null,
    title: '',
    content: '',
    longitude: '',
    latitude: '',
    minPrice: '',
    maxPrice: '',
    //imgArray: arrImage,
  };
  const formdata = new FormData();
  const [imageName, setImageName] = React.useState<string>('');
  const [loading, setLoading] = useState(false);
  console.log('render qua troi');
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

  const handleSave = async (values: any) => {
    setLoading(true);
    formdata.append('imgArray', {
      uri: values.image.uri,
      type: values.image.type,
      name: values.image.fileName,
      //data: values.image.data,
    });
    arrImage.forEach((item, i) => {
      formdata.append('imgArray', {
        uri: item.path,
        type: 'image/png',
        name: item.filename || `filename${i}.jpg`,
      });
    });
    console.log('xinh qua-----', JSON.stringify(formdata));
    pitchAPI
      .create_pitch(values, formdata)
      .then(() => {
        // eslint-disable-next-line no-sparse-arrays
        Alert.alert('Notification', 'Success', [
          {text: 'OK', onPress: () => navigation.goBack()},
          ,
        ]);
        setLoading(false);
      })
      .catch(() => {
        console.log('errrrr');
        setLoading(false);
      });
  };
  return (
    <SafeAreaView
      pointerEvents={loading ? 'none' : 'auto'}
      style={[styles.container]}>
      {loading ? <FootballLoading /> : null}
      <AppHeader title="create" />
      <Formik
        //enableReinitialize
        initialValues={bodyRequestValue}
        validationSchema={footballPitchSchema}
        onSubmit={(values, actions) => {
          handleSave(values)
            .then(() => {
              // actions.setSubmitting(false);
              actions.resetForm();
            })
            .catch(err => {
              Alert.alert('error when call api create pitch', err);
            });
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <ScrollView style={{opacity: loading ? 0.5 : 1, flex: 1}}>
            <AppView style={[styles.form]}>
              <AppView style={styles.formInput}>
                <TextInput
                  outlineColor={'gray'}
                  style={styles.textInputStyle}
                  placeholder={'SDS'}
                  mode="outlined"
                  maxLength={100}
                  dense
                  label="Tên sân bóng"
                  value={values.pitchName}
                  onBlur={handleBlur('pitchName')}
                  onChangeText={handleChange('pitchName')}
                />
              </AppView>
              <AppText style={styles.errorText}>{errors.pitchName}</AppText>
              <Text style={styles.txtPitchActiveTime}>
                {'Khung giờ hoạt động( h )'}
              </Text>
              <AppView style={styles.txtSlotTimeView}>
                <TextInput
                  mode="outlined"
                  style={{height: 40, width: 60}}
                  keyboardType="numeric"
                  maxLength={2}
                  value={values.openTime}
                  onChangeText={handleChange('openTime')}
                />
                <Text>{`${'   đến   '}`}</Text>
                <TextInput
                  mode="outlined"
                  style={{height: 40, width: 60}}
                  keyboardType="numeric"
                  maxLength={2}
                  value={values.closeTime}
                  onChangeText={handleChange('closeTime')}
                />
                <AppView style={{flexDirection: 'column'}}>
                  {errors.openTime && touched.openTime && (
                    <AppText style={styles.errorText}>
                      {errors.openTime}
                    </AppText>
                  )}
                  {errors.closeTime && touched.closeTime && (
                    <AppText style={styles.errorText}>
                      {errors.closeTime}
                    </AppText>
                  )}
                </AppView>
              </AppView>
              <AppView style={styles.formInput}>
                <TextInput
                  outlineColor={'gray'}
                  style={styles.textInputStyle}
                  placeholder={'SDS'}
                  mode="outlined"
                  maxLength={100}
                  dense
                  label="Thông tin chi tiết sân bóng"
                  value={values.content}
                  onBlur={handleBlur('content')}
                  onChangeText={handleChange('content')}
                />
              </AppView>
              {errors.content && touched.content && (
                <AppText style={styles.errorText}>{errors.content}</AppText>
              )}
              <MultipleImage />
              <Text style={styles.txtDistancePrice}>
                {'Khoảng giá giao động( VNĐ )'}
              </Text>
              <AppView style={styles.txtSlotTimeView}>
                <TextInput
                  mode="outlined"
                  style={{height: 40, width: '40%'}}
                  keyboardType="numeric"
                  maxLength={8}
                  value={values.minPrice}
                  onBlur={handleBlur('minPrice')}
                  onChangeText={handleChange('minPrice')}
                />
                <Text>{`${'   đến   '}`}</Text>
                <TextInput
                  mode="outlined"
                  style={{height: 40, width: '40%'}}
                  value={values.maxPrice}
                  onBlur={handleBlur('maxPrice')}
                  onChangeText={handleChange('maxPrice')}
                />
              </AppView>
              {errors.minPrice && touched.minPrice && (
                <AppText style={styles.errorText}>{errors.minPrice}</AppText>
              )}
              {errors.maxPrice && touched.maxPrice && (
                <AppText style={styles.errorText}>{errors.maxPrice}</AppText>
              )}
              <AppView style={styles.formInput}>
                <TextInput
                  outlineColor={'gray'}
                  style={styles.textInputStyle}
                  //numberOfLines={1}
                  placeholder={'SDS'}
                  mode="outlined"
                  maxLength={100}
                  dense
                  label="Địa chỉ sân bóng"
                  value={values.location}
                  onBlur={handleBlur('location')}
                  onChangeText={handleChange('location')}
                />
              </AppView>
              {errors.location && touched.location && (
                <AppText style={styles.errorText}>{errors.location}</AppText>
              )}
              <AppView style={styles.longlatView}>
                <TextInput
                  outlineColor={'gray'}
                  style={{width: '47%'}}
                  placeholder={'SDS'}
                  mode="outlined"
                  maxLength={100}
                  dense
                  label="Long"
                  value={values.longitude}
                  onBlur={handleBlur('longitude')}
                  onChangeText={handleChange('longitude')}
                />
                <TextInput
                  outlineColor={'gray'}
                  style={{width: '47%'}}
                  placeholder={'SDS'}
                  mode="outlined"
                  maxLength={100}
                  dense
                  label="Lat"
                  value={values.latitude}
                  onBlur={handleBlur('latitude')}
                  onChangeText={handleChange('latitude')}
                />
              </AppView>
              {errors.location && touched.location && (
                <AppText style={styles.errorText}>{errors.location}</AppText>
              )}
              <AppText boldOrLight="bold" style={styles.txtContract}>
                Ảnh sân bóng đính kèm
              </AppText>
              <TouchableOpacity
                onPress={async () => {
                  const images = await launchImageLibrary(options);
                  setImageName(images.assets[0]?.fileName);
                  setFieldValue('image', images.assets[0]);
                }}>
                <AppView style={styles.btn}>
                  <Image source={image.IC_UPLOADFILE} />
                  <AppText style={[styles.txtContract, {color: '#002EDB'}]}>
                    Chọn file tải lên
                  </AppText>
                </AppView>
                {imageName && (
                  <AppText style={styles.image}>{imageName}</AppText>
                )}
                <AppText style={styles.titleUpload}>
                  <AppText style={styles.keyUpload}>{`${'* '}`}</AppText>
                  File tải lên không quá 1Mb
                </AppText>
              </TouchableOpacity>
              <AppText style={styles.errorText}>{errors.image}</AppText>
            </AppView>
            <AppView style={styles.btnView}>
              <AppView style={styles.btnCancel}>
                <TouchableOpacity>
                  <AppText>{'HỦY'}</AppText>
                </TouchableOpacity>
              </AppView>
              <TouchableOpacity style={styles.btnSave} onPress={handleSubmit}>
                <AppText style={{color: '#fff'}}>{'Lưu'}</AppText>
              </TouchableOpacity>
            </AppView>
          </ScrollView>
        )}
      </Formik>
    </SafeAreaView>
  );
};
export default FootballPitchCreate;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    flex: 1,
    marginHorizontal: 15,
  },
  textInputStyle: {
    width: '100%',
    overflow: 'hidden',
  },
  formInput: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10, // edit here
  },
  txtSlotTimeView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 5, // edit here
  },
  //3.footer:
  btnView: {
    //  backgroundColor: 'orange',
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.1,
    marginHorizontal: 15,
  },
  btnCancel: {
    width: '50%',
    // backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  btnSave: {
    width: '50%',
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 5,
  },
  //----------------------------------------------------------------
  txtPitchActiveTime: {
    fontWeight: '600',
    marginTop: 10,
  },
  txtDistancePrice: {
    fontWeight: '600',
    marginTop: 10,
  },
  longlatView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  errorText: {
    color: 'red',
    marginLeft: 5,
    fontSize: 12,
  },
  //uplloadFile
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
