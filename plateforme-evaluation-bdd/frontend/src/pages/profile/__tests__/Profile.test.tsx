import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Profile } from '../Profile';
import FormInput from '../../../components/common/FormInput';
import { useAuth } from '../../../hooks/useAuth';
import { useNotification } from '../../../hooks/useNotification';

// Mock the hooks
jest.mock('../../../hooks/useAuth');
jest.mock('../../../hooks/useNotification');
jest.mock('../../../components/common/FormInput', () => ({
  FormInput: ({ label, type, value, onChange }: any) => (
    <input
      data-testid={`input-${label.toLowerCase()}`}
      type={type}
      value={value}
      onChange={onChange}
      aria-label={label}
    />
  ),
}));

describe('Profile Component', () => {
  const mockUser = {
    id: '1',
    email: 'test@example.com',
    firstName: 'John',
    lastName: 'Doe',
    role: 'Teacher',
  };

  const mockNotify = jest.fn();

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      user: mockUser,
      loading: false,
      error: null,
    });
    (useNotification as jest.Mock).mockReturnValue({
      notify: mockNotify,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading state when profile is not loaded', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      loading: true,
      error: null,
    });

    render(<Profile />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders user profile data correctly', () => {
    render(<Profile />);
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Doe')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('Teacher')).toBeInTheDocument();
  });

  it('allows editing profile information', async () => {
    render(<Profile />);
    
    // Click edit button
    fireEvent.click(screen.getByText('Edit'));

    // Fill in form fields
    const firstNameInput = screen.getByTestId('input-firstname');
    const lastNameInput = screen.getByTestId('input-lastname');
    const emailInput = screen.getByTestId('input-email');

    fireEvent.change(firstNameInput, { target: { value: 'Jane' } });
    fireEvent.change(lastNameInput, { target: { value: 'Smith' } });
    fireEvent.change(emailInput, { target: { value: 'jane.smith@example.com' } });

    // Submit form
    fireEvent.click(screen.getByText('Save Changes'));

    await waitFor(() => {
      expect(mockNotify).toHaveBeenCalledWith('Profile updated successfully', 'success');
    });
  });

  it('handles form submission errors', async () => {
    const mockError = new Error('Failed to update profile');
    (useAuth as jest.Mock).mockReturnValue({
      user: mockUser,
      loading: false,
      error: mockError,
    });

    render(<Profile />);
    
    fireEvent.click(screen.getByText('Edit'));
    fireEvent.click(screen.getByText('Save Changes'));

    await waitFor(() => {
      expect(mockNotify).toHaveBeenCalledWith('Failed to update profile', 'error');
    });
  });
}); 