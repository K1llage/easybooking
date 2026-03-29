import React from 'react';
import { Link } from 'react-router-dom';

export const HeroSection: React.FC = () => {
  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Prenota un appuntamento
              <span className="block text-blue-600">in pochi secondi</span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Seleziona un servizio, scegli la data e conferma il tuo slot disponibile.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/booking"
                className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-center"
              >
                Prenota ora
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="w-full h-96 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-xl flex items-center justify-center">
              <div className="text-white text-6xl">📅</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};