import React from 'react';
import { useAuth } from '../AuthContext';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-gray-900 py-4 px-4 sm:px-6 lg:px-8 border-b border-gray-700">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
            <h1 className="text-3xl tracking-wider font-display uppercase">
                <span className="text-gray-100">Viewpoint</span>
                <span className="text-brand-teal">Find</span>
            </h1>
            {user && (
              <div className="flex items-center gap-4">
                <span className="text-gray-400 text-sm hidden sm:block">
                  Welcome, <span className="font-semibold text-gray-200">{user.username}</span>
                </span>
                <button
                  onClick={logout}
                  className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 text-sm"
                >
                  Logout
                </button>
              </div>
            )}
        </div>
      </div>
    </header>
  );
};
