
import api from "./Api";

export const getUserByEmail = async (email: string) => {
  const response = await api.get("/users/user", { params: { email } });
  return response.data.user;
};

export const updateUser = async (data: { name?: string; password?: string }) => {
  const response = await api.patch("/users/user", data);
  return response.data.token;
};

export const deleteUser = async (email: string) => {
  const response = await api.delete("/users/user", { params: { email } });
  return response.data;
};
