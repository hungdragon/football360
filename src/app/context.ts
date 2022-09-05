import React from 'react';
//import { IAppPreferenceContext } from './type';
export interface IAppPreferenceContext {
  themeName: string;
  changeTheme: (name: string) => void;
  languageCode: string;
  changeLanguageCode: (languageCode: string) => void;
}
export const PreferencesContext = React.createContext<IAppPreferenceContext>(
  {} as IAppPreferenceContext,
);
