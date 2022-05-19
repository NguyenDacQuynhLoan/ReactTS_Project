import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import initialState from './initialState';
// interface IProduct {
//   name: string;
//   category:string;
//   brand:string; 
//   price: number;
//   numSales: number;
//   numViews: number;
//   quantity: number;
//   available: number;
//   imgArray:Array<any>;
//   isDeleted:boolean
// }
export const allProduct = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    getAllProducts(state = initialState, action: PayloadAction<any>) {
      return {
        inventory: [...action.payload],
      };
    },
  
  },
});

export const { getAllProducts } = allProduct.actions;
export default allProduct.reducer;
