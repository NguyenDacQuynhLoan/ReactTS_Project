import Invoice from '@/components/invoice';
import { IProduct } from '../../types/product';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import initialState from './initialState';

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state = initialState, action: PayloadAction<IProduct>) {
      let product = state.cart.find((element: any) => element.id == action.payload.id);
      if (!product) {
        state.cart.push(action.payload);
        localStorage.setItem('cart', JSON.stringify(state.cart));
      } else {
        let newCart = state.cart;
        console.log(newCart);

        let indexCart = newCart.findIndex((e: any) => e.id == action.payload.id);
        newCart[indexCart].quantity += 1;
        localStorage.setItem('cart', JSON.stringify(newCart));
      }
    },
    removeCart(state = initialState, action: PayloadAction<IProduct>) {
      let index = state.cart.findIndex((e: any) => e.id == action.payload.id);
      state.cart.splice(index, 1);
    },
    quantityCart(state = initialState, action: PayloadAction<any>) {
      state.cart[action.payload.id].quantity += action.payload.quantity;
    },
    quantityPlusCart(state = initialState, action: PayloadAction<number>) {
      // state.cart[action.payload].quantity += 1; //index
      // let newCart = state.cart
      // let temp = newCart.findIndex((e:any)=> e.id == ac)
    },
    quantityMinusCart(state = initialState, action: PayloadAction<number>) {
      state.cart[action.payload].quantity -= 1;
    },
    cleanCart(state = initialState, action: PayloadAction<any>) {
      if (action.payload == true) {
        state.cart = [];
      }
    },
  },
});

export const {
  addToCart,
  removeCart,
  quantityCart,
  quantityPlusCart,
  quantityMinusCart,
  cleanCart,
} = cartSlice.actions;
export default cartSlice.reducer;
