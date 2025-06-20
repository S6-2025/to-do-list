import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
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
  const [isClosing, setIsClosing] = useState(false); // novo estado para animar saída

 
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
       setIsClosing(true);
  
  };

  const handleUpdate = (updatedTask: Task) => {
    onUpdateTask(updatedTask);
    setExpandedTask(null);
  };

  const filterTasks = (status: Task["status"]) =>
    tasks.filter((task) => task.status === status);

useEffect(() => {
  if (isClosing) {
    const timer = setTimeout(() => {
      setExpandedTask(null);  // aqui só remove depois da animação
      setIsClosing(false);
    }, 300); // tempo da animação em ms

    return () => clearTimeout(timer);
  }
}, [isClosing]);

  return (
    <div className={`board__container ${expandedTask ? "panel-open" : ""}`}>
       

      {expandedTask && (
        <TaskDetail
          task={expandedTask}
          onClose={handleCloseDetail}
          onUpdate={handleUpdate}
          className={isClosing ? "closing" : "opening"}
        />
      )}
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

    </div>
  );
};

export default Board;
