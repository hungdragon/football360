import React from 'react';
import {StyleSheet} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {useTheme} from 'react-native-paper';
import AppView, {AppViewProps} from './AppView';

export type Props = AppViewProps & {
  isLoading?: boolean;
  textLoading?: string;
  size?: 'large' | 'small' | 'normal';
  spinnerColor?: string;
};
const AppViewWithFullScreenLoading: React.FC<Props> = props => {
  const {isLoading, textLoading, size, spinnerColor} = props;
  const theme = useTheme();
  const {} = theme;
  const propsWithTheme = {
    ...props,
    // style: [
    //     props.style,
    //     {
    //         backgroundColor: colors.background,
    //     },
    // ],
  };
  const color = spinnerColor ? spinnerColor : 'white';

  return (
    <AppView {...propsWithTheme}>
      <Spinner
        visible={isLoading}
        textContent={textLoading}
        color={color}
        size={size}
        textStyle={{...styles.textLoading, color: color}}
        overlayColor={'rgba(0, 0, 0, 0.6)'}
      />
      {propsWithTheme.children}
    </AppView>
  );
};
const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  textLoading: {
    fontSize: 20,
  },
});
export default AppViewWithFullScreenLoading;
