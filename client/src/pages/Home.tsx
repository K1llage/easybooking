import React, { useEffect, useState } from "react";
import { Navbar, Footer, HeroSection, SectionHeader, ServiceCard } from "../components/common";
import { api } from "../api/api";
import { Service } from "../types";

export const Home: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await api.get("/services");
        setServices(response.data);
      } catch (err) {
        setError("Errore nel caricamento dei servizi");
      } finally {
        setLoading(false);
      }
    }

    fetchServices();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionHeader
          title="Servizi disponibili"
          subtitle="Scegli un servizio e procedi con la prenotazione."
        />

        {loading && (
          <p className="text-center text-gray-600 mt-8">Caricamento servizi...</p>
        )}

        {error && (
          <p className="text-center text-red-600 mt-8">{error}</p>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};