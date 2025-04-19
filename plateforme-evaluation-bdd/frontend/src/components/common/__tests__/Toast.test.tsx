import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Toast } from '../Toast';

jest.useFakeTimers();

describe('Toast', () => {
  const defaultProps = {
    message: 'Test Toast',
    type: 'success' as const,
    isVisible: true,
    onClose: jest.fn(),
    duration: 3000,
  };

  it('renders correctly when visible', () => {
    render(<Toast {...defaultProps} />);
    expect(screen.getByText('Test Toast')).toBeInTheDocument();
  });

  it('does not render when not visible', () => {
    render(<Toast {...defaultProps} isVisible={false} />);
    expect(screen.queryByText('Test Toast')).not.toBeInTheDocument();
  });

  it('calls onClose after duration', async () => {
    render(<Toast {...defaultProps} />);
    jest.advanceTimersByTime(3000);
    await waitFor(() => {
      expect(defaultProps.onClose).toHaveBeenCalled();
    });
  });

  it('calls onClose when clicking the close button', () => {
    render(<Toast {...defaultProps} />);
    screen.getByRole('button').click();
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('applies correct styles based on type', () => {
    const { rerender } = render(<Toast {...defaultProps} type="success" />);
    expect(screen.getByTestId('toast')).toHaveClass('bg-green-100');

    rerender(<Toast {...defaultProps} type="error" />);
    expect(screen.getByTestId('toast')).toHaveClass('bg-red-100');

    rerender(<Toast {...defaultProps} type="warning" />);
    expect(screen.getByTestId('toast')).toHaveClass('bg-yellow-100');

    rerender(<Toast {...defaultProps} type="info" />);
    expect(screen.getByTestId('toast')).toHaveClass('bg-blue-100');
  });
}); 