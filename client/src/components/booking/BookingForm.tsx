import React, { useEffect, useState } from 'react';
import { BookingFormData, Service } from '../../types/index';

interface BookingFormProps {
  service?: Service;
  selectedDate?: string;
  selectedTime?: string;
  onSubmit: (data: BookingFormData) => void;
  isLoading?: boolean;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  service,
  selectedDate,
  selectedTime,
  onSubmit,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<BookingFormData>({
    serviceId: service ? String(service.id) : '',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    date: selectedDate || '',
    time: selectedTime || '',
    notes: '',
  });

  useEffect(() => {
  setFormData((prev) => ({
    ...prev,
    serviceId: service ? String(service.id) : '',
    date: selectedDate || '',
    time: selectedTime || '',
  }));
  }, [service, selectedDate, selectedTime]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isComplete =
    formData.clientName &&
    formData.clientEmail &&
    formData.clientPhone &&
    formData.date &&
    formData.time;

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Dettagli prenotazione</h3>

      <div className="space-y-5">
        {/* Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Nome e cognome *
          </label>
          <input
            type="text"
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Indirizzo Email *
          </label>
          <input
            type="email"
            name="clientEmail"
            value={formData.clientEmail}
            onChange={handleChange}
            placeholder="john@example.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Numero di Telefono *
          </label>
          <input
            type="tel"
            name="clientPhone"
            value={formData.clientPhone}
            onChange={handleChange}
            placeholder="+1 555-0000"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Date and Time Display */}
        {selectedDate && selectedTime && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Data e ora selezionate</p>
            <p className="text-lg font-semibold text-blue-600">
              {new Date(selectedDate).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}{' '}
              at {selectedTime}
            </p>
          </div>
        )}

        {/* Notes */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Note Aggiuntive
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Any special requests or information we should know?"
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isComplete || isLoading}
          className="w-full mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Booking...' : 'Conferma Prenotazione'}
        </button>
      </div>

      {!selectedDate || !selectedTime ? (
        <p className="mt-4 text-sm text-gray-500 text-center">
          Seleziona un servizio, una data e un orario per completare la prenotazione.
        </p>
      ) : null}
    </form>
  );
};
