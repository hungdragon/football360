import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// Define a type for the slice state
interface LoginState {
  isChangeForm: boolean;
  fullName: string;
  phoneNumber: string;
}

// Define the initial state using that type
const initialState: LoginState = {
  isChangeForm: false,
  fullName: '',
  phoneNumber: '',
};

export const LoginSlice = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setIsChangeForm: (state, action: PayloadAction<boolean>) => {
      state.isChangeForm = action.payload;
    },
    setFullName: (state, action: PayloadAction<string>) => {
      state.fullName = action.payload;
    },
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload;
    },
  },
});

export const {setIsChangeForm, setFullName, setPhoneNumber} =
  LoginSlice.actions;
export default LoginSlice.reducer;
