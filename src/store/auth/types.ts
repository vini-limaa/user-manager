export interface User {
  email: string;
  first_name?: string;
  last_name?: string;
}

export interface AuthInterface {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  isLoading: boolean;
}
