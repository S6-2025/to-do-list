import React, { useState } from "react";
import { Task } from "../utils/TasksTypes";
import { Draggable } from "react-beautiful-dnd";
 

type TaskCardProps = {
  task: Task;
  onExpand: () => void;
  index: number; // index para draggable
};

const TaskCard: React.FC<TaskCardProps> = ({ task, onExpand, index }) => {
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

  const statusClass = `taskcard-${task.status}`;

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          className={`task-card__container ${statusClass}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
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
      )}
    </Draggable>
  );
};


export default TaskCard;
