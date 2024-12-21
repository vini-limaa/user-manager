import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PaginationComponent from "@/components/Pagination";

describe("PaginationComponent", () => {
  const mockOnPageChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with the correct number of pages", () => {
    render(
      <PaginationComponent
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("calls onPageChange when a page is clicked", () => {
    render(
      <PaginationComponent
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    fireEvent.click(screen.getByText("3"));
    expect(mockOnPageChange).toHaveBeenCalledTimes(1);
    expect(mockOnPageChange).toHaveBeenCalledWith(expect.anything(), 3);
  });

  it("disables navigation buttons when on the first or last page", () => {
    const { rerender } = render(
      <PaginationComponent
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    const prevButton = screen.getByLabelText("Go to previous page");
    const nextButton = screen.getByLabelText("Go to next page");

    expect(prevButton).toBeDisabled();
    expect(nextButton).not.toBeDisabled();

    rerender(
      <PaginationComponent
        currentPage={5}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    expect(prevButton).not.toBeDisabled();
    expect(nextButton).toBeDisabled();
  });
});
