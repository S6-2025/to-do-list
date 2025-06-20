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
  const [isOpening, setIsOpening] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // controla visibilidade no DOM

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
    setIsVisible(true);
  };

const handleExpand = (task: Task) => {
  if (expandedTask?.id === task.id) {
    setIsClosing(true); // fecha com animação
  } else {
    setIsClosing(false);

    if (!isVisible) {
      // painel fechado, abre com animação
      setExpandedTask(task);
      setIsVisible(true);
      setIsOpening(false);

      setTimeout(() => {
        setIsOpening(true);
      }, 10);
    } else {
      // painel aberto, só troca task, sem animação
      setExpandedTask(task);
    }
  }
};




  const handleCloseDetail = () => {
    setIsClosing(true); // inicia animação de fechamento
  };

  const handleUpdate = (updatedTask: Task) => {
    onUpdateTask(updatedTask);
    setExpandedTask(null);
  };

  const filterTasks = (status: Task["status"]) =>
    tasks.filter((task) => task.status === status);

  // Animação de saída: esconde painel depois do tempo da transição
  useEffect(() => {
    if (isClosing) {
      const timer = setTimeout(() => {
        setExpandedTask(null);
        setIsVisible(false); // desmonta visualmente
        setIsClosing(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isClosing]);

  // Animação de entrada: aplica classe 'opening' no próximo frame
  useEffect(() => {
    if (expandedTask) {
      requestAnimationFrame(() => {
        setIsClosing(false); // ativa 'opening' na TaskDetail
      });
    }
  }, [expandedTask]);

  return (
    <div className={`board__container ${expandedTask ? "panel-open" : ""}`}>
      {isVisible && expandedTask && (
        <TaskDetail
          task={expandedTask}
          onClose={handleCloseDetail}
          onUpdate={handleUpdate}
          className={isClosing ? "closing" : isOpening ? "opening" : ""}

        />
      )}

      <div className="board-columns__container">
        <BoardColumn
          title="Cancelado"
          tasks={filterTasks("cancelled")}
          onExpand={handleExpand}
        />
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
