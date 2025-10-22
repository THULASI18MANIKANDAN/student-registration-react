import React, { useState } from 'react';
import InputField from './InputField';
import Button from './Button';

interface RegisterProps {
  onToggleView: () => void;
}

const Register: React.FC<RegisterProps> = ({ onToggleView }) => {
  const [fullName, setFullName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError("Passwords don't match!");
      return;
    }
    
    if (!fullName || !studentId || !email || !password) {
      setError("Please fill out all fields.");
      return;
    }

    try {
      const storedUsers = localStorage.getItem('student_portal_users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      const existingUser = users.find(
        (user: any) => user.email === email || user.studentId === studentId
      );

      if (existingUser) {
        setError('A user with this email or student ID already exists.');
        return;
      }

      // NOTE: In a real application, NEVER store passwords in plain text.
      // This is for demonstration purposes only.
      const newUser = { fullName, studentId, email, password };
      users.push(newUser);
      localStorage.setItem('student_portal_users', JSON.stringify(users));

      setSuccess('Registration successful! Redirecting to login...');

      setTimeout(() => {
          onToggleView();
      }, 2000);
    } catch (error) {
      console.error("Failed to register user", error);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">Create Account</h2>
      <p className="text-center text-gray-500 mb-8">Get started by filling out the form below.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          id="register-fullname"
          label="Full Name"
          type="text"
          placeholder="e.g., John Doe"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <InputField
          id="register-studentid"
          label="Student ID"
          type="text"
          placeholder="e.g., 202412345"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
        <InputField
          id="register-email"
          label="University Email"
          type="email"
          placeholder="e.g., user@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          id="register-password"
          label="Password"
          type="password"
          placeholder="Create a strong password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputField
          id="register-confirm-password"
          label="Confirm Password"
          type="password"
          placeholder="Re-enter your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && <p className="text-sm text-red-600 text-center">{error}</p>}
        {success && <p className="text-sm text-green-600 text-center">{success}</p>}
        <div className="pt-2">
            <Button type="submit">
                Create Account
            </Button>
        </div>
      </form>
      <p className="text-sm text-center text-gray-500 mt-6">
        Already have an account?{' '}
        <button onClick={onToggleView} className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition duration-150 ease-in-out">
          Sign in
        </button>
      </p>
    </div>
  );
};

export default Register;
