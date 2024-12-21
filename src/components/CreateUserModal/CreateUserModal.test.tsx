import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { CreateUserModal } from "@/components";

describe("CreateUserModal", () => {
  const mockOnClose = jest.fn();
  const mockOnCreate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders when open", () => {
    render(
      <CreateUserModal
        open={true}
        onClose={mockOnClose}
        onCreate={mockOnCreate}
      />
    );

    expect(screen.getByText("Create New User")).toBeInTheDocument();
    expect(screen.getByLabelText("First Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Create")).toBeInTheDocument();
  });

  it("does not render when not open", () => {
    render(
      <CreateUserModal
        open={false}
        onClose={mockOnClose}
        onCreate={mockOnCreate}
      />
    );

    expect(screen.queryByText("Create New User")).not.toBeInTheDocument();
  });

  it("calls onClose when Cancel button is clicked", () => {
    render(
      <CreateUserModal
        open={true}
        onClose={mockOnClose}
        onCreate={mockOnCreate}
      />
    );

    fireEvent.click(screen.getByText("Cancel"));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("calls onCreate when Create button is clicked", () => {
    render(
      <CreateUserModal
        open={true}
        onClose={mockOnClose}
        onCreate={mockOnCreate}
      />
    );

    const firstNameInput = screen.getByLabelText("First Name");
    const lastNameInput = screen.getByLabelText("Last Name");
    const emailInput = screen.getByLabelText("Email");

    fireEvent.change(firstNameInput, { target: { value: "Vinicius" } });
    fireEvent.change(lastNameInput, { target: { value: "Lima" } });
    fireEvent.change(emailInput, {
      target: { value: "contato_viniciuslima@outlook.com" },
    });

    fireEvent.click(screen.getByText("Create"));

    expect(mockOnCreate).toHaveBeenCalledTimes(1);
    expect(mockOnCreate).toHaveBeenCalledWith({
      first_name: "Vinicius",
      last_name: "Lima",
      email: "contato_viniciuslima@outlook.com",
    });

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("resets fields after Create button is clicked", () => {
    render(
      <CreateUserModal
        open={true}
        onClose={mockOnClose}
        onCreate={mockOnCreate}
      />
    );

    const firstNameInput = screen.getByLabelText("First Name");
    const lastNameInput = screen.getByLabelText("Last Name");
    const emailInput = screen.getByLabelText("Email");

    fireEvent.change(firstNameInput, { target: { value: "Vinicius" } });
    fireEvent.change(lastNameInput, { target: { value: "Lima" } });
    fireEvent.change(emailInput, {
      target: { value: "contato_viniciuslima@outlook.com" },
    });

    fireEvent.click(screen.getByText("Create"));

    expect(firstNameInput).toHaveValue("");
    expect(lastNameInput).toHaveValue("");
    expect(emailInput).toHaveValue("");
  });
});
