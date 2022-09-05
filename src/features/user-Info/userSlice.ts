import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import moment from 'moment';
import _ from 'lodash';
export interface typeProps {
  footballOrderData: any;
  historyOrderData: any;
  countOrder: number;
  teamListRequestData: any;
  countRequest: number;
  isStatusRequest: boolean;
}
const initialState: typeProps = {
  footballOrderData: [],
  historyOrderData: [],
  countOrder: 0,
  teamListRequestData: [],
  countRequest: 0,
  isStatusRequest: false,
};
const handleDataIsAfter = (data: any) => {
  const isSameOrAfterData = _.filter(data, o => {
    const today = moment().format('DD/MM/YYYY HH');
    let isAfter = moment(o.timeBooking, 'DD/MM/YYYY ').isSameOrAfter(
      moment(today, 'DD/MM/YYYY '),
    );
    if (isAfter) {
      const diff = moment(o.timeBooking, 'DD/MM/YYYY hh').diff(moment());
      console.log('dif---', diff);
      if (diff >= 0.3) {
        return o;
      }
      //  return o;
    }
  });
  return isSameOrAfterData;
};
const handleDataIsBefore = (data: any) => {
  const isSameOrBeforeData = _.filter(data, o => {
    const today = moment().format('DD/MM/YYYY HH');
    let isBefore = moment(o.timeBooking, 'DD/MM/YYYY').isSameOrBefore(
      moment(today, 'DD/MM/YYYY '),
    );
    if (isBefore) {
      const diff = moment(o.timeBooking, 'DD/MM/YYYY hh').diff(moment());
      if (diff < 0.3) {
        return o;
      }
      // return i;
    }
  });
  console.log('hh1', isSameOrBeforeData);
  return isSameOrBeforeData;
};
const userSlice = createSlice({
  name: 'user/data',
  initialState,
  reducers: {
    setFootballOrderData: (state, action: PayloadAction<any>) => {
      state.footballOrderData = handleDataIsAfter(action.payload);
    },
    setHistoryOrderData: (state, action: PayloadAction<any>) => {
      state.historyOrderData = handleDataIsBefore(action.payload);
    },
    setCountOrder: (state, action: PayloadAction<number>) => {
      state.countOrder = action.payload;
    },
    setTeamListRequestData: (state, action: PayloadAction<any>) => {
      state.teamListRequestData = action.payload;
    },
    setCountRequest: (state, action: PayloadAction<number>) => {
      state.countRequest = action.payload;
    },
    setIsStatusRequest: (state, action: PayloadAction<boolean>) => {
      state.isStatusRequest = action.payload;
    },
  },
});
export const {
  setCountRequest,
  setFootballOrderData,
  setHistoryOrderData,
  setCountOrder,
  setIsStatusRequest,
  setTeamListRequestData,
} = userSlice.actions;
export default userSlice.reducer;
