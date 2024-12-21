/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pagination } from "@mui/material";
import styles from "./Pagination.module.scss";

const PaginationComponent = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (event: any, value: number) => void;
}) => (
  <Pagination
    count={totalPages}
    page={currentPage}
    onChange={onPageChange}
    color="primary"
    className={styles.pagination}
  />
);

export default PaginationComponent;
