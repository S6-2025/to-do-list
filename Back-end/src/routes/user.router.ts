import { Router } from 'express';
import User from '../models/user';
import { users } from '../controllers/auth.controller';

const userRouter = Router();

userRouter.get('/', (req, res) => {
    res.status(200).send({
        users: users
    });
});

userRouter.get('/:id', (req, res) => {
    const userId = req.params.id;
    console.log(`Buscando usuário com ID: ${userId}`);
    // Aqui você poderia buscar o usuário no banco de dados
    res.status(200).send({
        mensagem: `Usuário com ID ${userId} encontrado!`
    });
})


export default userRouter;