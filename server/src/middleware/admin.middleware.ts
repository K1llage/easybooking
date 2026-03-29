import { Request, Response, NextFunction } from "express";

export function adminMiddleware(req: Request, res: Response, next: NextFunction) {
  const user = (req as any).user;

  if (!user) {
    return res.status(401).json({ error: "Utente non autenticato" });
  }

  if (user.role !== "ADMIN") {
    return res.status(403).json({ error: "Accesso riservato agli admin" });
  }

  next();
}