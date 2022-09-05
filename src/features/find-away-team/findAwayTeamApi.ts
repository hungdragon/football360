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
export interface TeamListResponse {
  size: number;
  dataFilter: [];
}
export const findAwayTeamApi = {
  getTeamList(): Promise<TeamListResponse> {
    return new Promise<TeamListResponse>((resolve, reject) => {
      apiClient
        .get<TeamListResponse>(API_METHOD.MS_FOOTBALL.TEAM_LIST, {
          timeout: 10 * 1000,
        })
        .then(response => {
          resolve(response) as unknown as TeamListResponse;
        })
        .catch((err: Error) => {
          console.log('error ----TEAM-LIST----', err);
          reject(err);
        });
    });
  },
  createTeams(bodyRequest: object): Promise<unknown> {
    return new Promise((resolve, reject) => {
      apiClient
        .post(API_METHOD.MS_FOOTBALL.CREATE_TEAMS, bodyRequest, {
          timeout: 10 * 1000,
        })
        .then(response => {
          resolve(response) as unknown;
        })
        .catch((err: Error) => {
          console.log('error ----CREATE0-TEAMS----', err);
          reject(err);
        });
    });
  },
  updateTeams(bodyRequest: object): Promise<unknown> {
    return new Promise((resolve, reject) => {
      apiClient
        .post(API_METHOD.MS_FOOTBALL.UPDATE_TEAMS, bodyRequest, {
          timeout: 10 * 1000,
        })
        .then(response => {
          resolve(response) as unknown;
        })
        .catch((err: Error) => {
          console.log('error ----CREATE0-TEAMS----', err);
          reject(err);
        });
    });
  },
  updateTeamsRequest(bodyRequest: object): Promise<unknown> {
    return new Promise((resolve, reject) => {
      apiClient
        .post(API_METHOD.MS_FOOTBALL.UPDATE_TEAMS_REQUEST, bodyRequest, {
          timeout: 10 * 1000,
        })
        .then(response => {
          resolve(response) as unknown;
        })
        .catch((err: Error) => {
          console.log('error ----UPDATE-TEAMS-REQUEST----', err);
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
