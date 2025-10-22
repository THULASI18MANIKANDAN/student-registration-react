import React, { useState } from 'react';
import InputField from './InputField';
import Button from './Button';
import { User } from '../App';

interface LoginProps {
  onToggleView: () => void;
  onLoginSuccess: (user: User) => void;
}

// User with password for internal validation
type UserAuth = User & { password?: string };

const Login: React.FC<LoginProps> = ({ onToggleView, onLoginSuccess }) => {
  const [identifier, setIdentifier] = useState(''); // Can be email or student ID
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!identifier || !password) {
      setError('Please enter your credentials.');
      return;
    }

    try {
      const storedUsers = localStorage.getItem('student_portal_users');
      const users: UserAuth[] = storedUsers ? JSON.parse(storedUsers) : [];

      const user = users.find(
        u => (u.email === identifier || u.studentId === identifier) && u.password === password
      );

      if (user) {
        const { password: _, ...userToAuth } = user;
        onLoginSuccess(userToAuth);
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error("Failed to process login", error);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">Welcome Back!</h2>
      <p className="text-center text-gray-500 mb-8">Sign in to access your portal.</p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          id="login-identifier"
          label="Email or Student ID"
          type="text"
          placeholder="e.g., 202412345 or user@gmail.com"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />
        <InputField
          id="login-password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-sm text-red-600 text-center -mt-2">{error}</p>}
        <div className="flex items-center justify-between">
            <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
            </a>
        </div>
        <Button type="submit">
          Sign In
        </Button>
      </form>
      <p className="text-sm text-center text-gray-500 mt-6">
        Don't have an account?{' '}
        <button onClick={onToggleView} className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition duration-150 ease-in-out">
          Register here
        </button>
      </p>
    </div>
  );
};

export default Login;
