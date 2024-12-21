import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import UserEditModal from "@/components/UserEditModal";
import { User } from "@/store/user/types";

describe("UserEditModal", () => {
  const mockUser: User = {
    id: 1,
    first_name: "Vinicius",
    last_name: "Vinicius",
    email: "contato_viniciuslima@outlook.com",
    avatar: "https://example.com/avatar.jpg",
  };

  const mockOnClose = jest.fn();
  const mockOnSave = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with user data", () => {
    render(
      <UserEditModal
        open={true}
        onClose={mockOnClose}
        user={mockUser}
        onSave={mockOnSave}
      />
    );

    expect(screen.getByLabelText("First Name")).toHaveValue("Vinicius");
    expect(screen.getByLabelText("Last Name")).toHaveValue("Vinicius");
    expect(screen.getByLabelText("Email")).toHaveValue(
      "contato_viniciuslima@outlook.com"
    );
  });

  it("calls onClose when Cancel button is clicked", () => {
    render(
      <UserEditModal
        open={true}
        onClose={mockOnClose}
        user={mockUser}
        onSave={mockOnSave}
      />
    );

    fireEvent.click(screen.getByText("Cancel"));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("calls onSave with updated user data when save button is clicked", () => {
    render(
      <UserEditModal
        open={true}
        onClose={mockOnClose}
        user={mockUser}
        onSave={mockOnSave}
      />
    );

    fireEvent.change(screen.getByLabelText("First Name"), {
      target: { value: "Vinicius" },
    });
    fireEvent.change(screen.getByLabelText("Last Name"), {
      target: { value: "Lima" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "contato_viniciuslima@outlook.com" },
    });

    fireEvent.click(screen.getByText("Save"));

    expect(mockOnSave).toHaveBeenCalledWith({
      id: 1,
      first_name: "Vinicius",
      last_name: "Lima",
      email: "contato_viniciuslima@outlook.com",
      avatar: "https://example.com/avatar.jpg",
    });
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("updates fields when user prop changes", () => {
    const { rerender } = render(
      <UserEditModal
        open={true}
        onClose={mockOnClose}
        user={mockUser}
        onSave={mockOnSave}
      />
    );

    const updatedUser = {
      ...mockUser,
      first_name: "Vinicius",
      last_name: "Lima",
      email: "contato_viniciuslima@outlook.com",
    };

    rerender(
      <UserEditModal
        open={true}
        onClose={mockOnClose}
        user={updatedUser}
        onSave={mockOnSave}
      />
    );

    expect(screen.getByLabelText("First Name")).toHaveValue("Vinicius");
    expect(screen.getByLabelText("Last Name")).toHaveValue("Lima");
    expect(screen.getByLabelText("Email")).toHaveValue(
      "contato_viniciuslima@outlook.com"
    );
  });
});
