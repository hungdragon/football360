import _ from 'lodash';
//import {AppError, ErrorType} from 'app/type';
export type ErrorType = 'APP_ERROR' | 'API_ERROR';
export interface AppError {
  code: number;
  message?: string;
  detail?: string;
}

import {AxiosError} from 'axios';

import QueryString from 'qs';

import moment from 'moment';
import {Buffer} from 'buffer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {appConstants} from 'constants/const';
import {translate} from './LocalizeHelper';
import {showDialog} from 'features/dialog/dialogSlice';
import API_METHOD from 'constants/api';
import {store} from 'app/store';

export const handleException = (error: unknown): void => {
  console.log(error);
};

export const getValue: <T, U>(
  data: T,
  value: string | Array<T>,
  defaultValue?: U,
) => U = (data, value, defaultValue?) => {
  return _.get(data, value, defaultValue);
};

export const createAppError = (
  type: ErrorType,
  error: Error,
  appErrorCode?: number,
): AppError => {
  if (type === 'APP_ERROR') {
    if (appErrorCode) {
      return {
        code: appErrorCode,
        message: error.message,
        detail: error.stack,
      };
    }
    return {
      code: appConstants.APP_CODE.COMMON_ERROR_CODE, //Mac dinh cua Error cua app
      message: error.message,
      detail: error.stack,
    };
  }
  if (error.message === 'Network Error') {
    return {
      code: appConstants.APP_CODE.COMMON_ERROR_CODE,
      message: translate('network_error'),
      detail: error.stack,
    };
  }
  const {isAxiosError} = error as AxiosError;
  if (isAxiosError) {
    //La loi cua axios
    const {response} = error as AxiosError;
    // const error400 = response.data;
    if (response) {
      switch (response.status) {
        case 400:
          return {
            code: appConstants.API_STATUS_CODE.BAD_REQUEST,
            message: response.data.message,
            detail: error.stack,
          };
        case 401:
          if (response.config.url !== API_METHOD.MS_AUTH.LOGIN) {
            store.dispatch(showDialog());
            return {
              code: appConstants.API_STATUS_CODE.UNAUTHORIZED,
              message: translate('local_timeout'),
              detail: error.stack,
            };
          }
          return {
            code: appConstants.API_STATUS_CODE.UNAUTHORIZED,
            message: translate('invalid_mail_or_password'),
            detail: error.stack,
          };
        case 403:
          return {
            code: appConstants.API_STATUS_CODE.FORBIDDEN,
            message: translate('forbidden_error'),
            detail: error.stack,
          };
        case 404:
          return {
            code: appConstants.API_STATUS_CODE.NOT_FOUND,
            message: translate('not_found_error'),
            detail: error.stack,
          };
        case 408:
          return {
            code: appConstants.API_STATUS_CODE.REQUEST_TIMEOUT,
            message: translate('request_time_out'),
            detail: error.stack,
          };
        case 500:
          return {
            code: appConstants.API_STATUS_CODE.INTERNAL_SERVER_ERROR,
            message: response?.data?.description
              ? response.data.description
              : translate('error_call_api_500'),
            detail: error.stack,
          };
        case 501:
          return {
            code: appConstants.API_STATUS_CODE.NOT_IMPLEMENTED,
            message: translate('error_call_api'),
            detail: error.stack,
          };
        case 502:
          return {
            code: appConstants.API_STATUS_CODE.BAD_GATEWAY,
            message: translate('error_call_api'),
            detail: error.stack,
          };
        case 503:
          return {
            code: appConstants.API_STATUS_CODE.SERVICE_UNAVAILABLE,
            message: translate('error_call_api'),
            detail: error.stack,
          };
        case 504:
          return {
            code: appConstants.API_STATUS_CODE.GATEWAY_TIMEOUT,
            message: translate('error_call_api'),
            detail: error.stack,
          };
        default:
          return {
            code: response.status, //Mac dinh cua status cua response
            message: error.message,
            detail: JSON.stringify(error),
          };
      }
    }
  }

  return {
    code: appConstants.API_STATUS_CODE.INTERNAL_SERVER_ERROR, //Mac dinh cua Error cua API
    message: error.message,
    detail: error.stack,
  };
};

export const checkEmpty: <T>(obj: T) => boolean = obj => {
  return _.isEmpty(obj);
};

export const checkNull: <T>(obj: T) => boolean = obj => {
  return _.isNil(obj);
};

export const checkUnderfined: <T>(obj: T) => boolean = obj => {
  return _.isUndefined(obj);
};

export const checkEmptyOrUnderfined: <T>(obj: T) => boolean = obj => {
  if (checkEmpty(obj) || checkUnderfined(obj)) {
    return true;
  }
  return false;
};

export const isNullOrEmpty: <T>(obj: T) => boolean = obj => {
  if (checkNull(obj) || checkEmpty(obj)) {
    return true;
  }
  return false;
};

export const checkNullOrEmpty: <T>(data: T) => boolean = data => {
  return checkNull(data) || checkEmpty(data);
};

export const urlEncodedBody = (body: unknown): string => {
  return QueryString.stringify(body, {encode: true});
};

export const getBasicAuthenApigee = (): string => {
  const basicAuthen = `${apiGeeConfig.username}:${apiGeeConfig.password}`;
  const encodedBasicAuthen = Buffer.from(basicAuthen).toString('base64');
  return encodedBasicAuthen;
};

export const toLowerCase = (text: string): string => {
  return _.toLower(text);
};

export const convertString: <T>(data: T) => string = data => {
  return _.toString(data);
};

export const formatDateTime = (value: string, formatType: string): string => {
  if (checkNullOrEmpty(value)) {
    return '';
  }
  return moment(value).format(formatType);
};

export const removeAccent = (str: string): string => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
};
export const checkBackground = (numberIndex, index: number) => {
  if (numberIndex === index) {
    return {backgroundColor: '#0D6EFD'};
  } else {
    return {backgroundColor: '#F8F9FA'};
  }
};
export const checkTitle = (numberIndex, index: number) => {
  if (numberIndex === index) {
    return {color: '#F8F9FA'};
  } else {
    return {color: '#0D6EFD'};
  }
};

export const _saveFullNameUserFromStorage = async (value: string) => {
  try {
    await AsyncStorage.setItem(appConstants.ASYNC_STORAGE_KEY.USER_NAME, value);
  } catch (err) {
    handleException(err);
  }
};
