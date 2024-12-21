import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserState } from "./types";
import initialState from "./initialState";
import { getReducer } from "./reducers";

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (
      state,
      action: PayloadAction<{
        users: User[];
        currentPage: number;
        totalPages: number;
      }>
    ) => {
      state.users = action.payload.users;
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
    },
    addUserReducer(state, action: PayloadAction<User>) {
      const newId = state.users.length + 1;

      state.users.unshift({
        id: newId,
        ...action.payload,
      });
    },
    updateUserReducer(state, action: PayloadAction<User>) {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    deleteUserReducer(state, action: PayloadAction<number>) {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReducer.pending, (state: UserState) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getReducer.fulfilled, (state: UserState, action) => {
        state.isLoading = false;
        state.users = action.payload.users;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getReducer.rejected, (state: UserState, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || "Failed to fetch users";
      });
  },
});

export const {
  setUsers,
  updateUserReducer,
  deleteUserReducer,
  addUserReducer,
} = userSlice.actions;
export default userSlice.reducer;
