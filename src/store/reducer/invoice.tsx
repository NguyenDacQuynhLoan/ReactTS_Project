import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import initialState from './initialState';
interface IInvoice {
  amount: number;
  total: number;
  ship: number;
  totalBill: number;
}
export const createInvoice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    addToInvoice(state = initialState, action: PayloadAction<IInvoice>) {
        return {
            invoice : action.payload

        };
    },
    cleanInvoice(state = initialState, action:PayloadAction<boolean>){
      if(action.payload == true){
        state.invoice =[]
      }
    }
  },
});

export const { addToInvoice,cleanInvoice } = createInvoice.actions;
export default createInvoice.reducer;
