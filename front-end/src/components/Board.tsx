import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import BoardColumn from "./BoardColumn";
import TaskDetail from "./TaskDetail";
import TaskCard from "./TaskCard";
import { Task } from "../utils/TasksTypes";
import { updateTask,deleteTask } from "../services/taskService";

import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

type BoardProps = {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
  onUpdateTask: (updated: Task) => void;
  canEdit: boolean;
};

const Board: React.FC<BoardProps> = ({
  tasks,
  setTasks,
  onUpdateTask,
  canEdit,
}) => {
  const [activeId, setActiveId] = useState<string | number | null>(null);
  const [expandedTask, setExpandedTask] = useState<Task | null>(null);
  const [isOpening, setIsOpening] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Configura sensores para detectar arraste (mouse, toque)
  const sensors = useSensors(useSensor(PointerSensor));

  // Função para filtrar tasks por status
  const filterTasks = (status: Task["status"]) =>
    tasks.filter((task) => task.status === status);

  // Função para abrir o detalhe da task
  const handleExpand = (task: Task) => {
    if (expandedTask?.id === task.id) {
      setIsClosing(true);
    } else {
      setIsClosing(false);

      if (!isVisible) {
        setExpandedTask(task);
        setIsVisible(true);
        setIsOpening(false);

        setTimeout(() => setIsOpening(true), 10);
      } else {
        setExpandedTask(task);
      }
    }
  };

  // Fecha painel com animação
  const handleCloseDetail = () => {
    setIsClosing(true);
  };

  // Atualiza a task e fecha o painel
  const handleUpdate = (updatedTask: Task) => {
    onUpdateTask(updatedTask);
    setExpandedTask(null);
  };

  // Função executada ao terminar o drag
  const handleDragEnd = async (event: DragEndEvent) => {
  const { active, over } = event;
  setActiveId(null);
  if (!over) return;

  const draggedTask = tasks.find((task) => task.id === active.id);
  if (!draggedTask) return;

  const newStatus = over.id as Task["status"];
  if (draggedTask.status === newStatus) return;

  try {
    // Atualiza no backend
    const updatedFromApi = await updateTask(draggedTask.id.toString(), { status: newStatus });

    // Atualiza no estado local
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === draggedTask.id ? { ...task, status: newStatus } : task
      )
    );

    // Se quiser propagar para pai
    onUpdateTask({ ...draggedTask, status: newStatus });

  } catch (error) {
    console.error("Erro ao atualizar status da task:", error);
    alert("Erro ao mover a task, tente novamente.");
  }
};

  // Início do drag
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id);
  };

  // Controle de animações do painel de detalhes
  useEffect(() => {
    if (isClosing) {
      const timer = setTimeout(() => {
        setExpandedTask(null);
        setIsVisible(false);
        setIsClosing(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isClosing]);

  useEffect(() => {
    if (expandedTask) {
      requestAnimationFrame(() => {
        setIsClosing(false);
      });
    }
  }, [expandedTask]);

const handleDeleteTask = async (taskId: string) => {
  console.log("Deletando task com id:", taskId);
  try {
    await deleteTask(taskId); // função do seu taskService que faz a chamada DELETE na API
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    setExpandedTask(null); // fecha o detalhe após deletar
  } catch (error) {
    alert("Erro ao deletar a tarefa.");
    console.error(error);
  }
};


  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveId(null)}
    >
      <div className={`board__container ${expandedTask ? "panel-open" : ""}`}>
        {isVisible && expandedTask && (
          <TaskDetail
            task={expandedTask}
            onClose={handleCloseDetail}
            onUpdate={handleUpdate}
             onDelete={handleDeleteTask}
            className={isClosing ? "closing" : isOpening ? "opening" : ""}
            canEdit={canEdit}
          />
        )}

        <div className="board-columns__container">
          <SortableContext
            items={filterTasks("CANCELLED").map((t) => t.id)}
            strategy={verticalListSortingStrategy}
          >
            <BoardColumn
              className="cancelled-style-column"
              title="Cancelado"
              tasks={filterTasks("CANCELLED")}
              onExpand={handleExpand}
              droppableId="CANCELLED"
              canEdit={canEdit}
            />
          </SortableContext>

          <SortableContext
            items={filterTasks("BACKLOG").map((t) => t.id)}
            strategy={verticalListSortingStrategy}
          >
            <BoardColumn
              className="backlog-style-column"
              title="Backlog"
              tasks={filterTasks("BACKLOG")}
              onExpand={handleExpand}
              droppableId="BACKLOG"
              canEdit={canEdit}
            />
          </SortableContext>

          <SortableContext
            items={filterTasks("ACTIVE").map((t) => t.id)}
            strategy={verticalListSortingStrategy}
          >
            <BoardColumn
              className="in_progress-style-column"
              title="Em andamento"
              tasks={filterTasks("ACTIVE")}
              onExpand={handleExpand}
              droppableId="ACTIVE"
              canEdit={canEdit}
            />
          </SortableContext>

          <SortableContext
            items={filterTasks("FINISHED").map((t) => t.id)}
            strategy={verticalListSortingStrategy}
          >
            <BoardColumn
              className="done-style-column"
              title="Concluído"
              tasks={filterTasks("FINISHED")}
              onExpand={handleExpand}
              droppableId="FINISHED"
              canEdit={canEdit}
            />
          </SortableContext>
        </div>

        {/* Overlay para o item arrastado */}
        <DragOverlay>
          {activeId ? (
            <TaskCard
              task={tasks.find((t) => t.id === activeId)!}
              onExpand={() => {}}
              index={0}
              canEdit={canEdit}
            />
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
};

export default Board;
