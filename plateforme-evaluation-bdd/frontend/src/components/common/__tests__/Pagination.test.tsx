import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../Pagination';

describe('Pagination', () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 5,
    onPageChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders pagination buttons correctly', () => {
    render(<Pagination {...defaultProps} />);
    expect(screen.getByText('1')).toHaveClass('bg-indigo-600');
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('disables previous button on first page', () => {
    render(<Pagination {...defaultProps} />);
    const prevButton = screen.getByText('Précédent');
    expect(prevButton).toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(<Pagination {...defaultProps} currentPage={5} />);
    const nextButton = screen.getByText('Suivant');
    expect(nextButton).toBeDisabled();
  });

  it('calls onPageChange when clicking a page number', () => {
    render(<Pagination {...defaultProps} />);
    const pageButton = screen.getByText('2');
    fireEvent.click(pageButton);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange when clicking next button', () => {
    render(<Pagination {...defaultProps} />);
    const nextButton = screen.getByText('Suivant');
    fireEvent.click(nextButton);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange when clicking previous button', () => {
    render(<Pagination {...defaultProps} currentPage={2} />);
    const prevButton = screen.getByText('Précédent');
    fireEvent.click(prevButton);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(1);
  });

  it('highlights current page correctly', () => {
    render(<Pagination {...defaultProps} currentPage={3} />);
    expect(screen.getByText('3')).toHaveClass('bg-indigo-600');
    expect(screen.getByText('1')).not.toHaveClass('bg-indigo-600');
  });
});