import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingSpinner from '../LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders with default size and color', () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toBeInTheDocument();
    expect(spinner.className).toContain('h-8 w-8');
    expect(spinner.className).toContain('text-blue-600');
    expect(spinner.className).toContain('animate-spin');
  });

  it('renders with small size', () => {
    render(<LoadingSpinner size="sm" />);
    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner.className).toContain('h-4 w-4');
  });

  it('renders with large size', () => {
    render(<LoadingSpinner size="lg" />);
    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner.className).toContain('h-12 w-12');
  });

  it('renders with custom color', () => {
    render(<LoadingSpinner color="text-red-600" />);
    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner.className).toContain('text-red-600');
  });

  it('has animation classes', () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner.className).toContain('animate-spin');
  });
}); 