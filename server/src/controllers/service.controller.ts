import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export async function getServices(req: Request, res: Response) {
  try {
    const services = await prisma.service.findMany({
      orderBy: { id: "asc" },
    });

    return res.json(services);
  } catch (error) {
    console.error("Errore nel recupero servizi:", error);
    return res.status(500).json({ error: "Errore nel recupero servizi" });
  }
}

export async function createService(req: Request, res: Response) {
  try {
    const { title, description, durationMinutes, priceCents } = req.body;

    if (!title || !durationMinutes || !priceCents) {
      return res.status(400).json({
        error: "title, durationMinutes e priceCents sono obbligatori",
      });
    }

    const service = await prisma.service.create({
      data: {
        title,
        description,
        durationMinutes: Number(durationMinutes),
        priceCents: Number(priceCents),
      },
    });

    return res.status(201).json(service);
  } catch (error) {
    console.error("Errore nella creazione servizio:", error);
    return res.status(500).json({ error: "Errore nella creazione servizio" });
  }
}

export async function updateService(req: Request, res: Response) {
  try {
    const serviceId = Number(req.params.id);
    const { title, description, durationMinutes, priceCents, isActive } = req.body;

    if (Number.isNaN(serviceId)) {
      return res.status(400).json({ error: "ID non valido" });
    }

    const existingService = await prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!existingService) {
      return res.status(404).json({ error: "Servizio non trovato" });
    }

    const updatedService = await prisma.service.update({
      where: { id: serviceId },
      data: {
        title,
        description,
        durationMinutes:
          durationMinutes !== undefined ? Number(durationMinutes) : undefined,
        priceCents: priceCents !== undefined ? Number(priceCents) : undefined,
        isActive,
      },
    });

    return res.json(updatedService);
  } catch (error) {
    console.error("Errore nell'aggiornamento servizio:", error);
    return res.status(500).json({ error: "Errore nell'aggiornamento servizio" });
  }
}

export async function deleteService(req: Request, res: Response) {
  try {
    const serviceId = Number(req.params.id);

    if (Number.isNaN(serviceId)) {
      return res.status(400).json({ error: "ID non valido" });
    }

    const existingService = await prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!existingService) {
      return res.status(404).json({ error: "Servizio non trovato" });
    }

    await prisma.service.delete({
      where: { id: serviceId },
    });

    return res.json({ message: "Servizio eliminato con successo" });
  } catch (error) {
    console.error("Errore nell'eliminazione servizio:", error);
    return res.status(500).json({ error: "Errore nell'eliminazione servizio" });
  }
}