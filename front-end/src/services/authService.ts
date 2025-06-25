import api from "./Api";

export const login = async (data: { email: string; password: string }) => {
  const response = await api.post("/auth/login", data);
  return response.data.token;
};

export const register = async (data: {
  name: string;
  password: string;
  email: string;
  role: string;
}) => {
  const response = await api.post("/auth/register", data);
  return response.data.token;
};
