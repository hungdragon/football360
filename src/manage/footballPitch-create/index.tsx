import AppHeader from 'components/AppHeader/AppHeader';
import AppText from 'components/text/AppText';
import AppView from 'components/view/AppView';
import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {TextInput} from 'react-native-paper';
import UploadFile from './UploadFile';
const FootballPitchCreate: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="create" />
      <AppView style={styles.form}>
        <AppView style={styles.formInput}>
          <TextInput
            outlineColor={'gray'}
            style={styles.textInputStyle}
            placeholder={'SDS'}
            mode="outlined"
            maxLength={100}
            dense
            label="Tên sân bóng"
            //value={props.values.address}
            //onChangeText={props.handleChange('address')}
          />
        </AppView>
        <AppView style={styles.txtSlotTimeView}>
          <TextInput />
          <Text>{'h ----'}</Text>
          <TextInput />
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
            //value={props.values.address}
            //onChangeText={props.handleChange('address')}
          />
        </AppView>
        <AppView style={styles.formInput}>
          <TextInput
            outlineColor={'gray'}
            style={styles.textInputStyle}
            placeholder={'SDS'}
            mode="outlined"
            maxLength={100}
            dense
            label="Địa chỉ sân bóng"
            //value={props.values.address}
            //onChangeText={props.handleChange('address')}
          />
        </AppView>

        <UploadFile />
      </AppView>
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
  },
  formInput: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5, // edit here
  },
  txtSlotTimeView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 5, // edit here
  },
});
