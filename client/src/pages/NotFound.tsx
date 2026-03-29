import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Footer } from '../components/common';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow flex items-center justify-center px-4 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="text-8xl font-bold text-gray-200 mb-4">404</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Page Not Found</h1>
          <p className="text-xl text-gray-600 mb-8">
            Sorry, the page you're looking for doesn't exist.
          </p>
          <Link
            to="/"
            className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Back to Home
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};
