import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import BoardColumn from "./BoardColumn";
import TaskDetail from "./TaskDetail";
import { Task } from "../utils/TasksTypes";
import { DragDropContext } from "react-beautiful-dnd";

type BoardProps = {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
  onUpdateTask: (updated: Task) => void;
};
type DropResult = {
  source: {
    index: number;
    droppableId: string;
  };
  destination: {
    index: number;
    droppableId: string;
  } | null;
};

const Board: React.FC<BoardProps> = ({ tasks, setTasks, onUpdateTask }) => {
  const [expandedTask, setExpandedTask] = useState<Task | null>(null);
  const [isOpening, setIsOpening] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // controla visibilidade no DOM

const onDragEnd = (result: DropResult) => {
  const { source, destination } = result;
  if (!destination) return;
  if (
    source.droppableId === destination.droppableId &&
    source.index === destination.index
  ) return;

  setTasks((prevTasks) => {
    const updatedTasks = Array.from(prevTasks);

    // Afirmamos que droppableId é TaskStatus
    const sourceStatus = source.droppableId as Task["status"];
    const destStatus = destination.droppableId as Task["status"];

    // Encontra índice da task arrastada no array geral
    const draggedTaskIndex = updatedTasks.findIndex(
      (t, idx) =>
        t.status === sourceStatus &&
        prevTasks.filter(x => x.status === sourceStatus).indexOf(t) === source.index
    );

    if (draggedTaskIndex === -1) return prevTasks;

    // Remove a task do array geral
    const [movedTask] = updatedTasks.splice(draggedTaskIndex, 1);

    // Atualiza o status da task movida
    movedTask.status = destStatus;

    // Calcula índice para inserir no array geral baseado na posição dentro da coluna destino
    let destIndex = updatedTasks.length; // padrão insere no fim
    let countInDest = 0;
    for (let i = 0; i < updatedTasks.length; i++) {
      if (updatedTasks[i].status === destStatus) {
        if (countInDest === destination.index) {
          destIndex = i;
          break;
        }
        countInDest++;
      }
    }

    // Insere a task movida na posição correta
    updatedTasks.splice(destIndex, 0, movedTask);

    return updatedTasks;
  });
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


 

useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]);


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
    <DragDropContext onDragEnd={onDragEnd}>
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
            droppableId="cancelled" // passe a droppableId para cada coluna
          />
          <BoardColumn
            title="Backlog"
            tasks={filterTasks("backlog")}
            onExpand={handleExpand}
            droppableId="backlog"
          />
          <BoardColumn
            title="Em andamento"
            tasks={filterTasks("in_progress")}
            onExpand={handleExpand}
            droppableId="in_progress"
          />
          <BoardColumn
            title="Concluído"
            tasks={filterTasks("done")}
            onExpand={handleExpand}
            droppableId="done"
          />
        </div>
      </div>
    </DragDropContext>
  );
};

export default Board;
