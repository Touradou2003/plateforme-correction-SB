import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FormInput from '../FormInput';

describe('FormInput', () => {
  const defaultProps = {
    label: 'Test Input',
    name: 'testInput',
    type: 'text',
    value: '',
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders label correctly', () => {
    render(<FormInput {...defaultProps} />);
    expect(screen.getByLabelText(defaultProps.label)).toBeInTheDocument();
  });

  it('renders input with correct name and type', () => {
    render(<FormInput {...defaultProps} />);
    const input = screen.getByLabelText(defaultProps.label);
    expect(input).toHaveAttribute('name', defaultProps.name);
    expect(input).toHaveAttribute('type', defaultProps.type);
  });

  it('handles text input changes', () => {
    render(<FormInput {...defaultProps} />);
    const input = screen.getByLabelText(defaultProps.label);
    fireEvent.change(input, { target: { value: 'test value' } });
    expect(defaultProps.onChange).toHaveBeenCalledWith(expect.any(Object));
  });

  it('renders error message when provided', () => {
    const errorMessage = 'This field is required';
    render(<FormInput {...defaultProps} error={errorMessage} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('applies error styling when error is present', () => {
    render(<FormInput {...defaultProps} error="Error" />);
    const input = screen.getByLabelText(defaultProps.label);
    expect(input).toHaveClass('border-red-500');
  });

  it('renders with custom type', () => {
    render(<FormInput {...defaultProps} type="email" />);
    const input = screen.getByLabelText(defaultProps.label);
    expect(input).toHaveAttribute('type', 'email');
  });

  it('renders with placeholder', () => {
    const placeholder = 'Enter your text';
    render(<FormInput {...defaultProps} placeholder={placeholder} />);
    const input = screen.getByLabelText(defaultProps.label);
    expect(input).toHaveAttribute('placeholder', placeholder);
  });

  it('renders with required attribute', () => {
    render(<FormInput {...defaultProps} required />);
    const input = screen.getByLabelText(defaultProps.label);
    expect(input).toBeRequired();
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('renders with disabled state', () => {
    render(<FormInput {...defaultProps} disabled />);
    const input = screen.getByLabelText(defaultProps.label);
    expect(input).toBeDisabled();
  });

  it('renders with custom className', () => {
    const customClass = 'custom-class';
    render(<FormInput {...defaultProps} className={customClass} />);
    const container = screen.getByTestId('form-input-container');
    expect(container).toHaveClass(customClass);
  });
}); 