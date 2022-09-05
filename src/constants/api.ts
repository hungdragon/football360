import {config} from 'constants/config';

const getFullMethod = (
  microServiceName: string,
  methodVersion: string,
  methodName: string,
): string => {
  return microServiceName + methodVersion + methodName;
};

const API_METHOD = {
  // MS_AUTH: {
  //   LOGIN: getFullMethod(
  //     config.NAME_SERVICES_LOGIN,
  //     config.METHOD_SERVICES_LOGIN,
  //     config.METHOD_NAME_LOGIN,
  //   ),
  //   GET_USER_INFO: getFullMethod(config.MS_USER_INFO, '', 'me'),
  //   REFRESH_TOKEN: getFullMethod(config.MS_USER_INFO, '', ''),
  // },
  STRIPE: {
    STRIPE_KEY: config.STRIP_KEY,
  },
  MS_AUTH: {
    LOGIN: getFullMethod(config.LOGIN, '', ''),
    GET_USER_INFO: 'users/me',
    UPDATE_FULLNAME: getFullMethod(config.USER, '/change-fullname', ''),
    UPDATE_PHONENUMBER: getFullMethod(config.USER, '/change-phoneNumber', ''),
    //REFRESH_TOKEN: getFullMethod(config.MS_USER_INFO, '', ''),
  },
  MS_FOOTBALL: {
    GET_PITCH_LIST: 'api/pitch-list',
    BOOK_FOOTBALL_TIME_LIST: 'api/football-pitch-time-list',
    FOOTBALL_BOOKING: 'api/football-booking',
    FOOTBALL_BILL: getFullMethod(config.FOOTBALL, '/create-bill', ''),
    FOOTBALL_ORDER: getFullMethod(config.FOOTBALL, '/customer-order', ''),
    TEAM_LIST: getFullMethod(config.FOOTBALL, '/team-list', ''),
    CREATE_TEAMS: getFullMethod(config.FOOTBALL, '/create-teams', ''),
    UPDATE_TEAMS: getFullMethod(config.FOOTBALL, '/update-team-list', ''),
    UPDATE_TEAMS_REQUEST: getFullMethod(
      config.FOOTBALL,
      '/update-team-list-request',
      '',
    ),
    //GET_USER_INFO: 'users/me',
    //REFRESH_TOKEN: getFullMethod(config.MS_USER_INFO, '', ''),
  },
};
export default API_METHOD;
