// src/components/TaskDetail.tsx

import React, { useState, useEffect } from "react";
import { Task } from "../utils/TasksTypes";

type TaskDetailProps = {
  task: Task;
  onClose: () => void;
  onUpdate: (task: Task) => void;
  className?: string;
};

const TaskDetail: React.FC<TaskDetailProps> = ({ task, onClose, onUpdate,className }) => {
  const [formData, setFormData] = useState<Task>({ ...task });

  useEffect(() => {
    setFormData({ ...task });  // Atualiza o estado local sempre que a task mudar
  }, [task]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onUpdate(formData);
  };

  return (
    <div className={`task-detail__container ${className ?? ""}`}>
      <button className="close-panel" onClick={onClose}>×</button>

      <div className="task-detail-content">
        <label>
          Título:
          <input type="text" name="title" value={formData.title} onChange={handleChange} />
        </label>

        <label>
          Pessoa designada:
          <input type="text" name="assignedTo" value={formData.assignedTo} onChange={handleChange} />
        </label>

        <label>
          Status:
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="cancelled">Cancelado</option>
            <option value="backlog">Backlog</option>
            <option value="in_progress">Em andamento</option>
            <option value="done">Concluído</option>
          </select>
        </label>

        <label>
          Data inicial:
          <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
        </label>

        <label>
          Data final:
          <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} />
        </label>

        <label>
          Descrição:
          <textarea name="description" value={formData.description} onChange={handleChange} rows={5} />
        </label>

        <button className="save-button" onClick={handleSave}>Salvar</button>
      </div>
    </div>
  );
};

export default TaskDetail;
