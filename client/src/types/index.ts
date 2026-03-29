
export interface Service {
  id: number;
  title: string;
  description?: string;
  durationMinutes: number;
  priceCents: number;
  isActive: boolean;
}

export interface TimeSlot {
  id: string;
  startTime: string; // HH:mm format
  endTime: string;
  available: boolean;
  serviceId: string;
}

export interface Booking {
  id: number;
  userId: number | null;
  serviceId: number;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  notes?: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELED';
  totalCents: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
  service?: {
    id: number;
    title: string;
    description?: string;
    durationMinutes: number;
    priceCents: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
  user?: unknown;
}

export interface AvailabilitySlot {
  date: string;
  timeSlots: TimeSlot[];
}

export interface BookingFormData {
  serviceId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  date: string;
  time: string;
  notes?: string;
}
