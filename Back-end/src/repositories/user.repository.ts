import { sql } from "../DB/Database";
import User from "../models/user";

export const userRepository = {
    async findAll(): Promise<any>{
        const users = await sql`SELECT * FROM usuarios`;
        return users;
    },

    async findById(id: number): Promise<any> {
        const user = await sql`SELECT * FROM usuarios WHERE id = ${id}`; 
        if (user.length > 0){
            return user[0]; 
        }
        throw new Error(`Usuário com ID ${id} não encontrado.`);
    },

    async findByEmail(email: string){
        const user = await sql`SELECT * FROM usuarios WHERE email = ${email}`
        if(!user){
            throw new Error("User not found!")
        }
        return user[0];
    },

    async create(user: User): Promise<any> {
        const { username, email, password, role } = user;

        const result = await sql`
        INSERT INTO usuarios (nome, email, senha, tipo)
        VALUES (${username}, ${email}, ${password}, ${role})
        RETURNING id, nome, tipo
        `
        return result
    }
} 