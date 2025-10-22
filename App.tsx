import React, { useState, useCallback, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Logo from './components/Logo';
import Dashboard from './components/Dashboard';

// Define a User type for clarity
export interface User {
  fullName: string;
  studentId: string;
  email: string;
}

const App: React.FC = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Check for an active session on initial component mount
  useEffect(() => {
    try {
      const session = localStorage.getItem('student_portal_session');
      if (session) {
        const user = JSON.parse(session);
        setCurrentUser(user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Failed to parse session data from local storage", error);
      localStorage.removeItem('student_portal_session');
    }
  }, []);

  const toggleView = useCallback(() => {
    setIsLoginView(prev => !prev);
  }, []);

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    localStorage.setItem('student_portal_session', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('student_portal_session');
    setIsLoginView(true); // Go back to login screen on logout
  };

  if (isAuthenticated && currentUser) {
    return <Dashboard user={currentUser} onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-200 flex flex-col justify-center items-center p-4 selection:bg-indigo-500 selection:text-white">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-2xl transition-transform duration-500 transform hover:scale-105">
          {isLoginView ? (
            <Login onToggleView={toggleView} onLoginSuccess={handleLoginSuccess} />
          ) : (
            <Register onToggleView={toggleView} />
          )}
        </div>
        <p className="text-center text-sm text-gray-500 mt-6">
          &copy; {new Date().getFullYear()} University Portal. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default App;
