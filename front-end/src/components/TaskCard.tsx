import React from "react";
import { Task } from "../utils/TasksTypes";
import { useDraggable } from "@dnd-kit/core";

interface TaskCardProps {
  task: Task;
  onExpand: () => void;
  index: number;
  canEdit: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onExpand, index, canEdit }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id.toString(),
  });

  const statusClass = `taskcard-${task.status.toLowerCase()}`;
  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  return (
    <div
      className={`task-card__container ${statusClass}`}
      ref={setNodeRef}
      style={style}
    >
      {/* Botão de expandir FORA da área de drag */}
      <button className="expand-button" onClick={onExpand}>
        ☰
      </button>

      {/* Área de conteúdo que pode ser arrastada */}
      <div className="task-card__drag-content" {...listeners} {...attributes}>
        <p className="task-assigned">{task.ownerEmail}</p>
        <h3 className="task-title">{task.title}</h3>
        <p className={`task-priority task-priority-${task.priority.toLowerCase()}`}>
          {task.priority.toLowerCase()}
        </p>
      </div>
    </div>
  );
};

export default TaskCard;
