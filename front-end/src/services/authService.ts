import { api } from "./Api";

// Define o tipo dos dados de registro
interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: string; // Ex: "PO"
}

// Define o tipo dos dados de login
interface LoginData {
  email: string;
  password: string;
}

// Função para registro de usuário
export async function register(data: RegisterData) {
  const response = await api.post("/auth/register", data);
  return response.data;
}

// Função para login de usuário
export async function login(data: LoginData) {
  const response = await api.get("/auth/login", { data });
  return response.data;
}
