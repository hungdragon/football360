import {createSlice, PayloadAction} from '@reduxjs/toolkit';
export interface typeProps {
  imgArray: Array<any>;
}
const initialState: typeProps = {
  imgArray: [],
};
const managerSlice = createSlice({
  name: 'managerState',
  initialState,
  reducers: {
    setImgArray: (state, action: PayloadAction<any>) => {
      state.imgArray = action.payload;
    },
  },
});
export const {setImgArray} = managerSlice.actions;
export default managerSlice.reducer;
