import { render } from "@testing-library/react";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks";
import ProtectedRoute from "@/components/Auth";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/hooks", () => ({
  useAuth: jest.fn(),
}));

jest.mock("@/components", () => ({
  Loading: jest.fn(() => <div>Loading...</div>),
}));

describe("ProtectedRoute", () => {
  const mockRouterPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush,
    });
  });

  it("redirects to login page if user is not authenticated", () => {
    (useAuth as jest.Mock).mockReturnValue({
      authState: { isAuthenticated: false, isLoading: false },
      isLoggedIn: jest.fn(() => false),
      autoLogin: jest.fn(),
    });

    const { queryByText } = render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    );

    expect(mockRouterPush).toHaveBeenCalledWith("/");
    expect(queryByText("Protected Content")).not.toBeInTheDocument();
  });

  it("renders the loading component while loading", () => {
    (useAuth as jest.Mock).mockReturnValue({
      authState: { isAuthenticated: false, isLoading: true },
      isLoggedIn: jest.fn(() => false),
      autoLogin: jest.fn(),
    });

    const { getByText } = render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    );

    expect(getByText("Loading...")).toBeInTheDocument();
  });

  it("renders when user is authenticated", () => {
    (useAuth as jest.Mock).mockReturnValue({
      authState: { isAuthenticated: true, isLoading: false },
      isLoggedIn: jest.fn(() => true),
      autoLogin: jest.fn(),
    });

    const { getByText } = render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    );

    expect(getByText("Protected Content")).toBeInTheDocument();
    expect(mockRouterPush).not.toHaveBeenCalled();
  });
});
