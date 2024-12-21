import { useState, useEffect } from "react";
import { UserEditModal, CreateUserModal, Auth } from "@/components";
import { useUsers } from "@/hooks";
import {
  DashboardHeader,
  PaginationComponent,
  Toolbar,
  UserTable,
} from "@/components";
import styles from "./dashboard.module.scss";

import { Container } from "@mui/material";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

const Dashboard = ({ users, currentPage, totalPages }) => {
  const { userState, updateUsers, updateUser, deleteUser, addUser } =
    useUsers();
  const router = useRouter();

  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    updateUsers({ users, currentPage, totalPages });
  }, [users, currentPage, totalPages]);

  const handlePageChange = (event, value) => {
    if (value !== currentPage) {
      router.push(`/dashboard/${value}`);
    }
  };

  const handleEdit = (userId) => {
    const user = userState?.users?.find((u) => u.id === userId);
    if (user) {
      setSelectedUser(user);
      setIsModalOpen(true);
    }
  };

  const handleSave = (updatedUser) => {
    updateUser(updatedUser);
    setIsModalOpen(false);
  };

  const handleDelete = (userId) => {
    deleteUser(userId);
  };

  const handleCreate = (newUser) => {
    addUser(newUser);
    setIsCreateModalOpen(false);
  };

  return (
    <Auth>
      <Container maxWidth="lg" className={styles.dashboard}>
        <DashboardHeader />
        <Toolbar onCreate={() => setIsCreateModalOpen(true)} />
        <UserTable
          users={userState?.users}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
        {selectedUser && (
          <UserEditModal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            user={selectedUser}
            onSave={handleSave}
          />
        )}
        <CreateUserModal
          open={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onCreate={handleCreate}
        />
      </Container>
    </Auth>
  );
};

export default Dashboard;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = context.params?.page || 1;
  const response = await fetch(`https://reqres.in/api/users?page=${page}`);
  const data = await response.json();

  if (Number(page) < 1 || isNaN(Number(page))) {
    return {
      redirect: {
        destination: "/dashboard/1",
        permanent: false,
      },
    };
  }

  return {
    props: {
      users: data.data,
      currentPage: data.page,
      totalPages: data.total_pages,
    },
  };
};
