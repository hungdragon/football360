import {image} from 'assets/icons';
import AppLoadingIndicator from 'components/loading-indiacator/AppLoadingIndicator';
import AppText from 'components/text/AppText';
import AppTouchableOpacity from 'components/touchable-opacity/AppTouchableOpacity';
import * as React from 'react';
import AppFontAwesomeIcon from 'react-native-vector-icons/AntDesign';
import {
  ImageSourcePropType,
  StyleSheet,
  ViewStyle,
  ImageStyle,
  TextStyle,
  Image,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import {checkNullOrEmpty, translate} from 'utils';
import AppView, {AppViewProps} from './AppView';

type IProps = AppViewProps & {
  errorString: string;
  textLoading?: string;
  loading: boolean;
  children: React.ReactChild;
  styleLoading?: ViewStyle | ViewStyle[];
  styleError?: ViewStyle | ViewStyle[];
  styleIconError?: ImageStyle | ImageStyle[];
  styleErrorText?: TextStyle | TextStyle[];
  styleRetryText?: TextStyle | TextStyle[];
  loadingSize?: number | string;
  retryPress?: () => void;
};

const AppViewWithErrorAndLoading: React.FC<IProps> = (props: IProps) => {
  const {
    errorString,
    textLoading,
    loading,
    children,
    styleLoading,
    styleError,
    retryPress,
    loadingSize = 15,
    styleIconError = styles.errorImage,
    styleErrorText = styles.errorText,
    styleRetryText = styles.retryText,
  } = props;
  const isError = !checkNullOrEmpty(errorString);
  const theme = useTheme();

  return (
    <AppView {...props.style}>
      {loading ? (
        <AppView style={styleLoading}>
          <AppLoadingIndicator size={loadingSize} />
          <AppText style={{alignItems: 'center', marginVertical: 5}}>
            {textLoading}
          </AppText>
        </AppView>
      ) : isError ? (
        <AppView
          style={[
            styleError,
            {justifyContent: 'center', alignItems: 'center'},
          ]}>
          <Image
            source={image?.IC_ERROR as ImageSourcePropType}
            style={styleIconError}
          />
          <AppText style={[styleErrorText, {color: theme.colors.grey}]}>
            {errorString}
          </AppText>
          <AppTouchableOpacity onPress={retryPress} style={styles.retryButton}>
            <AppFontAwesomeIcon
              name="undo"
              color={theme.colors.primaryBlue}
              size={15}
            />
            <AppText
              style={[styleRetryText, {color: theme.colors.primaryBlue}]}>
              {translate('retry')}
            </AppText>
          </AppTouchableOpacity>
        </AppView>
      ) : (
        children
      )}
    </AppView>
  );
};

export default AppViewWithErrorAndLoading;

const styles = StyleSheet.create({
  errorImage: {
    width: 70,
    height: 70,
    marginBottom: 12,
    // backgroundColor: 'blue'
  },
  retryButton: {
    marginTop: 16,
    flexDirection: 'row',
  },
  retryText: {
    marginLeft: 8,
  },
  errorText: {
    textAlign: 'center',
  },
});
