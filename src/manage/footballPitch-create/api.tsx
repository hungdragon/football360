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
export const pitchAPI = {
  create_pitch(bodyRequest: any, image: any): Promise<any> {
    console.log('aaa', bodyRequest);
    console.log('file', JSON.stringify(image));
    return new Promise<any>((resolve, reject) => {
      apiClient
        .post<any>(API_METHOD.MS_FOOTBALL.ADD_PITCH, image, {
          params: bodyRequest,
          timeout: 10 * 1000,
        })
        .then(response => {
          resolve(response) as unknown as FootballTimeResponse;
        })
        .catch((err: Error) => {
          //console.log('ERRRR----', err);
          reject(err);
        });
    });
  },
};
