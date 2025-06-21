import { Request, Response } from 'express'
import { TaskRepository } from '../repositories/task.repository'
import { userRepository } from '../repositories/user.repository';

const getAllTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await TaskRepository.findAll();
        console.log(tasks)
        res.status(200).json(tasks);
    } catch (error) {
        console.error("Erro ao encontrar tarefas: ", error)
        res.status(500).json({ message: "Erro ao encontrar tarefas" })
    }
}

const getTaskByOwner = async (req: Request, res: Response) => {
    try {
        const email = req.body.ownerEmail

        const user = await userRepository.findByEmail(email)
        const tasks = await TaskRepository.findByOwner(user.id)

        res.status(200).send(tasks)
    } catch (error) {
        console.error("Erro ao encontrar tarefas: ", error)
        res.status(500).json({ message: "Erro ao encontrar tarefas" })
    }
}

const createTask = async (req: Request, res: Response) => {
    try{
        const task = TaskRepository.create(req.body)
        res.status(200).send(task)
    }catch(error){
        res.status(500).json({message: "Erro ao criar tarefa!"})
    }
}

export { getAllTasks, getTaskByOwner, createTask }