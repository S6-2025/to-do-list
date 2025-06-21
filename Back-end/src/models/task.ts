import { Priority } from "../Enums/Priority"
import { Status } from "../Enums/Status"
import User from "./user"

export class Task {
    id?: number;
    name: string;
    description: string;
    startDate: string;
    endDate: Date;
    priority: Priority;
    status: Status;
    owner: User;

    constructor(
        name: string,
        description: string,
        startDate: string,
        endDate: Date,
        owner: User,
        id?: number,
        priority: Priority = Priority.LOW,
        status: Status = Status.BACKLOG
    ) {
        this.name = name;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.priority = priority;
        this.status = status;
        this.owner = owner;
        this.id = id;
    }

}

