import Invoice from '@/components/invoice';
import { IProduct } from '../../types/product';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import initialState from './initialState';

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state = initialState, action: PayloadAction<IProduct>) {
      state.cart.push(action.payload);
    },
    removeCart(state = initialState, action: PayloadAction<IProduct>) {
      let index = state.cart.findIndex((e: any) => e.id == action.payload.id);
      state.cart.splice(index, 1);
    },
    quantityCart(state = initialState, action: PayloadAction<any>) {
      console.log(action.payload);
      
      console.log(state.cart);
      state.cart[action.payload.id].quantity += action.payload.quantity
    },
    quantityPlusCart(state = initialState, action: PayloadAction<number>) {
      state.cart[action.payload].quantity += 1;
    },
    quantityMinusCart(state = initialState, action: PayloadAction<number>) {
      state.cart[action.payload].quantity -= 1;
    },
    cleanCart(state= initialState,action:PayloadAction<any>){
      if(action.payload == true){
        state.cart =[]
      }
    }
  },
});

export const { addToCart, removeCart,quantityCart, quantityPlusCart, quantityMinusCart,cleanCart } =
  cartSlice.actions;
export default cartSlice.reducer;
