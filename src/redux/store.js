import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./reducers";

console.log(localStorage.getItem("connect_dot_merchandise_cart1"));

let initialState = {
  cart: localStorage.getItem("connect_dot_merchandise_cart1")
    ? JSON.parse(localStorage.getItem("connect_dot_merchandise_cart1"))
    : {
      cartItems: [],
      subTotal: 0,
      shipping: 0,
      tax: 0,
      total: 0,
      couponType: "Percentage",
      couponAmount: 0,
      Discount: 0,
      coupon: ""
    }
  ,
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: initialState,
});

export default store;