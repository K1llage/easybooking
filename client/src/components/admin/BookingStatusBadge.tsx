import React from 'react';
import { Booking } from '../../types/index';

interface BookingStatusBadgeProps {
  status: Booking['status'];
  compact?: boolean;
}

export const BookingStatusBadge: React.FC<BookingStatusBadgeProps> = ({
  status,
  compact = false,
}) => {
  const statusConfig: Record<
    Booking['status'],
    { bg: string; text: string; label: string; icon: string }
  > = {
    PENDING: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      label: 'In attesa',
      icon: '⏳',
    },
    CONFIRMED: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      label: 'Confermata',
      icon: '✅',
    },
    COMPLETED: {
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      label: 'Completata',
      icon: '✓',
    },
    CANCELED: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      label: 'Annullata',
      icon: '✕',
    },
  };

  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full font-semibold text-sm ${config.bg} ${config.text}`}
    >
      {!compact && <span>{config.icon}</span>}
      {config.label}
    </span>
  );
};
