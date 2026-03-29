import React from 'react';
import { Link } from 'react-router-dom';

interface AdminSidebarProps {
  activeItem?: string;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeItem = 'dashboard' }) => {

  return (
    <aside className="w-64 bg-gray-900 text-white h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-6 border-b border-gray-800">
        <Link to="/admin-dashboard" className="flex items-center gap-2">
          <span className="text-2xl font-bold">📊</span>
          <span className="text-lg font-bold">EasyBooking Admin</span>
        </Link>
      </div>

      <nav className="space-y-2">
      <Link
        to="/admin-bookings"
        className={`flex items-center px-4 py-3 rounded-lg font-semibold transition ${
          activeItem === 'bookings'
            ? 'bg-blue-600 text-white'
            : 'text-gray-300 hover:bg-gray-700'
        }`}
      >
        📅 Prenotazioni
    </Link>
    </nav>

      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-800">
        <button
            onClick={() => {
              localStorage.removeItem('adminToken');
              window.location.href = '/admin-login';
            }}
            className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
          >
            Logout
      </button>
      </div>
    </aside>
  );
};
