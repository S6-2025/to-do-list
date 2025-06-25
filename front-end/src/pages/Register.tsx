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

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword || !role) {
      alert("Preencha todos os campos");
      return;
    }

    if (password !== confirmPassword) {
      alert("As senhas não coincidem");
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
      <form className="register-form__internal-container" onSubmit={handleRegister}>
        <div className="register-input__box">
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome do funcionário"
          />
        </div>

        <div className="register-input__box">
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Insira um email"
          />
        </div>

        <div className="register-input__box">
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Insira uma senha"
          />
        </div>

        <div className="register-input__box">
          <label htmlFor="confirm-password">Confirmar senha:</label>
          <input
            type="password"
            id="confirm-password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirme a senha"
          />
        </div>

        <div className="register-role-selection">
          <select
            id="role"
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="" disabled hidden>
              Cargo
            </option>
            <option value="PO">PO</option>
            <option value="SM">SM</option>
            <option value="EMPLOYEE">Funcionário</option>
          </select>
        </div>

        <button type="submit" className="register-button">
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default Register;
