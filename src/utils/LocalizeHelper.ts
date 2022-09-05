import i18n, {TranslateOptions} from 'i18n-js';
import {I18nManager} from 'react-native';
type Getter = () => object;
type TranslationGetters = {
  [locale: string]: Getter;
};
const translationGetters: TranslationGetters = {
  // lazy requires (metro bundler does not support symlinks)

  en: () => require('localization/en.json'),
  vi: () => require('localization/vi.json'),
};
export const getSupportedLanguage = (): string[] => {
  return Object.keys(translationGetters);
};

// export const translate = memoize(
//     (key, config?) => i18n.t(key, config),
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-return
//     (key, config) => (config ? key + JSON.stringify(config) : key),
// );
export const translate = (key: string, config?: TranslateOptions): string => {
  return i18n.t(key, config);
};

export const setI18nConfig = (languageCode: string): void => {
  // fallback if no available language fits
  // const fallback = { languageTag: 'en', isRTL: false };
  let languageTag = 'en';
  const isRTL = false;
  const listLanguageSupport = Object.keys(translationGetters);
  if (listLanguageSupport && listLanguageSupport.includes(languageCode)) {
    languageTag = languageCode;
  }

  // update layout direction
  I18nManager.forceRTL(isRTL);

  // set i18n-js config
  i18n.translations = {[languageTag]: translationGetters[languageTag]()};
  i18n.locale = languageTag;
};
