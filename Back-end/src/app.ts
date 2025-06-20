import express, { Request, Response } from "express"; //TO RUN -> NPM START
import cors from "cors";
import authRouter from "./routes/auth.router.js";
import userRouter from "./routes/user.router.js";
import taskRouter from "./routes/task.router.js";

const app = express()

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOSTNAME || "localhost"

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use("/auth", authRouter)
app.use("/users", userRouter)
app.use("/auth", taskRouter)

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando com sucesso em ${HOST}:${PORT}`);
})