import {ApisauceConfig, ApisauceInstance, create, CancelToken} from 'apisauce';
import axios, {AxiosInstance} from 'axios';
import {AxiosRequestConfig} from 'axios';
import API_METHOD from 'constants/api';
import {
  apiServiceConfig,
  keycloakConfig,
  authenConfig,
  config,
} from 'constants/config';
import {appConstants} from 'constants/const';
import uuid from 'react-native-uuid';
import {
  urlEncodedBody,
  handleException,
  createAppError,
  translate,
} from 'utils';

//import {GetTokenResponse} from 'app/type';
import BackgroundTimer from 'react-native-background-timer';
export interface GetTokenResponse {
  access_token: string;
  refresh_token: string;
  refresh_token_expires_in: string;
  expires_in: number;
  scope: string;
  issued_at: string;
  token_type: string;
}
// import translations from

import {RequestTransform, ResponseTransform} from 'apisauce';
import {logResponseMonitor} from './extension/APIMonitor';

// const PROBLEM_MESSAGE = {
//     CLIENT_ERROR: translations.API_ERROR.CLIENT_ERROR,
//     SERVER_ERROR: translations.API_ERROR.SERVER_ERROR,
//     TIMEOUT_ERROR: translations.API_ERROR.TIMEOUT_ERROR,
//     CONNECTION_ERROR: translations.API_ERROR.CONNECTION_ERROR,
//     NETWORK_ERROR: translations.API_ERROR.NETWORK_ERROR,
//     CANCEL_ERROR: translations.API_ERROR.CANCEL_ERROR,
// };

export const transformRequest: RequestTransform = request => {
  // this.instance.setHeader('clientMessageId', `${uuid.v4}`);
  // if (!request.headers.isAuthorization) {
  //     request.headers.Authorization = undefined;
  // }
};

export const transformResponse: ResponseTransform = response => {
  // if (response.problem || !response.ok) {
  //     if (response.problem === 'CANCEL_ERROR' && response.originalError.message === 'manual') {
  //         response.message = '';
  //     } else if (response.data?.description) {
  //         response.message = response.data?.description;
  //     } else if (response.data?.errorDesc) {
  //         response.message = response.data.errorDesc[0];
  //     } else if (PROBLEM_MESSAGE[response.problem]) {
  //         response.message = PROBLEM_MESSAGE[response.problem];
  //     } else {
  //         response.message = 'C?? l???i ngo???i l??? x???y ra. Vui l??ng th??? l???i!';
  //     }
};

export type AppApiRequestConfig = AxiosRequestConfig;

export type AppApiParams = any;

const DEFAULT_TIMEOUT = apiServiceConfig.TIME_OUT; //milisecond
const DEFAULT_NUMBER_RETRY_REFRESH_TOKEN =
  apiServiceConfig.NUMBER_RETRY_REFRESH_TOKEN; //milisecond

const createAxiosApiInstance = (_baseURL: string): ApisauceInstance => {
  const axiosInstance: AxiosInstance = axios.create({
    baseURL: _baseURL,
  });
  axiosInstance.interceptors.request.use((axiosConfig: AxiosRequestConfig) => {
    let newHeader = {};
    if (axiosConfig.headers) {
      newHeader = {
        ...axiosConfig.headers,
        clientMessageId: uuid.v4(),
      };
    }
    axiosConfig.headers = newHeader;
    return axiosConfig;
  });
  const apiSauceConfig: ApisauceConfig = {
    baseURL: _baseURL,
    axiosInstance,
    timeout: DEFAULT_TIMEOUT,
  };

  return create(apiSauceConfig);
};

class ApiClient {
  instance: ApisauceInstance;
  token_expires_in: number;
  refresh_token: string;
  token_type: string;
  token: string;
  //C??c bi???n s??? d???ng ????? x??? l?? vi???c refresh token
  refeshTokenInterval?: ReturnType<typeof BackgroundTimer.setInterval>;
  tokenTimeRemaining: number;
  isRefreshingToken: boolean; //Tr???ng th??i ??ang refresh token hay kh??ng.
  numberRefreshToken: number; //S??? l???n refresh token. M???c ?????nh ?????n 5 l???n s??? d???ng
  // setInterval(()=>{});

  init() {
    this.token_expires_in = 0;
  }

