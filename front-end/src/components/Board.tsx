import React, { useState, Dispatch, SetStateAction } from "react";
import BoardColumn from "./BoardColumn";
import TaskDetail from "./TaskDetail";
import { Task } from "../utils/TasksTypes";

type BoardProps = {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
  onUpdateTask: (updated: Task) => void;
};

const Board: React.FC<BoardProps> = ({ tasks, setTasks, onUpdateTask }) => {
  const [expandedTask, setExpandedTask] = useState<Task | null>(null);

  const handleAddTask = (title: string) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      assignedTo: "",
      status: "backlog",
      startDate: "",
      endDate: "",
      description: "",
    };
    setTasks((prev) => [...prev, newTask]);
    setExpandedTask(newTask);
  };

  const handleExpand = (task: Task) => {
    setExpandedTask(task);
  };

  const handleCloseDetail = () => {
    setExpandedTask(null);
  };

  const handleUpdate = (updatedTask: Task) => {
    onUpdateTask(updatedTask);
    setExpandedTask(null);
  };

  const filterTasks = (status: Task["status"]) =>
    tasks.filter((task) => task.status === status);

  return (
    <div className="board__container">
       

      <div className="board-columns__container">
        <BoardColumn 
          title="Backlog"
          tasks={filterTasks("backlog")}
          onExpand={handleExpand}
        />
        <BoardColumn
          title="Em andamento"
          tasks={filterTasks("in_progress")}
          onExpand={handleExpand}
        />
        <BoardColumn
          title="Concluído"
          tasks={filterTasks("done")}
          onExpand={handleExpand}
        />
      </div>

      {expandedTask && (
        <TaskDetail
          task={expandedTask}
          onClose={handleCloseDetail}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default Board;
