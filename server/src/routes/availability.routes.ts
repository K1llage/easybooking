import { Router } from "express";
import {
  getAvailabilityRules,
  createAvailabilityRule,
  updateAvailabilityRule,
  deleteAvailabilityRule,
} from "../controllers/availability.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { adminMiddleware } from "../middleware/admin.middleware";

const router = Router();

router.get("/", authMiddleware, adminMiddleware, getAvailabilityRules);
router.post("/", authMiddleware, adminMiddleware, createAvailabilityRule);
router.put("/:id", authMiddleware, adminMiddleware, updateAvailabilityRule);
router.delete("/:id", authMiddleware, adminMiddleware, deleteAvailabilityRule);

export default router;