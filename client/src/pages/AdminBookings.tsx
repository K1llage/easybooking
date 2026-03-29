import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminSidebar, BookingTable, BookingStatusBadge } from '../components/admin';
import { getAdminBookings, updateBookingStatus } from '../api/api';
import { Booking } from '../types/index';

export const AdminBookings: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELED'>('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    navigate('/admin-login');
  }
  }, [navigate]);

  // Check if admin is authenticated
   const fetchBookings = async () => {
    const token = localStorage.getItem('adminToken');

    if (!token) {
      navigate('/admin-login');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response = await getAdminBookings(token);
      setBookings(response.data);
    } catch (error) {
      console.error('Errore caricamento bookings admin:', error);
      setError('Errore nel caricamento delle prenotazioni');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [navigate]);

  const filteredBookings =
  filter === 'all'
    ? bookings
    : bookings.filter((b) => b.status === filter);

  const stats = {
  total: bookings.length,
  pending: bookings.filter((b) => b.status === 'PENDING').length,
  confirmed: bookings.filter((b) => b.status === 'CONFIRMED').length,
  completed: bookings.filter((b) => b.status === 'COMPLETED').length,
  cancelled: bookings.filter((b) => b.status === 'CANCELED').length,
};

  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowDetails(true);
  };

  const handleCancelBooking = async (bookingId: string) => {
  if (!window.confirm('Sei sicuro di voler annullare questa prenotazione?')) {
    return;
  }

  await handleUpdateStatus(bookingId, 'CANCELED');
};

const handleUpdateStatus = async (bookingId: string, status: 'CONFIRMED' | 'COMPLETED' | 'CANCELED') => {
  const token = localStorage.getItem('adminToken');

  if (!token) {
    navigate('/admin-login');
    return;
  }

  try {
    await updateBookingStatus(Number(bookingId), status, token);
    await fetchBookings();
  } catch (error) {
    console.error('Errore aggiornamento stato booking:', error);
    alert('Errore durante l’aggiornamento dello stato');
  }
};

  return (
    <div className="flex gap-0">
      <AdminSidebar activeItem="bookings" />

      <div className="flex-1 ml-64 min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="px-8 py-6">
            <h1 className="text-3xl font-bold text-gray-900">Prenotazioni</h1>
            <p className="text-gray-600 mt-1">Gestisci tutte le tue prenotazioni di appuntamento</p>
          </div>
        </div>

        <div className="p-8">
          {/* Stats */}
          {loading && <p className="text-gray-600 mb-6">Caricamento prenotazioni...</p>}
          {error && <p className="text-red-600 mb-6">{error}</p>}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-md p-6">
              <p className="text-gray-600 text-sm font-semibold mb-2">Prenotazioni Totali</p>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <p className="text-yellow-600 text-sm font-semibold mb-2">In Attesa</p>
              <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <p className="text-green-600 text-sm font-semibold mb-2">Confermate</p>
              <p className="text-3xl font-bold text-green-600">{stats.confirmed}</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <p className="text-blue-600 text-sm font-semibold mb-2">Completate</p>
              <p className="text-3xl font-bold text-blue-600">{stats.completed}</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <p className="text-red-600 text-sm font-semibold mb-2">Annullate</p>
              <p className="text-3xl font-bold text-red-600">{stats.cancelled}</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Filtri</h2>
            <div className="flex flex-wrap gap-3">
              {(['all', 'PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELED'] as const).map(
                (status) => (
                  <button
                    key={status}
                    onClick={() => setFilter(status)}
                    className={`px-4 py-2 rounded-lg font-semibold transition ${
                      filter === status
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {status === 'all'
                        ? 'All'
                        : status.charAt(0) + status.slice(1).toLowerCase()}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Bookings Table */}
          <BookingTable
              bookings={filteredBookings}
              onViewDetails={handleViewDetails}
              onCancelBooking={handleCancelBooking}
              onConfirmBooking={(bookingId) => handleUpdateStatus(bookingId, 'CONFIRMED')}
              onCompleteBooking={(bookingId) => handleUpdateStatus(bookingId, 'COMPLETED')}
            />
        </div>

        {/* Details Modal */}
        {showDetails && selectedBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-96 overflow-y-auto p-8">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Dettagli della Prenotazione</h2>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-600 font-semibold mb-1">ID Prenotazione</p>
                    <p className="text-gray-900 font-mono">{selectedBooking.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-semibold mb-1">Stato</p>
                    <BookingStatusBadge status={selectedBooking.status} />
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-600 font-semibold mb-4">Informazioni sul Cliente</p>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Nome</p>
                      <p className="text-gray-900 font-medium">{selectedBooking.clientName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Email</p>
                      <p className="text-gray-900 font-medium">{selectedBooking.clientEmail}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Telefono</p>
                      <p className="text-gray-900 font-medium">{selectedBooking.clientPhone}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-600 font-semibold mb-4">Dettagli dell'Appuntamento</p>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Servizio</p>
                      <p className="text-gray-900 font-medium">
                        {selectedBooking.service?.title || 'Servizio non disponibile'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Data</p>
                      <p className="text-gray-900 font-medium">
                        {new Date(selectedBooking.bookingDate).toLocaleDateString('it-IT')}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Orario</p>
                      <p className="text-gray-900 font-medium">
                        {selectedBooking.startTime} - {selectedBooking.endTime}
                      </p>
                    </div>
                  </div>
                </div>

                {selectedBooking.notes && (
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-sm text-gray-600 font-semibold mb-2">Note</p>
                    <p className="text-gray-900">{selectedBooking.notes}</p>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-4 flex gap-3 justify-end">
                  <button
                    onClick={() => setShowDetails(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition font-semibold"
                  >
                    Close
                  </button>
                  {selectedBooking.status !== 'CANCELED' && selectedBooking.status !== 'COMPLETED' && (
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold">
                      Cancella Prenotazione
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
