import { useAuth } from "@/hooks";
import { createAsyncThunk } from "@reduxjs/toolkit";

const fetchUsers = createAsyncThunk(
  "get",
  async (page: number, { rejectWithValue }) => {
    const { authState } = useAuth();
    try {
      const response = await fetch(`https://reqres.in/api/users?page=${page}`, {
        headers: {
          Authorization: `Bearer ${authState.token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      return {
        users: data.data,
        currentPage: data.page,
        totalPages: data.total_pages,
      };
    } catch (error) {
      return rejectWithValue(error.message || "Unexpected error occurred");
    }
  }
);

export default fetchUsers;
