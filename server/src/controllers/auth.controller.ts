import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";

export async function loginAdmin(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email e password obbligatorie" });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: "Credenziali non valide" });
    }

    if (user.role !== "ADMIN") {
      return res.status(403).json({ error: "Accesso non autorizzato" });
    }

    if (!user.passwordHash) {
      return res.status(401).json({ error: "Utente senza password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Credenziali non valide" });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
        email: user.email,
      },
      process.env.JWT_SECRET || "dev-secret",
      { expiresIn: "1d" }
    );

    return res.json({
      message: "Login riuscito",
      token,
    });
  } catch (error) {
    console.error("Errore login:", error);
    return res.status(500).json({ error: "Errore interno del server" });
  }
}