import { configureStore } from "@reduxjs/toolkit";
import authProvider from "./auth/authSlice";
import userProvider from "./user/userSlice";
import themeProvider from "./theme/themeSlice";

const store = configureStore({
  reducer: {
    auth: authProvider,
    users: userProvider,
    theme: themeProvider,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
