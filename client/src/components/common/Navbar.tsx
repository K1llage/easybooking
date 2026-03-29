import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              EasyBooking
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition">
              Home
            </Link>
            <Link to="/booking" className="text-gray-700 hover:text-blue-600 transition">
              Prenota
            </Link>
            <Link
              to="/admin-login"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Admin
            </Link>
          </div>

          <div className="md:hidden">
            <button className="text-gray-700 hover:text-blue-600">☰</button>
          </div>
        </div>
      </div>
    </nav>
  );
};
