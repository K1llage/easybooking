import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Navbar, Footer } from '../components/common';
import { BookingCalendar, TimeSlotList, BookingForm } from '../components/booking';
import { getServices, getAvailableSlots, createBooking } from '../api/api';
import { TimeSlot, BookingFormData, Service } from '../types/index';

export const Booking: React.FC = () => {
    const [searchParams] = useSearchParams();
  const initialServiceId = searchParams.get('service');

  const [services, setServices] = useState<Service[]>([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [servicesError, setServicesError] = useState('');

  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(
    initialServiceId ? Number(initialServiceId) : null
  );

  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError, setSlotsError] = useState('');

    useEffect(() => {
    async function fetchServices() {
      try {
        const response = await getServices();
        setServices(response.data);
      } catch (error) {
        setServicesError('Errore nel caricamento dei servizi');
      } finally {
        setServicesLoading(false);
      }
    }

    fetchServices();
  }, []);

  useEffect(() => {
    async function fetchSlots() {
      if (!selectedServiceId || !selectedDate) {
        setAvailableSlots([]);
        return;
      }

      try {
        setSlotsLoading(true);
        setSlotsError('');

        const response = await getAvailableSlots(selectedServiceId, selectedDate);

        const slotsFromApi: string[] = response.data;

        const mappedSlots: TimeSlot[] = slotsFromApi.map((time, index) => ({
          id: `${selectedDate}-${time}-${index}`,
          startTime: time,
          endTime: time, // temporaneo
          available: true,
          serviceId: String(selectedServiceId), // temporaneo
        }));
        setAvailableSlots(mappedSlots);
      } catch (error) {
        setSlotsError('Errore nel caricamento degli slot');
        setAvailableSlots([]);
      } finally {
        setSlotsLoading(false);
      }
    }

  fetchSlots();
}, [selectedServiceId, selectedDate]);

  const selectedService =
  services.find((s) => s.id === selectedServiceId);

  const handleSelectDate = (date: string) => {
    setSelectedDate(date);
    setSelectedSlot(null); // Reset selected slot when date changes
  };

  const handleSelectSlot = (slot: TimeSlot) => {
    setSelectedSlot(slot);
  };

  const handleSubmitBooking = async (data: BookingFormData) => {
  if (!selectedServiceId || !selectedDate || !selectedSlot) {
    return;
  }

  try {
    setIsSubmitting(true);

    await createBooking({
      serviceId: selectedServiceId,
      date: selectedDate,
      startTime: selectedSlot.startTime,
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      clientPhone: data.clientPhone,
      notes: data.notes,
    });

    setSubmitSuccess(true);
  } catch (error) {
    console.error('Errore nella creazione booking:', error);
    alert('Errore nella creazione della prenotazione');
  } finally {
    setIsSubmitting(false);
  }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Prenota un appuntamento</h1>
          <p className="text-xl text-blue-100">
            Seleziona il servizio, giorno, e orario che preferisci, e completa la tua prenotazione in pochi semplici passaggi.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!submitSuccess ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Calendar & Time Slots */}
            <div className="lg:col-span-2 space-y-8">
              {/* Service Selection */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Seleziona un servizio</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {servicesLoading ? (
                      <p className="text-gray-600">Caricamento servizi...</p>
                    ) : servicesError ? (
                      <p className="text-red-600">{servicesError}</p>
                    ) : (
                      services.map((service) => (
                        <button
                          key={service.id}
                          onClick={() => {
                              setSelectedServiceId(service.id);
                              setSelectedSlot(null);
                            }}
                          className={`p-4 rounded-lg border-2 transition text-left ${
                            selectedService?.id === service.id
                              ? 'border-blue-600 bg-blue-50'
                              : 'border-gray-200 bg-white hover:border-blue-300'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <span className="text-3xl">📅</span>
                            <div>
                              <h3 className="font-bold text-gray-900">{service.title}</h3>
                              <p className="text-sm text-gray-600">{service.durationMinutes} min</p>
                              <p className="text-sm font-semibold text-blue-600">
                                €{(service.priceCents / 100).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </button>
                      ))
                    )}
                </div>
              </div>

              {/* Calendar */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Seleziona una data</h2>
                <BookingCalendar
                  onSelectDate={handleSelectDate}
                  selectedDate={selectedDate}
                />
              </div>

              {/* Time Slots */}
              {selectedDate && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Seleziona un orario</h2>

                  {slotsLoading ? (
                    <p className="text-gray-600">Caricamento slot disponibili...</p>
                  ) : slotsError ? (
                    <p className="text-red-600">{slotsError}</p>
                  ) : availableSlots.length === 0 ? (
                    <p className="text-gray-600">Nessuno slot disponibile per questa data.</p>
                  ) : (
                    <TimeSlotList
                      timeSlots={availableSlots}
                      onSelectSlot={handleSelectSlot}
                      selectedSlotId={selectedSlot?.id}
                    />
                  )}
                </div>
              )}
            </div>

            {/* Right Column: Form */}
            <div className="lg:col-span-1">
              <BookingForm
                service={selectedService}
                selectedDate={selectedDate}
                selectedTime={selectedSlot?.startTime}
                onSubmit={handleSubmitBooking}
                isLoading={isSubmitting}
              />
            </div>
          </div>
        ) : (
          /* Success Message */
          <div className="max-w-md mx-auto">
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-8 text-center">
              <div className="text-6xl mb-4">✅</div>
              <h2 className="text-2xl font-bold text-green-900 mb-2">Prenotazione Confermata!</h2>
              <p className="text-green-700 mb-4">
                Il tuo appuntamento è stato prenotato con successo. Controlla la tua email per i dettagli di conferma.
              </p>
              <div className="space-y-2 mb-6 text-left bg-white p-4 rounded-lg">
                <p className="text-gray-600">
                  <span className="font-semibold">Servizio:</span> {selectedService?.title}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Data:</span>{' '}
                  {new Date(selectedDate).toLocaleDateString('it-IT', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Ora:</span> {selectedSlot?.startTime}
                </p>
              </div>
              <a
                href="/"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                Torna alla Home
              </a>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};
