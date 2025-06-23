  import React from "react";
  import { Task } from "../utils/TasksTypes";
  import TaskCard from "./TaskCard";
  import { Droppable } from "react-beautiful-dnd";

  type BoardColumnProps = {
    title: string;
    tasks: Task[];
    onExpand: (task: Task) => void;
    droppableId: string; 
    className?: string; 
    canEdit: boolean; 
  };

  const BoardColumn: React.FC<BoardColumnProps> = ({ title, tasks, onExpand, droppableId, canEdit }) => {
    return (
      <div className="board-column">
        <h2 className="board-column-title">{title}</h2>
        <Droppable droppableId={droppableId}>
          {(provided, snapshot) => (
            <div
              className="board-column-tasks"
              {...provided.droppableProps}
              ref={provided.innerRef}
            
            >
              {tasks.map((task, index) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onExpand={() => onExpand(task)}
                  index={index} // importante passar o index para o draggable
                  canEdit={canEdit}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    );
  };

  export default BoardColumn;
