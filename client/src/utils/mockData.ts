import { Service, Booking, TimeSlot } from '../types/index';

export const mockServices: Service[] = [
  {
    id: 'service-1',
    name: 'Initial Consultation',
    description: 'Get to know our professionals and discuss your needs in detail',
    duration: 60,
    price: 0,
    image: '🎯',
  },
  {
    id: 'service-2',
    name: 'Standard Session',
    description: 'Full session with detailed attention and personalized service',
    duration: 60,
    price: 75,
    image: '⭐',
  },
  {
    id: 'service-3',
    name: 'Premium Session',
    description: 'Extended session with priority booking and premium support',
    duration: 90,
    price: 120,
    image: '👑',
  },
  {
    id: 'service-4',
    name: 'Package Plan',
    description: '5 sessions bundle with exclusive benefits',
    duration: 60,
    price: 325,
    image: '📦',
  },
];

export const mockTimeSlots: TimeSlot[] = [
  { id: 'slot-1', startTime: '09:00', endTime: '10:00', available: true, serviceId: 'service-1' },
  { id: 'slot-2', startTime: '10:00', endTime: '11:00', available: true, serviceId: 'service-1' },
  { id: 'slot-3', startTime: '11:00', endTime: '12:00', available: false, serviceId: 'service-1' },
  { id: 'slot-4', startTime: '13:00', endTime: '14:00', available: true, serviceId: 'service-1' },
  { id: 'slot-5', startTime: '14:00', endTime: '15:00', available: true, serviceId: 'service-1' },
  { id: 'slot-6', startTime: '15:00', endTime: '16:00', available: false, serviceId: 'service-1' },
  { id: 'slot-7', startTime: '16:00', endTime: '17:00', available: true, serviceId: 'service-1' },
];

export const mockBookings: Booking[] = [
  {
    id: 'booking-1',
    serviceId: 'service-2',
    serviceName: 'Standard Session',
    clientName: 'John Doe',
    clientEmail: 'john@example.com',
    clientPhone: '+1 555-0101',
    date: '2024-03-25',
    startTime: '10:00',
    endTime: '11:00',
    status: 'confirmed',
    notes: 'First time client, needs introduction',
    createdAt: '2024-03-20T14:30:00Z',
  },
  {
    id: 'booking-2',
    serviceId: 'service-3',
    serviceName: 'Premium Session',
    clientName: 'Alice Smith',
    clientEmail: 'alice@example.com',
    clientPhone: '+1 555-0102',
    date: '2024-03-26',
    startTime: '14:00',
    endTime: '15:30',
    status: 'confirmed',
    createdAt: '2024-03-20T09:15:00Z',
  },
  {
    id: 'booking-3',
    serviceId: 'service-2',
    serviceName: 'Standard Session',
    clientName: 'Bob Wilson',
    clientEmail: 'bob@example.com',
    clientPhone: '+1 555-0103',
    date: '2024-03-27',
    startTime: '09:00',
    endTime: '10:00',
    status: 'pending',
    createdAt: '2024-03-20T16:45:00Z',
  },
  {
    id: 'booking-4',
    serviceId: 'service-1',
    serviceName: 'Initial Consultation',
    clientName: 'Carol Davis',
    clientEmail: 'carol@example.com',
    clientPhone: '+1 555-0104',
    date: '2024-03-24',
    startTime: '15:00',
    endTime: '16:00',
    status: 'completed',
    createdAt: '2024-03-15T10:00:00Z',
  },
  {
    id: 'booking-5',
    serviceId: 'service-3',
    serviceName: 'Premium Session',
    clientName: 'David Miller',
    clientEmail: 'david@example.com',
    clientPhone: '+1 555-0105',
    date: '2024-03-25',
    startTime: '16:00',
    endTime: '17:30',
    status: 'cancelled',
    createdAt: '2024-03-18T11:20:00Z',
  },
];

export const getAvailableSlots = (date: string): TimeSlot[] => {
  // In a real app, this would fetch from an API
  return mockTimeSlots.filter((slot) => slot.available);
};

export const getBookingsByStatus = (status: Booking['status']): Booking[] => {
  return mockBookings.filter((booking) => booking.status === status);
};
