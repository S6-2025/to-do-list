import React, { useState } from "react";

type TaskStatus = "backlog" | "in_progress" | "done" | "cancelled";

type AddTaskProps = {
  onAdd: (title: string, status: TaskStatus) => void; // agora recebe status também
};

const AddTask: React.FC<AddTaskProps> = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<TaskStatus | "">(""); // '' = não selecionado

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === "") return;

    // se status vazio, default para backlog
    const taskStatus: TaskStatus = status === "" ? "backlog" : status;

    onAdd(title, taskStatus);
    setTitle("");
    setStatus("");
  };

  return (
   <div className="add-task__container">
     <form className="add-task-form" onSubmit={handleSubmit} >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Digite a tarefa"
       
      />
      <select

        value={status}
        onChange={(e) => setStatus(e.target.value as TaskStatus)}
      >
          <option value="" disabled hidden>Status</option>
        <option value="cancelled">Cancelado</option>
        <option value="backlog">Backlog</option>
        <option value="in_progress">Em andamento</option>
        <option value="done">Concluído</option>
        
      </select>
      <button type="submit" className="button-add-task">Adicionar</button>
    </form>
   </div>
  );
};

export default AddTask;
