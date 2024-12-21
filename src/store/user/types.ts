export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar?: string;
}

export interface UserState {
  users: User[];
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
}
