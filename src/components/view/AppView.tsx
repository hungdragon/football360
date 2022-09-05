import React from 'react';
import {View, ViewProps} from 'react-native';
import {useTheme} from 'react-native-paper';

export type AppViewProps = ViewProps;
const AppView: React.FC<AppViewProps> = props => {
  const theme: ReactNativePaper.Theme = useTheme();
  const {} = theme; // color is here;
  const propsWithTheme = {
    ...props,
    // style: [
    //     props.style,
    //     {
    //         backgroundColor: colors.background,
    //     },
    // ],
  };
  return <View {...propsWithTheme}>{propsWithTheme.children}</View>;
};
export default AppView;