  constructor(baseURL: string) {
    this.instance = createAxiosApiInstance(baseURL);
    this.instance.addMonitor(logResponseMonitor);
    this.instance.addRequestTransform(transformRequest);
    this.instance.addResponseTransform(transformResponse);
    this.token_expires_in = 0;
    this.refresh_token = '';
    this.token_type = '';
    this.token = '';
    //Init refresh token action
    this.refeshTokenInterval = undefined;
    this.tokenTimeRemaining = 0;
    this.isRefreshingToken = false;
    this.numberRefreshToken = 0;
  }

  setAuthorization(
    token: string,
    tokenType: string,
    token_expires_in: number,
    refresh_token: string,
  ) {
    this.instance.setHeader('Authorization', `${tokenType} ${token}`);
    this.token_expires_in = token_expires_in;
    this.refresh_token = refresh_token;
    this.token_type = tokenType;
    this.token = token;
    //Init refresh token action
    this.tokenTimeRemaining = token_expires_in;
    this.isRefreshingToken = false;
    this.numberRefreshToken = 0;
    // if (this.token_expires_in > this.countTokenExpired) {
    //   this.refeshTokenInterval = setInterval(() => {}, 1000);
    // }
  }

  //B???t ?????u action refresh token
  //Ch??? n??y g???i sau khi l???y token xong.
  startActionRefreshToken() {
    if (!this.refeshTokenInterval) {
      this.refeshTokenInterval = BackgroundTimer.setInterval(() => {
        this.actionRefreshToken();
      }, 1000);
    }
  }

  //D???ng action refresh token
  //Ch??? n??y g???i sau khi l???y token th???t b???i ho???c logout
  stopActionRefreshToken() {
    if (this.refeshTokenInterval) {
      BackgroundTimer.clearInterval(this.refeshTokenInterval);
      this.refeshTokenInterval = undefined;
    }
  }

  getToken() {
    return `${this.token_type} ${this.token}`;
  }

  actionRefreshToken() {
    //Th???i gian b???t ?????u g???i refresh token l?? c??n 20% th???i gian h???t h???n c???a token t??nh b???ng gi??y
    const timeToRefresh = this.token_expires_in * 0.9;
    if (this.tokenTimeRemaining > timeToRefresh) {
      //Ch??a ?????n l??c refresh
      //Gi???m th???i gian c??n l???i c???a token ??i 1
      this.tokenTimeRemaining--;
      // console.log('//Ch??a ?????n l??c refresh, Gi???m th???i gian c??n l???i c???a token ??i 1', this.tokenTimeRemaining);
    } else if (this.tokenTimeRemaining === 0) {
      //Ki???m tra token h???t h???n
      console.log('Token ???? h???t h???n th???c hi???n action stop');
      this.stopActionRefreshToken();
    } else if (this.isRefreshingToken === true) {
      //Ki???m tra c?? ??ang refresh token hay kh??ng
      this.tokenTimeRemaining--;
      console.log('//??ang refresh t???ken', this.tokenTimeRemaining);
    } else if (this.numberRefreshToken > DEFAULT_NUMBER_RETRY_REFRESH_TOKEN) {
      //Ki???m tra v?????t qu?? s??? l???n refresh token
      console.log('V?????t qu?? s??? l???n retry th???c hi???n action stop');
      this.stopActionRefreshToken();
    } else {
      this.tokenTimeRemaining--;
      this.isRefreshingToken = true;

      console.log(
        'Th???c hi???n retry refresh token l???n ',
        this.numberRefreshToken,
      );
      const body = {
        refresh_token: this.refresh_token,
        grant_type: keycloakConfig.GRANT_TYPE_REFRESH_TOKEN,
        client_id: keycloakConfig.CLIENT_ID,
      };
      const encodedBody = urlEncodedBody(body);
      const apiConfig: AppApiRequestConfig = {
        headers: {
          'Content-Type': authenConfig.APPLICATION_URL_ENCODED,
        },
        transformRequest: (data, headers) => {
          delete headers.Authorization;

          return data;
        },
      };
      apiClient
        .post<GetTokenResponse>(
          API_METHOD.MS_AUTH.REFRESH_TOKEN,
          encodedBody,
          apiConfig,
        )
        .then(response => {
          this.isRefreshingToken = false;
          if (
            this.tokenTimeRemaining > 0 &&
            this.numberRefreshToken <= DEFAULT_NUMBER_RETRY_REFRESH_TOKEN
          ) {
            const {access_token, token_type, refresh_token, expires_in} =
              response;
            this.setAuthorization(
              access_token,
              token_type,
              expires_in,
              refresh_token,
            );
          } else {
            this.numberRefreshToken++;
          }
        })
        .catch((err: Error) => {
          handleException(err);
          this.isRefreshingToken = false;
          this.numberRefreshToken++;
        });
    }
  }

