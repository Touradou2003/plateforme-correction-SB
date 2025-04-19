import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store';
import Login from '../../pages/auth/Login';
import authService from '../../services/auth';

jest.mock('../../services/auth', () => ({
  __esModule: true,
  default: {
    login: jest.fn(),
  },
}));

describe('Auth Integration', () => {
  const renderWithProviders = (component: React.ReactElement) => {
    return render(
      <Provider store={store}>
        <MemoryRouter>{component}</MemoryRouter>
      </Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle successful login', async () => {
    (authService.login as jest.Mock).mockResolvedValueOnce({
      data: {
        user: {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'test@example.com',
          role: 'student',
          submissionsCount: 0,
          averageScore: 0,
        },
        token: 'test-token',
      },
    });

    renderWithProviders(<Login />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByText(/se connecter/i));

    await waitFor(() => {
      expect(authService.login).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });

    expect(localStorage.getItem('token')).toBe('test-token');
  });

  it('should handle login error', async () => {
    (authService.login as jest.Mock).mockRejectedValueOnce({
      response: { data: { message: 'Invalid credentials' } },
    });

    renderWithProviders(<Login />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'wrongpassword' },
    });

    fireEvent.click(screen.getByText(/se connecter/i));

    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });
});