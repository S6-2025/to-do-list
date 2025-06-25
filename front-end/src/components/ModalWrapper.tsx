import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/ModalWrapper.css";

const ModalWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate();

    return (
        <div className="modal-overlay" onClick={() => navigate(-1)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()} // evita que o clique no conteúdo feche o modal
        >
        <button className="modal-close" onClick={() => navigate(-1)}>×</button>
        {children}
        </div>
        </div>
  );
};

export default ModalWrapper;