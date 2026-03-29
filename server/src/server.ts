import express from "express";
import cors from "cors";

import healthRoutes from "./routes/health.routes";
import serviceRoutes from "./routes/service.routes";
import authRoutes from "./routes/auth.routes";
import availabilityRoutes from "./routes/availability.routes";
import slotRoutes from "./routes/slot.routes";
import bookingRoutes from "./routes/booking.routes";

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/health", healthRoutes);
app.use("/services", serviceRoutes);
app.use("/auth", authRoutes);
app.use("/availability", availabilityRoutes);
app.use("/available-slots", slotRoutes);
app.use("/bookings", bookingRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server in ascolto su http://localhost:${PORT}`);
});