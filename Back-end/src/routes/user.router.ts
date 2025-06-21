import { Router } from 'express';
import User from '../models/user';
import { users } from '../controllers/auth.controller';
import { getAllUsers, getUserById } from "../controllers/user.controller"

const userRouter = Router();

userRouter.get('/', getAllUsers);

userRouter.get('/:id', getUserById)

export default userRouter;