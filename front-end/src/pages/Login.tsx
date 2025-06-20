import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserLoginForm } from "../hooks/userLoginForm";

const Login: React.FC = () => {
  

  return (
    <main className="super-container" id="super-container-form">
      <div className="login-textImg">
        <h1>Faça login e começe a ter uma vida mais saudável</h1>
        <svg>
          <use xlinkHref="/icons.svg#healthy-options" />
        </svg>
      </div>
      <div className="login-form">
        <section className="super-form">
          <div className="logo-block">
            <div className="logo">
              <svg className="header__SVG" id="apple-login">
                <use xlinkHref="/icons.svg#apple" />
              </svg>
              <p>NutriFacil</p>
            </div>
          </div>

          <form onSubmit={handleFormSubmit}>
            <div className="camps">
              <label htmlFor="username-login">Username:</label>
              <input
                type="text"
                id="username-login"
                value={username}
                onChange={handleUsernameChange}
                autoComplete="username"
                name="username-login"
                placeholder="Digite seu username"
              />
            </div>

            <div className="camps">
              <label htmlFor="password-login">Senha:</label>
              <input
                type="password"
                id="password-login"
                value={password}
                onChange={handlePasswordChange}
                autoComplete="current-password"
                name="password-login"
                placeholder="Digite sua senha"
              />
            </div>

            <button type="submit">LogIn</button>
          </form>

          <p className="message-login-register">
            Não tem conta ainda?{" "}
            <Link className="link" to="/register">
              Cadastrar
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
};

export default Login;