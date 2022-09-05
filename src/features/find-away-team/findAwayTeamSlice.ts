import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface typeProps {
  teamList: any;
  idTeam: string;
  status: string;
  contact: string;
  phone: string;
  pricePitch: string;
 // timeSlot: string;
  location: string;

  signal: boolean;
}
const initialState: typeProps = {
  teamList: [],
  idTeam: '',
  status: '',

  contact: '',
  phone: '',
  pricePitch: '',
 // timeSlot: '',
  location: '',

  signal: false,
};

const findAwayTeamSlice = createSlice({
  name: 'Cable-State',
  initialState,
  reducers: {
    setTeamListData: (state, action: PayloadAction<any>) => {
      state.teamList = action.payload;
    },
    setIdCableItem: (state, action: PayloadAction<string>) => {
      state.idTeam = action.payload;
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
    setContact: (state, action: PayloadAction<string>) => {
      state.contact = action.payload;
    },
    setPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },
    setPricePitch: (state, action: PayloadAction<string>) => {
      state.pricePitch = action.payload;
    },
    // setTimeSlot: (state, action: PayloadAction<string>) => {
    //   state.timeSlot = action.payload;
    // },
    setLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
    },
    setSignal: (state, action: PayloadAction<boolean>) => {
      state.signal = action.payload;
    },
  },
});
export const {
  setLocation,
  setSignal,
  setTeamListData,
  setIdCableItem,
  setStatus,
  setContact,
  setPhone,
  setPricePitch,
} = findAwayTeamSlice.actions;
export default findAwayTeamSlice.reducer;
