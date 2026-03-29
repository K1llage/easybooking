import { Router } from "express";
import {
  createBooking,
  getAdminBookings,
  updateBookingStatus,
} from "../controllers/booking.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { adminMiddleware } from "../middleware/admin.middleware";

const router = Router();

router.post("/", createBooking);
router.get("/admin", authMiddleware, adminMiddleware, getAdminBookings);
router.patch("/admin/:id/status", authMiddleware, adminMiddleware, updateBookingStatus);

export default router;