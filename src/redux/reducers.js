import { createReducer } from "@reduxjs/toolkit";

export var cartReducer = createReducer(
  {
    cartItems: [],
    subTotal: 0,
    shipping: 0,
    tax: 0,
    total: 0,
    couponType: "Percentage",
    couponAmount: 0,
    Discount: 0,
    coupon: ""
  },
  {
    addToCart: (state, action) => {
      var item = action.payload;
      var isItemExist = state.cartItems.find((i) => i.product.id === item.product.id);

      if (isItemExist) {
        var ind = state.cartItems.findIndex((i) => i.product.id === item.product.id);
        state.cartItems[ind].product.quantity++;
      } else {
        state.cartItems.push({ ...item });
      }
    },
    decrement: (state, action) => {
      var id = Number(action.payload);
      var ind = state.cartItems.findIndex((i) => i.product.id === Number(id));
      state.cartItems[ind].product.quantity--;
      if (state.cartItems[ind].product.quantity === 0) {
        state.cartItems.splice(ind, 1);
      }

    },
    deleteItem: (state, action) => {
      state.cartItems = state.cartItems.filter((i) => i.product.id !== action.payload);

    },
    addSize: (state, action) => {
      var { id, size } = action.payload
      var ind = state.cartItems.findIndex((i) => Number(i.product.id) === Number(id));
      if (ind !== -1) {
        state.cartItems[ind].size = Number(size);
      }
      localStorage.setItem(
        "connect_dot_merchandise_cart1",
        JSON.stringify(state)
      );
      localStorage.setItem("expire_time", JSON.stringify(Date.now()));
    },
    addCoupon: (state, action) => {
      var { coupon } = action.payload;
      state.couponType = coupon.discountType;
      state.couponAmount = coupon.discountAmount;
      state.coupon = coupon.Code;
    },
    addAddon: (state, action) => {
      var { id, name } = action.payload
      var ind = state.cartItems.findIndex((i) => Number(i.product.id) === Number(id));
      if (ind !== -1) {
        state.cartItems[ind].addon = name;
      }
      localStorage.setItem(
        "connect_dot_merchandise_cart1",
        JSON.stringify(state)
      );
      localStorage.setItem("expire_time", JSON.stringify(Date.now()));
    },
    calculatePrice: (state) => {
      let tp = 0;
      state.cartItems.forEach((item) => {
        let num = item.product.price * item.product.quantity
        tp += num;
        if (item.addon) {
          tp += 50 * item.product.quantity
        }
      });
      state.subTotal = tp;
      state.shipping = tp > 2000 ? 0 : 70;
      if (tp === 0) state.shipping = 0;
      var tax = 0;
      tax += Math.floor(0.05 * tp);
      state.tax = tax;
      var total = state.shipping + state.subTotal + state.tax;
      if (state.couponAmount !== 0) {
        if (state.couponType === "Percentage") {
          const disc = Math.floor((total * state.couponAmount) / 100)
          total = total - disc
          state.Discount = disc;

        }
        else {
          total = total - state.couponAmount;
          state.Discount = state.couponAmount;
        }
      }
      state.total = total;
      localStorage.setItem(
        "connect_dot_merchandise_cart1",
        JSON.stringify(state)
      );
      localStorage.setItem("expire_time", JSON.stringify(Date.now()));

    },
  }
);