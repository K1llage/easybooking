import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export async function getAvailableSlots(req: Request, res: Response) {
  try {
    const { serviceId, date } = req.query;

    if (!serviceId || !date) {
      return res.status(400).json({
        error: "serviceId e date sono obbligatori",
      });
    }

    const service = await prisma.service.findUnique({
      where: { id: Number(serviceId) },
    });

    if (!service) {
      return res.status(404).json({ error: "Servizio non trovato" });
    }

    const inputDate = new Date(date as string);
    const weekday = inputDate.getDay();

    const rules = await prisma.availabilityRule.findMany({
      where: {
        weekday,
        isActive: true,   
      },
    });

    const bookings = await prisma.booking.findMany({
    where: {
    bookingDate: new Date(date as string),
      },
    });

    const slots: string[] = [];

    for (const rule of rules) {
      let current = timeToMinutes(rule.startTime);
      const end = timeToMinutes(rule.endTime);

      while (current + service.durationMinutes <= end) {
      const slotTime = minutesToTime(current);

      const isBooked = bookings.some(
        (b) =>
          b.startTime === slotTime &&
          b.serviceId === Number(serviceId)
      );

      if (!isBooked) {
        slots.push(slotTime);
      }

     current += service.durationMinutes;
    }
    }

    return res.json(slots);
  } catch (error) {
    console.error("Errore slot:", error);
    return res.status(500).json({ error: "Errore nel calcolo slot" });
  }
}

// helper

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