import {apiClient} from 'api/APIClient';
import API_METHOD from 'constants/api';

export interface FootballTimeResponse {
  _id: string;
  dateTime: string;
  pitchName: string;
  id_Pitch: string;
  code: string;
  typePitch: string;
  footballPitch: Array<FootballTime>;
}
export interface FootballTime {
  id: number;
  timeSlot: string;
  timeStart: number;
  timeEnd: number;
  price: string;
  status: string;
}
export const FootballApi = {
  book_football_Time(params: any): Promise<FootballTimeResponse> {
    return new Promise<FootballTimeResponse>((resolve, reject) => {
      apiClient
        .post<FootballTimeResponse>(
          API_METHOD.MS_FOOTBALL.BOOK_FOOTBALL_TIME_LIST,
          params,
          {
            timeout: 10 * 1000,
          },
        )
        .then(response => {
          resolve(response) as unknown as FootballTimeResponse;
        })
        .catch((err: Error) => {
          console.log('ERRRR----', err);
          reject(err);
        });
    });
  },
  football_booking(params: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      apiClient
        .post<any>(API_METHOD.MS_FOOTBALL.FOOTBALL_BOOKING, params, {
          timeout: 10 * 1000,
        })
        .then(response => {
          resolve(response);
        })
        .catch((err: Error) => {
          reject(err);
          console.log('err booking----');
        });
    });
  },
  football_bill(params: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      apiClient
        .post<any>(API_METHOD.MS_FOOTBALL.FOOTBALL_BILL, params, {
          timeout: 10 * 1000,
        })
        .then(response => {
          resolve(response);
        })
        .catch((err: Error) => {
          reject(err);
          console.log('err booking----');
        });
    });
  },
  football_order(username: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      apiClient
        .post<any>(API_METHOD.MS_FOOTBALL.FOOTBALL_ORDER, {
          params: {username: username},
          timeout: 10 * 1000,
        })
        .then(response => {
          resolve(response);
        })
        .catch((err: Error) => {
          reject(err);
          console.log('err booking----');
        });
    });
  },
  // getUser(): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     apiClient
  //       .get(API_METHOD.MS_AUTH.GET_USER_INFO)
  //       .then(response => {
  //         const data = response;
  //         resolve(data);
  //       })
  //       .catch(err => {
  //         reject(err);
  //       });
  //   });
  // },
};
