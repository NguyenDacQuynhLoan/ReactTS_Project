const initialState = {
  inventory: [],
  cart:  JSON.parse(localStorage.getItem('cart') || "[]"),
  invoice: [],
  filter: [],
  delivery:{},
  userInfo: JSON.parse(localStorage.getItem('role') || "{}"),
} as any;

export default initialState;