  get<T>(
    url: string,
    params?: AppApiParams,
    apiConfig?: AppApiRequestConfig,
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      const source = CancelToken.source();
      const timeoutValue = apiConfig?.timeout
        ? apiConfig.timeout
        : DEFAULT_TIMEOUT;
      const timeout = setTimeout(() => {
        source.cancel();
        // Timeout Logic
        reject(
          createAppError(
            'API_ERROR',
            Error(translate('request_timeout')),
            appConstants.API_STATUS_CODE.REQUEST_TIMEOUT,
          ),
        );
      }, timeoutValue);
      this.instance
        .get<T>(url, params, apiConfig)
        .then(response => {
          clearInterval(timeout);
          const {ok} = response;
          if (ok) {
            //success
            resolve(response.data as T);
          } else {
            //problem
            reject(createAppError('API_ERROR', response.originalError));
          }
        })
        .catch(error => {
          clearInterval(timeout);
          reject(createAppError('API_ERROR', error));
        });
    });
  }

  post<T>(
    url: string,
    data?: AppApiParams,
    apiConfig?: AppApiRequestConfig,
  ): Promise<T> {
    // return this.instance.post(url, data, apiConfig);
    return new Promise((resolve, reject) => {
      const source = CancelToken.source();
      const timeoutValue = apiConfig?.timeout
        ? apiConfig.timeout
        : DEFAULT_TIMEOUT;
      const timeout = setTimeout(() => {
        source.cancel();
        // Timeout Logic
        reject(
          createAppError(
            'API_ERROR',
            Error(translate('request_timeout')),
            appConstants.API_STATUS_CODE.REQUEST_TIMEOUT,
          ),
        );
      }, timeoutValue);
      this.instance
        .post<T>(url, data, apiConfig)
        .then(response => {
          clearInterval(timeout);
          const {ok} = response;
          if (ok) {
            //success
            resolve(response.data as T);
          } else {
            //problem
            reject(createAppError('API_ERROR', response.originalError));
          }
        })
        .catch(error => {
          clearInterval(timeout);
          reject(createAppError('API_ERROR', error));
        });
    });
  }

  put<T>(
    url: string,
    data?: AppApiParams,
    apiConfig?: AppApiRequestConfig,
  ): Promise<T> {
    // return this.instance.put(url, data, apiConfig);
    return new Promise((resolve, reject) => {
      const source = CancelToken.source();
      const timeoutValue = apiConfig?.timeout
        ? apiConfig.timeout
        : DEFAULT_TIMEOUT;
      const timeout = setTimeout(() => {
        source.cancel();
        // Timeout Logic
        reject(
          createAppError(
            'API_ERROR',
            Error(translate('request_timeout')),
            appConstants.API_STATUS_CODE.REQUEST_TIMEOUT,
          ),
        );
      }, timeoutValue);
      this.instance
        .put<T>(url, data, apiConfig)
        .then(response => {
          clearInterval(timeout);
          const {ok} = response;
          if (ok) {
            //success
            resolve(response.data as T);
          } else {
            //problem
            reject(createAppError('API_ERROR', response.originalError));
          }
        })
        .catch(error => {
          clearInterval(timeout);
          reject(createAppError('API_ERROR', error));
        });
    });
  }

  delete<T>(
    url: string,
    params?: AppApiParams,
    apiConfig?: AppApiRequestConfig,
  ): Promise<T> {
    // return this.instance.delete(url, params, apiConfig);
    return new Promise((resolve, reject) => {
      const source = CancelToken.source();
      const timeoutValue = apiConfig?.timeout
        ? apiConfig.timeout
        : DEFAULT_TIMEOUT;
      const timeout = setTimeout(() => {
        source.cancel();
        // Timeout Logic
        reject(
          createAppError(
            'API_ERROR',
            Error(translate('request_timeout')),
            appConstants.API_STATUS_CODE.REQUEST_TIMEOUT,
          ),
        );
      }, timeoutValue);
      this.instance
        .delete<T>(url, params, apiConfig)
        .then(response => {
          clearInterval(timeout);
          const {ok} = response;
          if (ok) {
            //success
            resolve(response.data as T);
          } else {
            //problem
            reject(createAppError('API_ERROR', response.originalError));
          }
        })
        .catch(error => {
          clearInterval(timeout);
          reject(createAppError('API_ERROR', error));
        });
    });
  }
}

export const apiClient = new ApiClient(config.BASE_URL);
