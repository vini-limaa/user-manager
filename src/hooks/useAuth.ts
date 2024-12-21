import {
  login as loginAction,
  logout as logoutAction,
  autoLogin as autoLoginAction,
} from "@/store/auth/authSlice";
import { useAppSelector, useAppDispatch } from "@/hooks";

const useAuth = () => {
  const authState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    return await dispatch(loginAction({ email, password }));
  };

  const logout = async () => {
    return await dispatch(logoutAction());
  };

  const autoLogin = async () => {
    return await dispatch(autoLoginAction());
  };

  const isLoggedIn = () => {
    const token = localStorage.getItem("token");

    if (token) {
      return true;
    }

    return false;
  };

  return {
    authState,
    login,
    logout,
    autoLogin,
    isLoggedIn,
  };
};

export default useAuth;
