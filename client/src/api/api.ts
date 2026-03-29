import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const getServices = () => api.get("/services");

export const getAvailableSlots = (serviceId: number, date: string) =>
  api.get(`/available-slots?serviceId=${serviceId}&date=${date}`);

export const createBooking = (data: any) =>
  api.post("/bookings", data);

export const adminLogin = (data: { email: string; password: string }) =>
  api.post("/auth/login", data);

export const getAdminBookings = (token: string) =>
  api.get("/bookings/admin", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const updateBookingStatus = (
  id: number,
  status: string,
  token: string
) =>
  api.patch(
    `/bookings/admin/${id}/status`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );