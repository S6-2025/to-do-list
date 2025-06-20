import React, { useState } from "react";

type AddTaskProps = {
  onAdd: (title: string) => void;
};

const AddTask: React.FC<AddTaskProps> = ({ onAdd }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === "") return;
    onAdd(title);
    setTitle("");
  };

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Digite a tarefa"
      />
      <button type="submit">Adicionar</button>
    </form>
  );
};

export default AddTask;
