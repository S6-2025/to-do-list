import express, { Request, Response } from "express";
import { sql } from "./DB/Database"; // importa o banco de dados
import cors from "cors";
import authRouter from "./routes/auth.router.js";
import userRouter from "./routes/user.router.js";
import taskRouter from "./routes/task.router.js";

const app = express();


const PORT = process.env.PORT || 3000;
const HOST = process.env.HOSTNAME || "localhost"
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use("/auth", authRouter)
app.use("/users", userRouter)
app.use("/auth", taskRouter)

//Check Connection with database
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
    console.log(`🚀 Servidor rodando com sucesso em ${HOST}:${PORT}`);
})

