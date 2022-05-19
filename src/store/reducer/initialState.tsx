const initialState = {
  inventory: [],
  cart: [],
  invoice: [],
  filter: [],
  delivery:{},
  userInfo: JSON.parse(localStorage.getItem('role') || "{}"),
} as any;

export default initialState;
