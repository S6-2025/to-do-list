import express, { Request, Response } from "express";
import { sql } from "./DB/Database"; // importa o banco de dados
import cors from "cors";
import authRouter from "./routes/auth.router.js";
import userRouter from "./routes/user.router.js";
import taskRouter from "./routes/task.router.js";
import { listarColunasDeTabela, listarTabelasDisponiveis } from "./routes/teste.router";

const app = express();


const PORT = process.env.PORT || 3000;
const HOST = process.env.HOSTNAME || "localhost"
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use("/api/auth", authRouter)
app.use("/api/users", userRouter)
app.use("/api/tasks", taskRouter)

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

//!DEBUG: Listar tabelas disponíveis
app.get("/tabelas", async (req: Request, res: Response) => {
  try{
    const tables = await listarTabelasDisponiveis();
    res.json(tables);
  }
  catch (error) {
    console.error("Erro ao listar tabelas:", error);
    res.status(500).json({ error: "Erro ao listar tabelas" });
  }
})
//!DEBUG: Listar colunas de uma tabela específica
app.get("/tabelas/:nomeDaTabela", (req, res) => {res.send(listarColunasDeTabela(req.params.nomeDaTabela))})

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando com sucesso em ${HOST}:${PORT}`);
})

