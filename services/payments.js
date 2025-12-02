import api from "./api";

export const createPayment = async (paymentData) => {
  const response = await api.post("/api/payments", paymentData);
  return response.data;
};

export const confirmPayment = async (id) => {
  const response = await api.post(`/api/payments/${id}/confirm`);
  return response.data;
};

export const cancelPayment = async (id) => {
  const response = await api.post(`/api/payments/${id}/cancel`);
  return response.data;
};