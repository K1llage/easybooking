import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export async function getAvailabilityRules(req: Request, res: Response) {
  try {
    const rules = await prisma.availabilityRule.findMany({
      orderBy: [
        { weekday: "asc" },
        { startTime: "asc" },
      ],
    });

    return res.json(rules);
  } catch (error) {
    console.error("Errore nel recupero availability:", error);
    return res.status(500).json({ error: "Errore nel recupero availability" });
  }
}

export async function createAvailabilityRule(req: Request, res: Response) {
  try {
    const { weekday, startTime, endTime, isActive } = req.body;

    if (
      weekday === undefined ||
      !startTime ||
      !endTime
    ) {
      return res.status(400).json({
        error: "weekday, startTime e endTime sono obbligatori",
      });
    }

    const rule = await prisma.availabilityRule.create({
      data: {
        weekday: Number(weekday),
        startTime,
        endTime,
        isActive: isActive ?? true,
      },
    });

    return res.status(201).json(rule);
  } catch (error) {
    console.error("Errore nella creazione availability:", error);
    return res.status(500).json({ error: "Errore nella creazione availability" });
  }
}

export async function updateAvailabilityRule(req: Request, res: Response) {
  try {
    const ruleId = Number(req.params.id);
    const { weekday, startTime, endTime, isActive } = req.body;

    if (Number.isNaN(ruleId)) {
      return res.status(400).json({ error: "ID non valido" });
    }

    const existingRule = await prisma.availabilityRule.findUnique({
      where: { id: ruleId },
    });

    if (!existingRule) {
      return res.status(404).json({ error: "Regola non trovata" });
    }

    const updatedRule = await prisma.availabilityRule.update({
      where: { id: ruleId },
      data: {
        weekday: weekday !== undefined ? Number(weekday) : undefined,
        startTime,
        endTime,
        isActive,
      },
    });

    return res.json(updatedRule);
  } catch (error) {
    console.error("Errore nell'aggiornamento availability:", error);
    return res.status(500).json({ error: "Errore nell'aggiornamento availability" });
  }
}

export async function deleteAvailabilityRule(req: Request, res: Response) {
  try {
    const ruleId = Number(req.params.id);

    if (Number.isNaN(ruleId)) {
      return res.status(400).json({ error: "ID non valido" });
    }

    const existingRule = await prisma.availabilityRule.findUnique({
      where: { id: ruleId },
    });

    if (!existingRule) {
      return res.status(404).json({ error: "Regola non trovata" });
    }

    await prisma.availabilityRule.delete({
      where: { id: ruleId },
    });

    return res.json({ message: "Regola eliminata con successo" });
  } catch (error) {
    console.error("Errore nell'eliminazione availability:", error);
    return res.status(500).json({ error: "Errore nell'eliminazione availability" });
  }
}