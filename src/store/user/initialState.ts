import { UserState } from "./types";

const initialState: UserState = {
  users: [],
  currentPage: 1,
  totalPages: 1,
  isLoading: false,
  error: null,
};

export default initialState;
