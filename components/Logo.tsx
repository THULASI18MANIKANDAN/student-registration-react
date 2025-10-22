
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center space-x-3">
        <svg
            className="w-12 h-12 text-indigo-600"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
        >
            <path d="M12 1.27l9 4.9v6.5c-1.25.97-2.73 1.5-4.25 1.5-3.04 0-5.5-2.46-5.5-5.5s2.46-5.5 5.5-5.5c.34 0 .68.03 1 .09V6.17l-6.75-3.68L3 6.17v9.66l9 4.9 9-4.9v-2.3c-.62.5-1.33.89-2.11 1.15L12 19.33l-7-3.81V6.17l7-3.81zM18.75 8c-2.07 0-3.75 1.68-3.75 3.75s1.68 3.75 3.75 3.75 3.75-1.68 3.75-3.75-1.68-3.75-3.75-3.75z" />
        </svg>
        <span className="text-3xl font-bold text-gray-800">Student Portal</span>
    </div>

  );
};

export default Logo;
