import React from 'react';

export const Footer: React.FC = () => {

  return (
    <footer className="py-6 text-center text-gray-500 text-sm">
    © {new Date().getFullYear()} EasyBooking — Sistema di prenotazione
</footer>
                   
  );
};
