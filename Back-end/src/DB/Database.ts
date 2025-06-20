import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

config(); // Garante que .env seja carregado

// Exporta a instância do client SQL
export const sql = neon(process.env.DATABASE_URL as string);
