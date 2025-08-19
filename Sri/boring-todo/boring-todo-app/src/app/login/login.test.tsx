import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';
import Login from './page';
import { authService } from '../services/auth';
import { AuthProvider } from '../context/AuthContext';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock auth service
jest.mock('../services/auth', () => ({
  authService: {
    login: jest.fn(),
    getStoredUser: jest.fn().mockReturnValue(null),
    storeUser: jest.fn(),
    clearStoredUser: jest.fn(),
    isAuthenticated: jest.fn().mockReturnValue(false),
  },
}));

const mockPush = jest.fn();
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

// Helper to render component with AuthProvider
const renderWithAuthProvider = (component: React.ReactElement) => {
  return render(<AuthProvider>{component}</AuthProvider>);
};

describe('Login Component', () => {
  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      push: mockPush,
    } as ReturnType<typeof useRouter>);
    jest.clearAllMocks();
  });

  it('renders login form', () => {
    renderWithAuthProvider(<Login />);
    
    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  it('shows error message on login failure', async () => {
    const mockAuthService = authService as jest.Mocked<typeof authService>;
    mockAuthService.login.mockRejectedValueOnce(new Error('Invalid credentials'));

    renderWithAuthProvider(<Login />);
    
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });
  });

  it('disables submit button when form is incomplete', () => {
    renderWithAuthProvider(<Login />);
    
    const submitButton = screen.getByRole('button', { name: 'Login' });
    expect(submitButton).toBeDisabled();

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    expect(submitButton).toBeDisabled();

    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password' } });
    expect(submitButton).not.toBeDisabled();
  });
});