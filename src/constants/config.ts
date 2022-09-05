import Config from 'react-native-config';
export const config = {
  BASE_URL: 'http://localhost:3000/',
  KEYCLOAK: 'http://localhost:3000/',
  VER_1_0: Config.API_VERSION_1_0,
  IS_UAT: Config.IS_UAT,
  DEFAULT_LANGUAGE_CODE: Config.DEFAULT_LANGUAGE_CODE,
  DEFAULT_LANGUAGE: Config.DEFAULT_LANGUAGE_CODE,
  NAME_SERVICES_LOGIN: Config.NAME_SERVICES_LOGIN,
  METHOD_SERVICES_LOGIN: Config.METHOD_SERVICES_LOGIN,
  METHOD_NAME_LOGIN: Config.METHOD_NAME_LOGIN,
  MS_EMPLOYEES: Config.MS_EMPLOYEES,
  MS_USER_INFO: Config.MS_USER_INFO,
  LOGIN: Config.LOGIN,
  USER: Config.USER,
  FOOTBALL: Config.FOOTBALL,
  STRIP_KEY: Config.STRIPE_PUBLISHABLE_KEY,
};
export const authenConfig = {
  APPLICATION_URL_ENCODED: 'application/x-www-form-urlencoded',
  URN_IETF: 'urn:ietf:params:oauth:grant-type:uma-ticket',
};

export const keycloakConfig = {
  CLIENT_ID: Config.CLIENT_ID,
  GRANT_TYPE: Config.GRANT_TYPE,
  GRANT_TYPE_REFRESH_TOKEN: Config.REFRESH_TOKEN,
  CLIENT_SECRET: Config.CLIENT_SECRET,
  AUDIENCE: Config.AUDIENCE,
};

export const sessionConfig = {
  PERCENTAGE: 80,
  TIME_GET_TOKEN: 240,
  TIME_OUT: 300,
};

export const apiServiceConfig = {
  TIME_OUT: 15 * 1000,
  NUMBER_RETRY_REFRESH_TOKEN: 3,
};

export const apiGeeConfig = {
  username: Config.APIGEE_USERNAME,
  password: Config.APIGEE_PASSWORD,
};

export const errorMessageConfig = (error: any) => {
  switch (error) {
    case 'CLIENT_ERROR':
      return 'CLIENT_ERROR';
    case 'SERVER_ERROR':
      return 'SERVER_ERROR';
    case 'TIMEOUT_ERROR':
      return 'TIMEOUT_ERROR';
    case 'CONNECTION_ERROR':
      return 'CONNECTION_ERROR';
    case 'NETWORK_ERROR':
      return 'NETWORK_ERROR';
    case 'CANCEL_ERROR':
      return 'CANCEL_ERROR';
    default:
      return null;
  }
};
