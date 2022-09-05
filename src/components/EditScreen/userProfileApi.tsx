import {apiClient} from 'api/APIClient';
import API_METHOD from 'constants/api';
type imgArr = {
  img: string;
};
export interface PitchInforResponse {
  _id: string;
  pitchs: Array<PitchInfo>;
}
export interface PitchInfo {
  _id: string;
  pitchName: string;
  code: string;
  fullTimeSlot: string;
  location: string;
  priceRange: string;
  image: string;
  rate: number;
  title: string;
  content: string;
  imgArray: Array<imgArr>;
  latitude: number;
  longitude: number;
}
export const userProfileApi = {
  updateFullName(fullName: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      apiClient
        .post<any>(
          API_METHOD.MS_AUTH.UPDATE_FULLNAME,
          {fullName},
          {
            timeout: 10 * 1000,
          },
        )
        .then(response => {
          resolve(response) as unknown as any;
        })
        .catch((err: Error) => {
          console.log('error update fullName', err);
          reject(err);
        });
    });
  },
  updatePhoneNumber(phoneNumber: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      apiClient
        .post<any>(
          API_METHOD.MS_AUTH.UPDATE_PHONENUMBER,
          {phoneNumber},
          {
            timeout: 10 * 1000,
          },
        )
        .then(response => {
          resolve(response) as unknown as any;
        })
        .catch((err: Error) => {
          console.log('error update phoneNumber', err);
          reject(err);
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
