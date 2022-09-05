import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import sortBy from 'lodash/sortBy';
import {PitchInfo} from './findPitchApi';
export interface findPitchProps {
  pitchName: string;
  codeName: string;
  idPitch: string;
  // codeName: string;
  // fullTimeSlot: string;
  location: string;
  // priceRange: string;
  // image: string;
  // rate: number;
  // title: string;
  // content: string;
  // imgArray: Array<any>;
  pitchs: Array<PitchInfo>;
  searchName: string;
}
const initialState: findPitchProps = {
  pitchName: '',
  codeName: '',
  idPitch: '',
  pitchs: [],
  location: '',
  searchName: '',
};
const SortUp = (data: any): any => {
  const dataCustomer = sortBy(data, [
    function (o) {
      return o.km;
    },
  ]);
  return [...dataCustomer];
};

const findPitchSlice = createSlice({
  name: 'FindPitchs',
  initialState,
  reducers: {
    setPitchData: (state, action: PayloadAction<any>) => {
      console.log('99999999--', action.payload);
      state.pitchs = SortUp(action.payload);
    },
    setPitchName: (state, action: PayloadAction<string>) => {
      state.pitchName = action.payload;
    },
    setCodeName: (state, action: PayloadAction<string>) => {
      state.codeName = action.payload;
    },
    setIdPitch: (state, action: PayloadAction<string>) => {
      state.idPitch = action.payload;
    },
    setLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
    },
    setSearchName: (state, action: PayloadAction<string>) => {
      console.log('99999999--');
      state.searchName = action.payload;
    },
  },
});
export const {
  setPitchData,
  setPitchName,
  setCodeName,
  setIdPitch,
  setLocation,
  setSearchName
} = findPitchSlice.actions;
export default findPitchSlice.reducer;
