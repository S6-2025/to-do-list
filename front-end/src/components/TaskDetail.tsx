import React, { useState, useEffect } from "react";
import { Task, TaskPriority, TaskStatus } from "../utils/TasksTypes";

type TaskDetailProps = {
  task: Task;
  onClose: () => void;
  onUpdate: (task: Task) => void;
  onDelete: (taskId: string) => void;
  className?: string;
  canEdit: boolean;
};

const TaskDetail: React.FC<TaskDetailProps> = ({
  task,
  onClose,
  onUpdate,
  onDelete,
  className,
  canEdit,
}) => {
  const [formData, setFormData] = useState<Task>({ ...task });

  useEffect(() => {
    setFormData({ ...task }); // Atualiza local ao mudar a task
  }, [task]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Como priority e status são enums, pode precisar converter o value para enum correto
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onUpdate(formData);
  };

 const handleDelete = () => {
  if (window.confirm("Tem certeza que deseja deletar esta tarefa?")) {
    console.log("Chamando onDelete com id:", task.id);
    onDelete(task.id);
  }
};

  useEffect(() => {
  console.log("TaskDetail task prop:", task);
  setFormData({ ...task });
}, [task]);

  return (
    <div className={`task-detail__container ${className ?? ""}`}>
      <div className="task-detail-header">
        <button className="delete-button" onClick={handleDelete}>
           <svg className="header__SVG">
            <use xlinkHref="/icons.svg#lixeira" />
          </svg>
        </button>
        <button className="close-panel" onClick={onClose}>
          ×
        </button>
      </div>

      <div className="task-detail-content">
        <label>
          Título:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            disabled={!canEdit}
            placeholder="Insira o título da task"
          />
        </label>

        <label>
          Pessoa designada:
          <input
            type="text"
            name="ownerEmail"
            value={formData.ownerEmail}
            onChange={handleChange}
            disabled={!canEdit}
            placeholder="Insira o email do responsável task"
          />
        </label>

        <label>
          Status:
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            disabled={!canEdit}
          >
            <option value="cancelled">Cancelado</option>
            <option value="backlog">Backlog</option>
            <option value="active">Em andamento</option>
            <option value="finished">Concluído</option>
          </select>
        </label>

        <label>
          Prioridade:
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            disabled={!canEdit}
          >
            <option value="low">Baixa</option>
            <option value="medium">Média</option>
            <option value="high">Alta</option>
          </select>
        </label>

        <label>
          Data inicial:
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            disabled={!canEdit}
          />
        </label>

        <label>
          Data final:
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            disabled={!canEdit}
          />
        </label>

        <label>
          Descrição:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            disabled={!canEdit}
          />
        </label>

        {canEdit && (
          <button className="save-button" onClick={handleSave}>
            Salvar
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskDetail;
