import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../globals/types/types";
import type { CartState, CartItem } from "../globals/types/cartTypes";
import type { AppDispatch } from "./store";
import { APIAuthenticated } from "../http";

const initialState: CartState = {
  items: [],
  status: Status.LOADING,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItems(state: CartState, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
    },

    setStatus(state: CartState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
  },
});

export const { setItems, setStatus } = cartSlice.actions;
export default cartSlice.reducer;

export function addToCart(productId: string) {
  return async function addToCartThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.post("customer/cart", {
        productId,
        quantity: 1,
      });
      if (response.status === 200) {
        const { data } = response.data;
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setItems(data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error("Error adding products to cart:", error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}
