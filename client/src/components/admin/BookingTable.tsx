import React from 'react';
import { Booking } from '../../types/index';
import { BookingStatusBadge } from './BookingStatusBadge';

interface BookingTableProps {
  bookings: Booking[];
  onViewDetails?: (booking: Booking) => void;
  onCancelBooking?: (bookingId: string) => void;
  onConfirmBooking?: (bookingId: string) => void;
  onCompleteBooking?: (bookingId: string) => void;
}

export const BookingTable: React.FC<BookingTableProps> = ({
  bookings,
  onViewDetails,
  onCancelBooking,
  onConfirmBooking,
  onCompleteBooking,
}) => {
  if (bookings.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-12 text-center">
        <p className="text-gray-500 text-lg">Nessuna prenotazione trovata</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Client
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Service
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Date & Time
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <div>
                    <p className="font-semibold text-gray-900">{booking.clientName}</p>
                    <p className="text-sm text-gray-600">{booking.clientEmail}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-900">
                  {booking.service?.title || 'Servizio non disponibile'}
                </td>
                <td className="px-6 py-4 text-gray-900">
                  <div>
                    <p className="font-medium">
                      {new Date(booking.bookingDate).toLocaleDateString('it-IT', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                    </p>
                    <p className="text-sm text-gray-600">
                      {booking.startTime} - {booking.endTime}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <BookingStatusBadge status={booking.status} />
                </td>
                <td className="px-6 py-4">
                    <div className="flex gap-3 flex-wrap">
                      <button
                        onClick={() => onViewDetails?.(booking)}
                        className="text-blue-600 hover:text-blue-800 font-semibold text-sm transition"
                      >
                        Dettagli
                      </button>

                      {booking.status === 'PENDING' && (
                        <button
                          onClick={() => onConfirmBooking?.(String(booking.id))}
                          className="text-green-600 hover:text-green-800 font-semibold text-sm transition"
                        >
                          Conferma
                        </button>
                      )}

                      {booking.status === 'CONFIRMED' && (
                        <button
                          onClick={() => onCompleteBooking?.(String(booking.id))}
                          className="text-indigo-600 hover:text-indigo-800 font-semibold text-sm transition"
                        >
                          Completa
                        </button>
                      )}

                      {booking.status !== 'CANCELED' && booking.status !== 'COMPLETED' && (
                        <button
                          onClick={() => onCancelBooking?.(String(booking.id))}
                          className="text-red-600 hover:text-red-800 font-semibold text-sm transition"
                        >
                          Annulla
                        </button>
                      )}
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
