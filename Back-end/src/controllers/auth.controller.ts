import { Request, Response } from "express";
import { Roles } from "../Enums/Roles";
import User from "../models/user";
import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

const users: User[] = [
    new User("teste", "teste@teste.com", "123456", Roles.EMPLOYEE, 1),
    new User("testePO", "testepo@teste.com", "123456", Roles.PO, 2),
    new User("testeSM", "testesm@teste.com", "123456", Roles.SM, 3),

]

const secret = process.env.JWT_SECRET as string;
console.log("Secret:", secret);


const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        if (!username || !password) {
            res.status(400).send({
                message: "Username and password are required."
            })
        }
        const user = users.find((user) => user.username === username);
        if (!user) {
            res.status(404).send({
                message: "User not found."
            })
        }
        const isPasswordValid = await bcrypt.compare(password, user!.password)
        if (!isPasswordValid) {
            res.status(401).send({
                message: "Invalid password."
            })
        }
        res.status(200).send({
            message: "Login successful!",
            user: jwt.sign(
                { id: user!.id, role: user!.role },
                secret,
                { expiresIn: "1h"}
            )
        });


    } catch (error) {
        throw new Error("An error occurred during login.");
    }
}

const register = async (req: Request, res: Response) => {
    const { username, email, password, role } = req.body;
    console.log("Registering user:", req.body);
    if (!username || !email || !password || !role) {
        throw new Error("All fields are required.");
    }
    const existingUser = users.find((user) => user.username === username || user.email === email);
    if (existingUser) {
        throw new Error("Username or email already exists.");
    }

    //LOGICA DE CRIPTOGRAFIA DE SENHA
    const criptoPassword = await bcrypt.hash(password, 10);

    const newUser = new User(username, email, criptoPassword, role, users.length + 1);
    users.push(newUser);
    res.status(201).send({
        message: "User registered successfully!",
        user: jwt.sign(
            { id: newUser.id, role: newUser.role },
            secret,
            { expiresIn: "1h" }
        )
    });
}

export { login, register, users };
