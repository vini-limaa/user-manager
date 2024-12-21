import { useAppSelector, useAppDispatch } from "@/hooks";
import {
  setUsers,
  updateUserReducer,
  deleteUserReducer,
  addUserReducer,
} from "@/store/user/userSlice";

const useUsers = () => {
  const userState = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  const updateUsers = ({ users, currentPage, totalPages }) => {
    dispatch(setUsers({ users, currentPage, totalPages }));
  };

  const updateUser = (user) => {
    dispatch(updateUserReducer(user));
  };
  const deleteUser = (user) => {
    dispatch(deleteUserReducer(user));
  };

  const addUser = (user) => {
    dispatch(
      addUserReducer({
        ...user,
        avatar: "https://reqres.in/img/faces/1-image.jpg",
      })
    );
  };

  return {
    userState,
    updateUsers,
    updateUser,
    deleteUser,
    addUser,
  };
};

export default useUsers;
