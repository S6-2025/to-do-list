import React from "react";
import { Task } from "../utils/TasksTypes";
import TaskCard from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";

type BoardColumnProps = {
  title: string;
  tasks: Task[];
  onExpand: (task: Task) => void;
  droppableId: string;
  className?: string;
  canEdit: boolean;
};

const BoardColumn: React.FC<BoardColumnProps> = ({
  title,
  tasks,
  onExpand,
  droppableId,
  className = "",
  canEdit,
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: droppableId,
  });

  return (
    <div className={`board-column ${className}`}>
      <h2 className="board-column-title">{title}</h2>

      <div
        className="board-column-tasks"
        ref={setNodeRef}
        style={{
          backgroundColor: isOver ? "rgba(0, 0, 0, 0.05)" : undefined,
        }}
      >
        {tasks.map((task, index) => (
          <TaskCard
            key={task.id}
            task={task}
            onExpand={() => onExpand(task)}
            index={index}
            canEdit={canEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default BoardColumn;
