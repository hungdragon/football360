import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {ActivityIndicator, useTheme} from 'react-native-paper';
const styles = StyleSheet.create({
  loading: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 999999,
  },
});
const FootballLoading: React.FC = () => {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.loading,
        {
          backgroundColor: theme.colors.black + '20',
        },
      ]}>
      <ActivityIndicator animating={true} color={theme.colors.primaryBlue} />
    </View>
  );
};

export default FootballLoading;
