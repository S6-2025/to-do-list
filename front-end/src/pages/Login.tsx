import React from "react";
import { useState } from "react";
import { login } from "../services/authService";
import { setAuthToken } from "../services/Api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setToken } = useAuth();


const handleLogin = async () => {
  try {
    const token = await login({ email, password });
    sessionStorage.setItem("token", token);
    setAuthToken(token);
    setToken(token); // <<< ISSO É FUNDAMENTAL

    setTimeout(() => {
  navigate("/todo");
}, 50); // 50ms já resolve
  } catch (err) {
    alert("Erro ao logar");
  }
};


  return (
    <main id="login-page__main">
      <div className="login__container">
        <div className="wellcome__container">
          <h1>Bem vindo(a) ao ToTask</h1>
          <img className="kanban__image" src="./kanban.svg" alt="" />
        </div>
        <div className="login-form__container">
          <h2>
            <span>Log</span> in
          </h2>
          <div className="login-form__internal-container">
            <form action="./pages/Login" method="post"></form>
            <div className="login-input__box">
              <label htmlFor="login">E-mail: </label>
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                id="login"
                required
              />
            </div>

            <div className="login-input__box">
              <label htmlFor="password">Senha: </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="login-button__container">
            <button className="login-button" onClick={handleLogin}>
              Entrar
            </button>
            <a className="forgot-password">Esqueci a senha</a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
