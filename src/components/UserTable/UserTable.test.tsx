import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import UserTable from "@/components/UserTable";
import { User } from "@/store/user/types";

describe("UserTable", () => {
  const mockUsers: User[] = [
    {
      id: 1,
      first_name: "Vinicius",
      last_name: "Lima",
      email: "contato_viniciuslima@outlook.com",
      avatar: "https://example.com/avatar1.jpg",
    },
    {
      id: 2,
      first_name: "Vinicius 2",
      last_name: "Lima 2",
      email: "contatolimavinicius@gmail.com",
      avatar: "https://example.com/avatar2.jpg",
    },
  ];

  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders user data", () => {
    render(
      <UserTable
        users={mockUsers}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    mockUsers.forEach((user) => {
      expect(screen.getByText(user.first_name)).toBeInTheDocument();
      expect(screen.getByText(user.last_name)).toBeInTheDocument();
      expect(screen.getByText(user.email)).toBeInTheDocument();
    });
  });

  it("calls onEdit when edit button is clicked", () => {
    render(
      <UserTable
        users={mockUsers}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    const editButtons = screen.getAllByText("Edit");
    fireEvent.click(editButtons[0]);

    expect(mockOnEdit).toHaveBeenCalledTimes(1);
    expect(mockOnEdit).toHaveBeenCalledWith(mockUsers[0].id);
  });

  it("calls onDelete when delete button is clicked", () => {
    render(
      <UserTable
        users={mockUsers}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    const deleteButtons = screen.getAllByText("Delete");
    fireEvent.click(deleteButtons[1]);

    expect(mockOnDelete).toHaveBeenCalledTimes(1);
    expect(mockOnDelete).toHaveBeenCalledWith(mockUsers[1].id);
  });

  it("renders the rows", () => {
    render(
      <UserTable
        users={mockUsers}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    const rows = screen.getAllByRole("row");
    expect(rows.length).toBe(mockUsers.length + 1);
  });
});
