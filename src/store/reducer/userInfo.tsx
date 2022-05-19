import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import initialState from './initialState';

export const userInfo = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    addUserInfo(state = initialState, action: PayloadAction<any>) {
      localStorage.setItem('role', JSON.stringify(action.payload));
      console.log(action.payload);
      
      return {
        userInfo: action.payload,
      };
    },
  },
});

export const { addUserInfo } = userInfo.actions;
export default userInfo.reducer;
