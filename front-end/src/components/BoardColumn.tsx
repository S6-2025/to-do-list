// src/components/BoardColumn.tsx

import React from "react";
import { Task } from "../utils/TasksTypes";
import TaskCard from "./TaskCard";

type BoardColumnProps = {
  title: string;
  tasks: Task[];
  onExpand: (task: Task) => void;
};

const BoardColumn: React.FC<BoardColumnProps> = ({ title, tasks, onExpand }) => {
  return (
    <div className="board-column">
      <h2 className="board-column-title">{title}</h2>
      <div className="board-column-tasks">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} onExpand={() => onExpand(task)} />
        ))}
      </div>
    </div>
  );
};

export default BoardColumn;
