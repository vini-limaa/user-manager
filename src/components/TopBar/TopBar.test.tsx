import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TopBar from "@/components/TopBar";
import { useAuth, useTheme } from "@/hooks";

jest.mock("@/hooks", () => ({
  useAuth: jest.fn(),
  useTheme: jest.fn(),
}));

jest.mock("@mui/icons-material/DarkMode", () => () => <div>DarkModeIcon</div>);
jest.mock("@mui/icons-material/LightMode", () => () => (
  <div>LightModeIcon</div>
));

describe("TopBar", () => {
  const mockLogout = jest.fn();
  const mockToggleTheme = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({
      logout: mockLogout,
    });
    (useTheme as jest.Mock).mockReturnValue({
      themeState: { mode: "light" },
      toggleTheme: mockToggleTheme,
    });
  });

  it("renders with light theme", () => {
    render(<TopBar />);

    expect(screen.getByText("DarkModeIcon")).toBeInTheDocument();
  });

  it("renders with dark theme", () => {
    (useTheme as jest.Mock).mockReturnValueOnce({
      themeState: { mode: "dark" },
      toggleTheme: mockToggleTheme,
    });

    render(<TopBar />);

    expect(screen.getByText("LightModeIcon")).toBeInTheDocument();
  });

  it("calls toggleTheme when theme button is clicked", () => {
    render(<TopBar />);

    const themeToggleButton = screen.getByLabelText("Toggle theme");
    fireEvent.click(themeToggleButton);

    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });

  it("calls logout when logout button is clicked", () => {
    render(<TopBar />);

    const logoutButton = screen.getByRole("button", { name: /logout/i });
    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});
