import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  cart: Cookies.get("cart")
    ? JSON.parse(Cookies.get("cart"))
    : {
        cartItems: [],
        ShippingAddress: {},
        order: {},
        orders: [],
      },
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item.slug === newItem.slug
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      Cookies.set("cart", JSON.stringify({ ...state.cart, cartItems }));
      return { ...state, cart: { ...state.cart, cartItems } };
    },

    removeCartItem(state, action) {
      const cartItems = state.cart.cartItems.filter(
        (item) => item.slug !== action.payload.slug
      );
      Cookies.set("cart", JSON.stringify({ ...state.cart, cartItems }));
      return { ...state, cart: { ...state.cart, cartItems } };
    },

    saveShipping(state, action) {
      return {
        ...state,
        cart: {
          ...state.cart,
          ShippingAddress: {
            ...state.cart.ShippingAddress,
            ...action.payload,
          },
        },
      };
    },

    savePaymentMethod(state, action) {
      return {
        ...state,
        cart: {
          ...state.cart,
          paymentMethod: action.payload,
        },
      };
    },

    cart_Reset(state, action) {
      return {
        ...state,
        cart: {
          cartItems: [],
          ShippingAddress: {},
          paymentMethod: "",
        },
      };
    },

    clearCart(state) {
      return { ...state, cart: { ...state.cart, cartItems: [] } };
    },

    Fetch_request(state) {
      return { ...state, loading: true, error: "" };
    },

    Fetch_success(state, action) {
      return {
        ...state,
        loading: false,
        cart: {
          ...state.cart,
          order: action.payload,
        },

        error: "",
      };
    },

    Fetch_fail(state, action) {
      return { ...state, loading: false, error: action.payload };
    },

    Fetch_request1(state) {
      return { ...state, loading: true, error: "" };
    },

    Fetch_success1(state, action) {
      return {
        ...state,
        loading: false,
        cart: {
          ...state.cart,
          orders: action.payload,
        },

        error: "",
      };
    },

    pay_request(state, action) {
      return { ...state, loadingPay: true };
    },

    pay_success() {
      return { ...state, loadingPay: false, successPay: true };
    },

    pay_fail() {
      return { ...state, loadingPay: false, errorPay: action.payload };
    },

    pay_reset() {
      return { ...state, loadingPay: false, errorPay: "" };
    },

    Fetch_fail1(state, action) {
      return { ...state, loading: false, error: action.payload };
    },
  },
});

export const {
  addToCart,
  cartItems,
  removeCartItem,
  saveShipping,
  cart_Reset,
  ShippingAddress,
  paymentMethod,
  savePaymentMethod,
  clearCart,
  Fetch_request,
  Fetch_fail,
  Fetch_success,
  Fetch_request1,
  Fetch_fail1,
  Fetch_success1,
  pay_fail,
  pay_request,
  pay_reset,
  pay_success,
} = cartSlice.actions;

export default cartSlice.reducer;
