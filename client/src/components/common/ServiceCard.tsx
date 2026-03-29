import React from "react";
import { Service } from "../../types";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  service: Service;
  onSelect?: (service: Service) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onSelect }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 group">
      <div className="text-4xl mb-4">📅</div>

      <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>

      <p className="text-gray-600 mb-4 text-sm leading-relaxed">
        {service.description || "Nessuna descrizione disponibile"}
      </p>

      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">Duration</p>
          <p className="text-lg font-semibold text-gray-900">
            {service.durationMinutes} min
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Price</p>
          <p className="text-lg font-semibold text-blue-600">
            €{(service.priceCents / 100).toFixed(2)}
          </p>
        </div>
      </div>

      <Link
        to="/booking"
        onClick={() => onSelect?.(service)}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-center block"
      >
        Prenota
      </Link>
    </div>
  );
};