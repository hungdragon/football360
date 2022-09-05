import * as React from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';
import {useTheme} from 'react-native-paper';

const AppTouchableOpacity: React.FC<TouchableOpacityProps> = props => {
  //Set background here
  const theme: ReactNativePaper.Theme = useTheme();
  const {colors} = theme;
  const propsWithTheme = {
    ...props,
  };

  return (
    <TouchableOpacity {...propsWithTheme}>
      {propsWithTheme.children}
    </TouchableOpacity>
  );
};

export default AppTouchableOpacity;
