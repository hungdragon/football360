import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {FootballTime} from './FootballApi';

export interface typeProps {
  timeBooking: string;
  dayPitch: string;
  id: string;
  code: string;
  comment: string;
  //   codeDayNow:string;
  FootballTimeData: Array<FootballTime>;
  totalCustomer: string;
  timeSlot: string;
  PitchPrice: string;

  productServiceData: any;
  cocaData: any;
  bayUpData: any;
  reviveData: any;
  marData: any;

  statusPayment: string;

  codeNamePitch: string;
  idSlot: string;
  isSignFootball: boolean;
}
const initialState: typeProps = {
  timeBooking: '',
  dayPitch: '',
  comment: '',
  timeSlot: '',
  PitchPrice: '',

  id: '',
  code: '',
  ///   codeDayNow:'',
  FootballTimeData: [],
  totalCustomer: '',
  productServiceData: [],

  cocaData: [],
  bayUpData: [],
  reviveData: [],
  marData: [],

  statusPayment: '',
  codeNamePitch: '',
  idSlot: '',
  isSignFootball: false,
};

const FootballSlice = createSlice({
  name: 'Football-Information',
  initialState,
  reducers: {
    setTimeBooking: (state, action: PayloadAction<string>) => {
      console.log('l--', action.payload);
      state.timeBooking = action.payload;
    },
    setCode: (state, action: PayloadAction<string>) => {
      state.code = action.payload;
    },
    // setCodeDayNow:(state, action:PayloadAction<string>) =>{
    //     state.codeDayNow=action.payload;
    // },
    setFootballTimeList: (
      state,
      action: PayloadAction<Array<FootballTime>>,
    ) => {
      state.FootballTimeData = action.payload;
    },
    setId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    setDay: (state, action: PayloadAction<string>) => {
      console.log('xuong day r');
      state.dayPitch = action.payload;
    },
    setProductServiceData: (state, action: PayloadAction<any>) => {
      state.productServiceData = action.payload;
    },

    setCocaData: (state, action: PayloadAction<any>) => {
      state.cocaData = action.payload;
    },
    setBayUpData: (state, action: PayloadAction<any>) => {
      state.bayUpData = action.payload;
    },
    setReviveData: (state, action: PayloadAction<any>) => {
      state.reviveData = action.payload;
    },
    setMarData: (state, action: PayloadAction<any>) => {
      state.marData = action.payload;
    },
    setStatusPayment: (state, action: PayloadAction<string>) => {
      state.statusPayment = action.payload;
    },
    setTotalCustomer: (state, action: PayloadAction<string>) => {
      state.totalCustomer = action.payload;
    },
    setComment: (state, action: PayloadAction<string>) => {
      state.comment = action.payload;
    },
    setTimeSlot: (state, action: PayloadAction<string>) => {
      state.timeSlot = action.payload;
    },
    setPitchPrice: (state, action: PayloadAction<string>) => {
      state.PitchPrice = action.payload;
    },
    setCodeNamePitch: (state, action: PayloadAction<string>) => {
      state.codeNamePitch = action.payload;
    },
    setIdSlot: (state, action: PayloadAction<string>) => {
      state.idSlot = action.payload;
    },
    setIsSignFootball: (state, action: PayloadAction<boolean>) => {
      state.isSignFootball = action.payload;
    },
  },
});
export const {
  setTimeBooking,
  setTimeSlot,
  setPitchPrice,
  setCodeNamePitch,
  setCode,
  setFootballTimeList,
  setId,
  setTotalCustomer,
  setComment,
  setDay,
  setProductServiceData,
  setCocaData,
  setBayUpData,
  setReviveData,
  setMarData,
  setStatusPayment,
  setIdSlot,
  setIsSignFootball
} = FootballSlice.actions;
export default FootballSlice.reducer;
