import React from 'react';
import { TimeSlot } from '../../types/index';

interface TimeSlotListProps {
  timeSlots: TimeSlot[];
  onSelectSlot: (slot: TimeSlot) => void;
  selectedSlotId?: string;
}

export const TimeSlotList: React.FC<TimeSlotListProps> = ({
  timeSlots,
  onSelectSlot,
  selectedSlotId,
}) => {
  const availableSlots = timeSlots.filter((slot) => slot.available);
  const bookedSlots = timeSlots.filter((slot) => !slot.available);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Available Time Slots</h3>

      {availableSlots.length > 0 ? (
        <div className="space-y-3 mb-6">
          {availableSlots.map((slot) => (
            <button
              key={slot.id}
              onClick={() => onSelectSlot(slot)}
              className={`w-full p-4 rounded-lg border-2 transition font-semibold ${
                selectedSlotId === slot.id
                  ? 'border-blue-600 bg-blue-50 text-blue-600'
                  : 'border-gray-200 bg-white text-gray-900 hover:border-blue-300'
              }`}
            >
              {slot.startTime}
            </button>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-8 mb-6">No available slots</p>
      )}

      {bookedSlots.length > 0 && (
        <div>
          <p className="text-sm text-gray-600 font-semibold mb-3">Booked Slots</p>
          <div className="space-y-2">
            {bookedSlots.map((slot) => (
              <div
                key={slot.id}
                className="p-3 rounded-lg bg-gray-100 text-gray-500 text-center text-sm font-medium"
              >
                {slot.startTime}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
