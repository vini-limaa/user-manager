/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./types";
import initialState from "./initialState";
import { loginReducer } from "./reducers";

const login =
  ({ email, password }: { email: string; password: string }) =>
  async (dispatch) => {
    await dispatch(loginReducer({ email, password }));
  };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      state.isLoading = false;
    },
    autoLogin: (state) => {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");

      if (user) {
        state.isAuthenticated = true;
        state.user = {
          email: user?.email,
          first_name: user?.email,
          last_name: "",
        };

        state.token = token;
        state.isLoading = false;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginReducer.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      loginReducer.fulfilled,
      (state, action: PayloadAction<{ token: string; user: User }> & any) => {
        state.isAuthenticated = true;
        const { email } = action.meta.arg;
        state.user = { email: email, first_name: email, last_name: "" };
        state.token = action.payload.token;

        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      }
    );
    builder.addCase(loginReducer.rejected, (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;

      throw new Error("User not found");
    });
  },
});

export { login };

export const { logout, autoLogin } = authSlice.actions;
export default authSlice.reducer;
