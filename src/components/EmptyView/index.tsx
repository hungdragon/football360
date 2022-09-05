import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
const EmptyView: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>{'Không tìm thấy'}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default EmptyView;
