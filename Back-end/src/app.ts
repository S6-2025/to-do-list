import express, { Request, Response } from "express";
import { sql } from "./DB/db"; // importa o banco de dados

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", async (req: Request, res: Response) => {
  try {
    // Exemplo de consulta para verificar conexão
    const result = await sql`SELECT version()`;
    const { version } = result[0];
    res.json({ message: "Conectado ao banco!", versao: version });
  } catch (error) {
    console.error("Erro ao conectar com o banco:", error);
    res.status(500).json({ error: "Erro ao conectar com o banco" });
  }
});

app.listen(PORT, () => {
  console.log(`WORKING ON ${PORT}`);
});
