import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Footer } from '../components/common';
import { adminLogin } from '../api/api';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    navigate('/admin-bookings');
  }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  setIsLoading(true);

  try {
    const response = await adminLogin({ email, password });
    const token = response.data.token;

    localStorage.setItem('adminToken', token);
    navigate('/admin-bookings');
  } catch (error: any) {
    const message =
      error?.response?.data?.error || 'Login fallito. Controlla email e password.';
    setError(message);
  } finally {
    setIsLoading(false);
  }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      <Navbar />

      <div className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="text-4xl font-bold mb-2">📊</div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Area amministratore</h1>
              <p className="text-gray-600">Gestisci i tuoi appuntamenti e prenotazioni</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Indirizzo email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Remember Me */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                  Ricordami
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            {/* Demo Info */}
            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900 font-semibold mb-2">Credenziali admin:</p>
              <p className="text-sm text-blue-800">
                Email: <span className="font-mono">admin@test.com</span>
              </p>
              <p className="text-sm text-blue-800">
                Password: <span className="font-mono">admin123</span>
              </p>
            </div>

            {/* Footer Links */}
            <div className="mt-6 text-center space-y-2">
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 block">
                Hai dimenticato la password?
              </a>
              <a href="/" className="text-sm text-gray-600 hover:text-gray-700 block">
                Torna alla Home
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
