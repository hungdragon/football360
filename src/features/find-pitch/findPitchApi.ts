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
export const findPitchApi = {
  getPitchList(): Promise<PitchInforResponse> {
    return new Promise<PitchInforResponse>((resolve, reject) => {
      apiClient
        .get<PitchInforResponse>(API_METHOD.MS_FOOTBALL.GET_PITCH_LIST, {
          timeout: 10 * 1000,
        })
        .then(response => {
          resolve(response) as unknown as PitchInforResponse;
        })
        .catch((err: Error) => {
          console.log('ERRRR----', err);
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
