import {NavigationContainer} from '@react-navigation/native';
import {IAppPreferenceContext, PreferencesContext} from 'app/context';
import {store} from 'app/store';
import {AppDialogProvider} from 'components/dialog/AppDialogContext';
import {config} from 'constants/config';
import {appConstants} from 'constants/const';
import {AppUserProvider} from 'context/AppUserContext';
import RootStackNavigation from './src/navigation/RootStackNavigation';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {MenuProvider} from 'react-native-popup-menu';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {StripeProvider} from '@stripe/stripe-react-native';
import {
  setI18nConfig,
  setItem,
  getItem,
  handleException,
  navigationContainerRef,
} from 'utils';
import API_METHOD from 'constants/api';
export interface IAppPreference {
  themeName: string;
  languageCode: string;
}
const App = () => {
  const STRIPE_PUBLISHABLE_KEY = API_METHOD.STRIPE.STRIPE_KEY;
  console.log('KEY-----', config.STRIP_KEY);
  //setTheme for App
  // const [themeName, setThemeName] = React.useState<string>(
  //   THEME_NAME.DEFAULT_THEME,
  // );
  //set localize for App
  const [languageCode, setLanguageCode] = React.useState<string>(
    config.DEFAULT_LANGUAGE,
  );
  const changeLanguageCode = (code: string): void => {
    setLanguageCode(code);
    setI18nConfig(code); //viet them cai nay
  };
  //const theme = getThemeFromName(themeName);
  // const navigationTheme: Theme = {
  //   ...theme,
  //   colors: {
  //     ...theme.colors,
  //   },
  // };
  //Xử lý khi thằng themeName thay đổi
  React.useEffect(() => {
    //xử lý lưu preference của App khi thông tin thay đổi
    const saveAppPreps: () => Promise<void> = async () => {
      try {
        //Lưu hết các cấu hình của app trong key này
        const prefString = JSON.stringify({
          //themeName: themeName,
          languageCode: languageCode,
        });
        await setItem(
          appConstants.ASYNC_STORAGE_KEY.PREFERENCES_KEY,
          prefString,
        );
      } catch (error) {}
    };
    saveAppPreps()
      .then(() => {
        //Không xử lý
      })
      .catch(() => {
        //Không xử lý
      });
  }, [languageCode]);
  React.useEffect(() => {
    //xử lý restore preference của App
    const restoreAppPrefs: () => Promise<void> = async (): Promise<void> => {
      try {
        const prefString = await getItem(
          appConstants.ASYNC_STORAGE_KEY.PREFERENCES_KEY,
        );

        const preferences: IAppPreference = JSON.parse(prefString || '');
        if (preferences) {
          //  setThemeName(preferences.themeName);
          changeLanguageCode(preferences.languageCode);
        }
      } catch (error) {
        // ignore error
        handleException(error);
      }
    };
    restoreAppPrefs()
      .then(() => {
        //Không xử lý
      })
      .catch(e => {
        //Không xử lý
        handleException(e);
      });
  }, []);
  const preferences = React.useMemo<IAppPreferenceContext>(() => {
    return {
      // themeName: themeName,
      // changeTheme: name => {
      //   setThemeName(name);
      // },
      languageCode: languageCode,
      changeLanguageCode: code => {
        changeLanguageCode(code);
      },
    };
  }, [languageCode]);
  return (
    <StripeProvider
      publishableKey={STRIPE_PUBLISHABLE_KEY}
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
      merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
    >
      <PaperProvider>
        <Provider store={store}>
          <MenuProvider style={styles.flex1}>
            <SafeAreaProvider>
              <PreferencesContext.Provider value={preferences}>
                <NavigationContainer
                  //theme={navigationTheme}
                  ref={navigationContainerRef}>
                  <AppDialogProvider>
                    {/* <AppCommonProvider> */}
                    <AppUserProvider>
                      <RootStackNavigation />
                    </AppUserProvider>
                    {/* </AppCommonProvider> */}
                  </AppDialogProvider>
                </NavigationContainer>
                {/* <Toast config={toastConfig} /> */}
              </PreferencesContext.Provider>
            </SafeAreaProvider>
          </MenuProvider>
        </Provider>
      </PaperProvider>
    </StripeProvider>
  );
};
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  flex1: {flex: 1},
  toastContainer: {
    height: 50,
    width: '35%',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  toastText: {
    fontSize: 20,
    marginLeft: 16,
  },
});
export default App;
// export default codePush({
//   updateDialog: {
//     mandatoryUpdateMessage: 'Hãy update phiên bản mới nhé!!:))',
//     mandatoryContinueButtonLabel: 'Đồng ý',
//     optionalUpdateMessage: 'Có bản cập nhật không bắt buộc. Bạn có muốn cài đặt ngay?',
//     optionalInstallButtonLabel: 'Cài đặt',
//     optionalIgnoreButtonLabel: 'Bỏ qua',
//     title: 'HCMMC Có bản cập nhật mới',
//     descriptionPrefix: '\n\nNội dung cập nhật:\n',
//   },
//   installMode: codePush.InstallMode.IMMEDIATE,
//   deploymentKey: __DEV__ ? 'DEV' : Config.DEPLOYMENT_KEY,
//   checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
// })(App);
