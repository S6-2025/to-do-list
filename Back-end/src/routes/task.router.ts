import { Router } from 'express';
import { createTask, getTaskByOwner, getAllTasks } from '../controllers/task.controller'

const taskRouter = Router();


taskRouter.get("/", getAllTasks)
taskRouter.get("/:owner", getTaskByOwner)

taskRouter.post("/", createTask)

export default taskRouter;