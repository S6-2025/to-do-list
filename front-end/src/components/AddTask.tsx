import React, { useState } from "react";
import { TaskStatus, TaskPriority } from "../utils/TasksTypes";

type AddTaskProps = {
  onAdd: (task: {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    priority: TaskPriority;
    status: TaskStatus;
    ownerEmail: string;
  }) => void;
};

const AddTask: React.FC<AddTaskProps> = ({ onAdd }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("MEDIUM");
  const [status, setStatus] = useState<TaskStatus>("BACKLOG");
  const [ownerEmail, setOwnerEmail] = useState("");

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleAddTask = () => {
    if (
      !title.trim() ||
      !description.trim() ||
      !startDate ||
      !endDate ||
      !priority ||
      !status ||
      !ownerEmail.trim()
    ) {
      alert("Preencha todos os campos.");
      return;
    }

    onAdd({
      title,
      description,
      startDate,
      endDate,
      priority,
      status,
      ownerEmail,
    });

    // resetar os campos
    setTitle("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    setPriority("MEDIUM");
    setStatus("BACKLOG");
    setOwnerEmail("");
    closeModal();
  };

  return (
    <div className="add-task__container">
      <button
        className="button-open-addtask"
        onClick={openModal}
        aria-label="Open Add Task"
      >
        +
      </button>

      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              onClick={closeModal}
              aria-label="Close Add Task"
              className="modal-close-button"
            >
              ×
            </button>

            <div className="add-task-form">
              <label>
                Título:
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="Insira o título da task"
                />
              </label>

              <label>
                Descrição:
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  required
                  placeholder="Insira a descrição"
                />
              </label>

              <label>
                Data inicial:
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </label>

              <label>
                Data final:
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </label>

              <label>
                Prioridade:
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as TaskPriority)}
                  required
                >
                  <option value="LOW">Baixa</option>
                  <option value="MEDIUM">Média</option>
                  <option value="HIGH">Alta</option>
                </select>
              </label>

              <label>
                Status:
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as TaskStatus)}
                  required
                >
                  <option value="CANCELLED">Cancelado</option>
                  <option value="BACKLOG">Backlog</option>
                  <option value="ACTIVE">Em andamento</option>
                  <option value="FINISHED">Concluído</option>
                </select>
              </label>

              <label>
                Responsável (email):
                <input
                  type="email"
                  value={ownerEmail}
                  onChange={(e) => setOwnerEmail(e.target.value)}
                  required
                  placeholder="Insira o email do responsável task"
                />
              </label>

              <button className="button-submit-task" onClick={handleAddTask}>
                Criar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTask;
