import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import { setAuthToken } from "../services/Api";
import { useAuth } from "../context/AuthContext";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();
  const { setToken } = useAuth();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert("Preencha todos os campos");
      return;
    }

    try {
      const token = await register({ name, email, password, role });

      sessionStorage.setItem("token", token);
      setAuthToken(token);
      setToken(token);

      setTimeout(() => navigate("/todo"), 50);
    } catch (err) {
      alert("Erro ao registrar");
    }
  };


  return (
    <div className="register-form__container">
      <h2>Cadastro de usuário</h2>
      <form className="register-form__internal-container">
        <div className="register-input__box">
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="register-input__box">
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="register-input__box">
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="register-input__box">
          <label htmlFor="confirm-password">Confirmar senha:</label>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className="register-role-selection">
          <select
            name="role"
            id="role"
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Cargo</option>
            <option value="Adm">PO/SM</option>
            <option value="Dev">Desenvolvedor</option>
          </select>
        </div>

        <button onClick={handleRegister} className="register-button">
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default Register;
