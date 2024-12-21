import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Button,
} from "@mui/material";
import styles from "./UserTable.module.scss";
import { User } from "@/store/user/types";

const UserTable = ({
  users,
  onEdit,
  onDelete,
}: {
  users: User[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}) => (
  <TableContainer component={Paper} className={styles.userTable}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Avatar</TableCell>
          <TableCell>First Name</TableCell>
          <TableCell>Last Name</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.id}</TableCell>
            <TableCell>
              <Avatar
                src={user.avatar}
                alt={`${user.first_name} ${user.last_name}`}
                className={styles.avatar}
              />
            </TableCell>
            <TableCell>{user.first_name}</TableCell>
            <TableCell>{user.last_name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell className={styles.actions}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => onEdit(user.id)}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => onDelete(user.id)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default UserTable;
