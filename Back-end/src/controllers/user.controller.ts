import { Request, Response } from 'express';
import { userRepository } from '../repositories/user.repository'; // <-- Importa o repositório


const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await userRepository.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        res.status(500).json({ message: 'Erro ao buscar usuários.' });
    }
}

const getUserById = async (req: Request, res: Response) => {
    try{
        const user = await userRepository.findById(Number(req.params.id));
        res.status(200).json(user);
    }catch (error) {
        console.error("Erro ao buscar usuário:", error);
        res.status(500).json({ message: 'Erro ao buscar usuário.' });
    }
}

export {getAllUsers, getUserById}

