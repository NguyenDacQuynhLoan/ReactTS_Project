import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import initialState from './initialState';

export const userInfo = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    addUserInfo(state = initialState, action: PayloadAction<any>) {
      localStorage.setItem('role', JSON.stringify(action.payload));
      return {
        userInfo : action.payload
      };
    },
    cleanUserInfo(state = initialState, action: PayloadAction<boolean>) {
      console.log(action.payload );
      
      if (action.payload == true) {
        state.userInfo="";
      }
    },
  },
});

export const { addUserInfo, cleanUserInfo } = userInfo.actions;
export default userInfo.reducer;
