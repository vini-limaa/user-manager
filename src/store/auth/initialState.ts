import { AuthInterface } from "./types";

const initialState: AuthInterface = {
  isAuthenticated: false,
  user: null,
  token: null,
  isLoading: true,
};

export default initialState;
