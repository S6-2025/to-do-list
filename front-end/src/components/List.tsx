
import React from "react";

type Task = {
  id: number;
  title: string;
};

type ListProps = {
  tasks: Task[];
};

const List: React.FC<ListProps> = ({ tasks }) => {
  return (
    <div className="task-list">
      <h2>Lista de Tarefas</h2>
      {tasks.length === 0 ? (
        <p>Nenhuma tarefa adicionada ainda.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default List;
