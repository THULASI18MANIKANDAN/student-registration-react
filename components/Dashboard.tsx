import React from 'react';
import Button from './Button';
import Logo from './Logo';
import { User } from '../App';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-200 flex flex-col justify-center items-center p-4 selection:bg-indigo-500 selection:text-white">
      <div className="w-full max-w-md text-center">
        <div className="flex justify-center mb-8">
            <Logo />
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-2xl">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome, {user.fullName}!</h1>
            <p className="text-gray-600 mb-6">You have successfully logged into the portal.</p>
            <div className="text-left bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-2">
                <p className="text-sm font-medium text-gray-800">Student ID: <span className="font-normal text-gray-600 float-right">{user.studentId}</span></p>
                <p className="text-sm font-medium text-gray-800">Email: <span className="font-normal text-gray-600 float-right">{user.email}</span></p>
            </div>
            <div className="mt-8">
                <Button onClick={onLogout}>
                    Sign Out
                </Button>
            </div>
        </div>
        <p className="text-center text-sm text-gray-500 mt-6">
          &copy; {new Date().getFullYear()} University Portal. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
