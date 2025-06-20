import { Roles } from "../Enums/Roles";

class User {
    id?: number;
    username: string;
    email: string;
    password: string;
    role: Roles

    constructor(username: string, email: string, password: string, role: Roles, id?: number) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.id = id;
        this.role = role;
    }
}

export default User;