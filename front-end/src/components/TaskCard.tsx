import React, { useState } from "react";
import { Task } from "../utils/TasksTypes";
import { useDraggable } from "@dnd-kit/core";

interface TaskCardProps {
  task: Task;
  onExpand: () => void;
  index: number;
  canEdit: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onExpand, index, canEdit }) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingAssigned, setIsEditingAssigned] = useState(false);

  const [localTask, setLocalTask] = useState({
    title: task.title,
    ownerEmail: task.ownerEmail,
  });

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id.toString(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsEditingTitle(false);
      setIsEditingAssigned(false);
    }
  };

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
      {/* Botão expand fica fora da área "arrastável" */}
      <button
        className="expand-button"
        onClick={(e) => {
          e.stopPropagation(); // evita conflito com drag
          onExpand();
        }}
      >
        ☰
      </button>

      {/* Área arrastável */}
      <div {...listeners} {...attributes} style={{ cursor: "grab" }}>
        {canEdit && isEditingAssigned ? (
          <input
            type="text"
            name="ownerEmail"
            value={localTask.ownerEmail}
            onChange={handleChange}
            onBlur={() => setIsEditingAssigned(false)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <p
            className="task-assigned"
            onDoubleClick={() => canEdit && setIsEditingAssigned(true)}
          >
            {localTask.ownerEmail}
          </p>
        )}

        {canEdit && isEditingTitle ? (
          <input
            type="text"
            name="title"
            value={localTask.title}
            onChange={handleChange}
            onBlur={() => setIsEditingTitle(false)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <h3
            className="task-title"
            onDoubleClick={() => canEdit && setIsEditingTitle(true)}
          >
            {localTask.title}
          </h3>
        )}

        <p className={`task-priority task-priority-${task.priority.toLowerCase()}`}>
          {task.priority}
        </p>
      </div>
    </div>
  );
};

export default TaskCard;
