import { Priority } from "../ENUM/Priority";

export class Task{
    constructor(title: string, description: string, owner: string , startDate: Date, endDate: Date, priority: Priority){
        this.title = title;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.priority = priority;
    }
}