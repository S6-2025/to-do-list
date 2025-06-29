import api from "./Api";


export const getCurrentUser = async () => {
  const response = await api.get("/users/me");
  return response.data.user;
};
// Busca usuário pelo email
export const getUserByEmail = async (email: string) => {
  const response = await api.get("/users/user", { params: { email } });
  return response.data.user;
};

// Atualiza usuário autenticado, não passa email na url
export const updateUser = async (data: { name?: string; email?:string; password?: string }) => {
  const response = await api.patch("/users/user", data);
  return response.data.token; // token atualizado
};

// Deleta usuário por email, atenção à permissão
export const deleteUser = async (email: string) => {
  const response = await api.delete("/users/user", { params: { email } });
  return response.data;
};
