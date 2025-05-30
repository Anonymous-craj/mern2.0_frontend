import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../globals/types/types";
import type { Product, ProductState } from "../globals/types/productTypes";
import type { AppDispatch, RootState } from "./store";
import { API } from "../http";

const initialState: ProductState = {
  product: [],
  status: Status.LOADING,
  singleProduct: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct(state: ProductState, action: PayloadAction<Product[]>) {
      state.product = action.payload;
    },
    setStatus(state: ProductState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setSingleProduct(state: ProductState, action: PayloadAction<Product>) {
      state.singleProduct = action.payload;
    },
  },
});

export const { setProduct, setStatus, setSingleProduct } = productSlice.actions;
export default productSlice.reducer;

export function fetchProducts() {
  return async function fetchProductsThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.get("admin/product");
      if (response.status === 200) {
        const { data } = response.data;
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setProduct(data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function fetchProductById(productId: string) {
  return async function fetchProductByIdThunk(
    dispatch: AppDispatch,
    getState: () => RootState
  ) {
    const state = getState();
    const existingProduct = state.products.product.find(
      (product: Product) => product.id === productId
    );
    if (existingProduct) {
      dispatch(setStatus(Status.SUCCESS));
      dispatch(setSingleProduct(existingProduct));
    } else {
      dispatch(setStatus(Status.LOADING));
      try {
        const response = await API.get(`admin/product/${productId}`);
        if (response.status === 200) {
          const { data } = response.data;
          dispatch(setStatus(Status.SUCCESS));
          dispatch(setSingleProduct(data));
        } else {
          dispatch(setStatus(Status.ERROR));
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
        dispatch(setStatus(Status.ERROR));
      }
    }
  };
}
