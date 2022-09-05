import {createSlice} from '@reduxjs/toolkit';

// Define a type for the slice state
interface DialogState {
  value: number;
  isShowDialog: boolean;
}

// Define the initial state using that type
const initialState: DialogState = {
  value: 0,
  isShowDialog: false,
};

export const dialogSlice = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    showDialog: state => {
      state.isShowDialog = true;
    },
    hideDialog: state => {
      state.isShowDialog = false;
    },
  },
});

export const {showDialog, hideDialog} = dialogSlice.actions;
export default dialogSlice.reducer;
