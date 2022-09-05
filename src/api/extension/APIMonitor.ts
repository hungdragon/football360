import {ApiResponse} from 'apisauce';

export const logResponseMonitor = (response: ApiResponse<any>) => {
  console.log('RESPONSE = ', response);
  if (!response.ok) {
    console.log('RESPONSE PROBLEM = ', response.problem);
    console.log('RESPONSE ERROR = ', response.originalError);
  } else {
    console.log('RESPONSE DATA = ', response.data);
  }
  console.log('---------End Call API----------');
};
