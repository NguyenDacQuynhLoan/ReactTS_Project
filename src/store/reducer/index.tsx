import { combineReducers } from '@reduxjs/toolkit';
import { cartSlice } from './cart';
import {userInfo} from './userInfo';
import { allProduct } from './inventory';
import { createInvoice } from './invoice';
import { createDelivery } from './invoice-address';

const rootReducer = combineReducers({
  cart: cartSlice.reducer,
  inventory:allProduct.reducer,
  invoice:createInvoice.reducer,
  userInfo:userInfo.reducer,
  delivery:createDelivery.reducer
});
export default rootReducer;
