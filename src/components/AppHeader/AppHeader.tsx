import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import IconFeather from 'react-native-vector-icons/Feather';
interface Props {
  title: string;
  color?: string;
  colortext?: string;
}
const AppHeader: React.FC<Props> = ({title, color, colortext}) => {
  const navigation = useNavigation();
  return (
    <View style={[Styles.backView, {backgroundColor: color}]}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <IconFeather
          style={{
            fontSize: 22,
            color: colortext,
            paddingVertical: 5,
            fontWeight: 'bold',
          }}
          name="arrow-left"
        />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: Platform.OS === 'ios' ? 16 : 16,
          padding: 6,
          color: colortext,
          marginLeft: 15,
          fontWeight: 'bold',
        }}>
        {title}
      </Text>
    </View>
  );
};
const Styles = StyleSheet.create({
  backView: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
});
export default AppHeader;
