import React from "react";

const Register: React.FC = () => {




  return (
    <div className="register-form__container">
      <h2>
        Cadastro de usuário
      </h2>
      <form className="register-form__internal-container">
        {/* E-mail */}
        <div className="register-input__box">
          <label htmlFor="email">E-mail:</label>
          <input type="email" id="email" name="email" required />
        </div>

        {/* Senha */}
        <div className="register-input__box">
          <label htmlFor="password">Senha:</label>
          <input type="password" id="password" name="password" required />
        </div>


        {/* Confirmar senha */}
        <div className="register-input__box">
          <label htmlFor="confirm-password">Confirmar senha:</label>
          <input type="password" id="confirm-password" name="confirm-password" required />
        </div>

        <div className="register-role-selection">
          <select name="role" id="role" required>
            <option value="">Cargo</option>
            <option value="Adm">PO/SM</option>
            <option value="Dev">Desenvolvedor</option>
          </select>
        </div>



        <button className="register-button" type="submit">
          Cadastrar 
        </button>
      </form>
    </div>
  );
};

export default Register;