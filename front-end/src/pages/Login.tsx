import { useState } from "react";

const Login: React.FC = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => { e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json",},
      body: JSON.stringify({ login, password }),
    });
      if (response.ok) {
        const data = await response.json();
        console.log("Login bem-sucedido:", data);
        // Aqui você pode redirecionar, salvar token, etc
      } else {
        console.error("Erro ao fazer login");
      }
    } catch (error) {
      console.error("Erro de rede:", error);
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
                  <h2><span>Log</span> in</h2>

                  <div className="login-form__internal-container">
                      <form onSubmit={handleSubmit}>
                          <div className="login-input__box">
                              <label htmlFor="login">E-mail: </label>
                              <input
                              type="text"
                              id="login"
                              name="login"
                              required
                              value={login}
                              onChange={(e) => setLogin(e.target.value)}
                              />
                          </div>

                          <div className="login-input__box">
                              <label htmlFor="password">Senha: </label>
                              <input
                              type="password"
                              id="password"
                              name="password"
                              required
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              />
                          </div>

                          <div className="login-button__container">
                              <button className="login-button" type="submit">Entrar</button>
                          </div>
                      </form>

                      <a className="forgot-password">Esqueci a senha</a>
                  </div>
              </div>
          </div>
      </main>
  );
};

export default Login;