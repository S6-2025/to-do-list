import React, { useState } from "react";
import { Task } from "../utils/TasksTypes";

type TaskCardProps = {
  task: Task;
  onExpand: () => void;
};

const TaskCard: React.FC<TaskCardProps> = ({ task, onExpand }) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingAssigned, setIsEditingAssigned] = useState(false);
  const [localTask, setLocalTask] = useState({
    title: task.title,
    assignedTo: task.assignedTo,
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

  return (
    <div className="task-card__container">
      <button className="expand-button" onClick={onExpand}>
        ☰
      </button>

      {isEditingAssigned ? (
        <input
          type="text"
          name="assignedTo"
          value={localTask.assignedTo}
          onChange={handleChange}
          onBlur={() => setIsEditingAssigned(false)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <p
          className="task-assigned"
          onDoubleClick={() => setIsEditingAssigned(true)}
        >
          Responsável: {localTask.assignedTo}
        </p>
      )}

      {isEditingTitle ? (
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
          onDoubleClick={() => setIsEditingTitle(true)}
        >
          {localTask.title}
        </h3>
      )}
    </div>
  );
};

export default TaskCard;
