import { sql } from "../DB/Database";
import { Task } from "../models/task";
import User from "../models/user";


export const TaskRepository = {
    async findAll(): Promise<any> {
        const tasks = await sql`SELECT * FROM tarefas`
        return tasks;
    },

    async findByOwner(owner: User): Promise<any> {
        const tasks = await sql`SELECT * FROM tarefas WHERE responsavel_id = ${owner.id}`
        if (tasks.length > 0) {
            return tasks
        }
        throw new Error("nenhuma tarefa encontrada")
    },

    async create(task: Task) {
        Object.keys(task).forEach((key: string) => {
            if (!(task as any)[key]) {
                throw new Error("Dados incompletos!")
            }
        })

        const newTask = await sql`
        INSERT INTO tarefas (nome, data_inicio, prazo_final, prioridade, responsavel_id, descricao, status)
        VALUES (${task.name},${task.startDate},${task.endDate},${task.priority},${task.owner},${task.description},${task.status})
        RETURNING id, nome, data_inicio, status
        `
        console.log(newTask)
        return newTask
    }
}
