import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch } from "./store";
import API from "../http";

interface User {
  username: string;
  email: string;
  password: string;
  token: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

export enum StatusData {
  Loading = "loading",
  Success = "success",
  Error = "error",
}

interface AuthState {
  user: User;
  status: StatusData;
}

const initialState: AuthState = {
  user: {} as User,
  status: StatusData.Loading,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state: AuthState, action: PayloadAction<User>) {
      state.user = action.payload;
    },

    setStatus(state: AuthState, action: PayloadAction<StatusData>) {
      state.status = action.payload;
    },
  },
});

export const { setUser, setStatus } = authSlice.actions;
export default authSlice.reducer;

export function register(data: RegisterData) {
  return async function registerThunk(dispatch: AppDispatch) {
    dispatch(setStatus(StatusData.Loading));
    try {
      const response = await API.post("register", data);
      if (response.status === 201) {
        dispatch(setStatus(StatusData.Success));
      } else {
        dispatch(setStatus(StatusData.Error));
      }
    } catch (error) {
      console.error("Register failed:", error);
      dispatch(setStatus(StatusData.Error));
    }
  };
}

export function login(data: LoginData) {
  return async function loginThunk(dispatch: AppDispatch) {
    dispatch(setStatus(StatusData.Loading));
    try {
      const response = await API.post("login", data);
      if (response.status === 200) {
        dispatch(setStatus(StatusData.Success));
      } else {
        dispatch(setStatus(StatusData.Error));
      }
    } catch (error) {
      console.error("Login failed:", error);
      dispatch(setStatus(StatusData.Error));
    }
  };
}
