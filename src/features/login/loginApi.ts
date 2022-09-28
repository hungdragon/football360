import {apiClient} from 'api/APIClient';
import {apiClientLogin} from 'api/APIClientLogin';
import API_METHOD from 'constants/api';
import {keycloakConfig, authenConfig} from 'constants/config';
import {urlEncodedBody} from 'utils';

export interface PrevUser {
  userName?: string;
  fullName?: string;
  gender?: string;
}
//import {PrevUser} from 'app/type';
/* Xử lý Login */
interface GetTokenResponse {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  session_state: number;
  scope: string;
  'not-before-policy': string;
}
export const loginAPI = {
  getToken(
    userName: string | PrevUser,
    password: string,
  ): Promise<GetTokenResponse> {
    return new Promise<GetTokenResponse>((resolve, reject) => {
      const params = {
        username: userName,
        password: password,
        client_id: keycloakConfig.CLIENT_ID,
        client_secret: keycloakConfig.CLIENT_SECRET,
        grant_type: keycloakConfig.GRANT_TYPE,
      };
      // console.log('client_id----', params.client_id);
      // console.log('GRANT TYPE----', params.grant_type);
      const encodeBody = urlEncodedBody(params);
      const apiConfig = {
        headers: {
          'Content-Type': authenConfig.APPLICATION_URL_ENCODED,
        },
      };
      console.log('gggg---', API_METHOD.MS_AUTH.LOGIN, encodeBody, apiConfig);
      console.log('bbbbbb---', apiClientLogin);
      apiClientLogin
        .post<GetTokenResponse>(API_METHOD.MS_AUTH.LOGIN, encodeBody, apiConfig)
        .then(response => {
          const {access_token, expires_in, refresh_token, token_type} =
            response;
          apiClient.setAuthorization(
            access_token,
            token_type,
            expires_in,
            refresh_token,
          );
          resolve(response);
        })
        .catch((err: Error) => {
          //console.log('ERRRR----', err);
          reject(err);
        });
    });
  },
  getUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      apiClient
        .get(API_METHOD.MS_AUTH.GET_USER_INFO)
        .then(response => {
          const data = response;
          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
};
