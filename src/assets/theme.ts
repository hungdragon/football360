import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import merge from 'deepmerge';
/**
 * Dùng để mô tả theme cho project. Nếu muốn thêm theme thì khởi tạo 1 themes mới như CustomDefaultTheme và thêm vào THEME_NAME và mapThemesWithNames
 */
declare global {
  namespace ReactNativePaper {
    interface ThemeFonts {
      superLight: ThemeFont;
      bold: ThemeFont;
    }
    interface ThemeColors {
      customColor: string;
      lightGrey: string;
      brightGray: string;
      platinum: string;
      gray: string;
      bluebonnet: string;
      ghostWhite: string;
      greyLetter: string;
      white: string;
      blue: string;
      hr: string;
      taupeGray: string;
      red: string;
      backGroundInput: string;
      green: string;
      sonicSilver: string;
      black: string;
    }
    interface ThemeAnimation {
      customProperty: number;
    }
    interface Theme {
      userDefinedThemeProperty: string;
    }
  }
}

const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

export const CustomDarkTheme: ReactNativePaper.Theme = {
  ...CombinedDarkTheme,
  colors: {
    ...CombinedDarkTheme.colors,
    customColor: '#BADA55',
    gray: 'gray',
    lightGrey: '#d3d3d3',
    brightGray: '#EDEDF6',
    platinum: '#e5e5e5',
    bluebonnet: '#002EDB',
    ghostWhite: '#F8F9FA',
    greyLetter: '#AEAFB4',
    white: '#FFFFFF',
    blue: '#0D6EFD',
    hr: '#EBEBEC',
    taupeGray: '#86868F',
    red: '#FF0A2B',
    backGroundInput: '#F5F5FA',
    green: '#099428',
    sonicSilver: '#787878',
    black: 'black',
  },
  fonts: {
    ...CombinedDarkTheme.fonts,
    superLight: {...CombinedDarkTheme.fonts.light},
    regular: {
      fontFamily: 'Roboto-Regular',
    },
    light: {
      fontFamily: 'Roboto-Light',
      // fontWeight: '300',
    },
    bold: {
      fontFamily: 'Roboto-Bold',
      // fontWeight: '',
    },
  },
  userDefinedThemeProperty: '',
  animation: {
    ...CombinedDarkTheme.animation,
    customProperty: 1,
  },
};

export const CustomDefaultTheme = {
  ...CombinedDefaultTheme,
  colors: {
    ...CombinedDefaultTheme.colors,
    customColor: '#BADA55',
    gray: 'gray',
    lightGrey: '#d3d3d3',
    brightGray: '#EDEDF6',
    platinum: '#e5e5e5',
    black: 'black',
    bluebonnet: '#002EDB',
    ghostWhite: '#F8F9FA',
    white: '#FFFFFF',
    greyLetter: '#AEAFB4',
    hr: '#EBEBEC',
    blue: '#0D6EFD',
    taupeGray: '#86868F',
    red: '#FF0A2B',
    green: '#099428',
    backGroundInput: '#F5F5FA',
    sonicSilver: '#787878',
  },
  fonts: {
    ...CombinedDefaultTheme.fonts,
    superLight: {...CombinedDefaultTheme.fonts.light},
    regular: {
      fontFamily: 'Roboto-Regular',
    },
    light: {
      fontFamily: 'Roboto-Light',
      // fontWeight: '300',
    },
    bold: {
      fontFamily: 'Roboto-Bold',
      // fontWeight: '',
    },
  },
  userDefinedThemeProperty: '',
  animation: {
    ...CombinedDefaultTheme.animation,
    customProperty: 1,
  },
};
export const THEME_NAME = {
  DARK_THEME: 'DARK_THEME',
  DEFAULT_THEME: 'DEFAULT_THEME',
};

const mapThemesWithNames = {
  [THEME_NAME.DARK_THEME]: CustomDarkTheme,
  [THEME_NAME.DEFAULT_THEME]: CustomDefaultTheme,
};

export const getThemeFromName = (themeName: string): ReactNativePaper.Theme => {
  const theme: ReactNativePaper.Theme = mapThemesWithNames[themeName];
  return theme ? theme : CustomDefaultTheme;
};
