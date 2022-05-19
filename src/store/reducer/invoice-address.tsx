import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import initialState from './initialState';
// interface IDelivery {
//   userDelivery: string;
//   numberDelivery: string;
//   addressDelivery: string;
// }
export const createDelivery = createSlice({
  name: 'invoiceAdress',
  initialState,
  reducers: {
    addToDelivery(state = initialState, action: PayloadAction<any>) {
        return {
            delivery : action.payload
        };
    },
    cleanDelivery(state = initialState, action:PayloadAction<boolean>){
      if(action.payload == true){
        state.delivery ={}
      }
    }
  },
});

export const { addToDelivery,cleanDelivery } = createDelivery.actions;
export default createDelivery.reducer;
