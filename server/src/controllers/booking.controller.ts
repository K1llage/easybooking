import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export async function createBooking(req: Request, res: Response) {
  try {
    const {
      serviceId,
      date,
      startTime,
      clientName,
      clientEmail,
      clientPhone,
      notes,
    } = req.body;

    if (!serviceId || !date || !startTime || !clientName || !clientEmail) {
      return res.status(400).json({
        error: "serviceId, date, startTime, clientName e clientEmail sono obbligatori",
      });
    }

    const service = await prisma.service.findUnique({
      where: { id: Number(serviceId) },
    });

    if (!service) {
      return res.status(404).json({ error: "Servizio non trovato" });
    }

    const bookingDate = new Date(date);
    const weekday = bookingDate.getDay();

    const rules = await prisma.availabilityRule.findMany({
      where: {
        weekday,
        isActive: true,
      },
      orderBy: { startTime: "asc" },
    });

    const validSlots: string[] = [];

    for (const rule of rules) {
      let current = timeToMinutes(rule.startTime);
      const end = timeToMinutes(rule.endTime);

      while (current + service.durationMinutes <= end) {
        validSlots.push(minutesToTime(current));
        current += service.durationMinutes;
      }
    }

    if (!validSlots.includes(startTime)) {
      return res.status(400).json({ error: "Slot non valido per questo servizio" });
    }

    const existingBooking = await prisma.booking.findFirst({
      where: {
        serviceId: Number(serviceId),
        bookingDate,
        startTime,
      },
    });

    if (existingBooking) {
      return res.status(409).json({ error: "Questo slot è già prenotato" });
    }

    const endTime = minutesToTime(
      timeToMinutes(startTime) + service.durationMinutes
    );

    const booking = await prisma.booking.create({
      data: {
        serviceId: Number(serviceId),
        clientName,
        clientEmail,
        clientPhone,
        notes,
        bookingDate,
        startTime,
        endTime,
        totalCents: service.priceCents,
        currency: "EUR",
      },
      include: {
        service: true,
      },
    });

    return res.status(201).json(booking);
  } catch (error) {
    console.error("Errore nella creazione booking:", error);
    return res.status(500).json({ error: "Errore nella creazione booking" });
  }
}

export async function getAdminBookings(req: Request, res: Response) {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        service: true,
        user: true,
      },
      orderBy: [
        { bookingDate: "asc" },
        { startTime: "asc" },
      ],
    });

    return res.json(bookings);
  } catch (error) {
    console.error("Errore nel recupero prenotazioni:", error);
    return res.status(500).json({ error: "Errore nel recupero prenotazioni" });
  }
}

export async function updateBookingStatus(req: Request, res: Response) {
  try {
    const bookingId = Number(req.params.id);
    const { status } = req.body;

    if (Number.isNaN(bookingId)) {
      return res.status(400).json({ error: "ID non valido" });
    }

    const allowedStatuses = ["PENDING", "CONFIRMED", "CANCELED", "COMPLETED"];

    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({
        error: "Status non valido",
      });
    }

    const existingBooking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!existingBooking) {
      return res.status(404).json({ error: "Prenotazione non trovata" });
    }

    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: { status },
      include: {
        service: true,
        user: true,
      },
    });

    return res.json(updatedBooking);
  } catch (error) {
    console.error("Errore aggiornamento stato booking:", error);
    return res.status(500).json({
      error: "Errore aggiornamento stato booking",
    });
  }
}

function timeToMinutes(time: string) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function minutesToTime(minutes: number) {
  const h = Math.floor(minutes / 60)
    .toString()
    .padStart(2, "0");
  const m = (minutes % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
}