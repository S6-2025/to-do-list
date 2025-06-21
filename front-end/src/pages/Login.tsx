const Login: React.FC = () => {

    
    return(
        <main id="login-page__main">
            <div className="login__container">

                <div className="wellcome__container">
                    <h1>Bem vindo(a) ao ToTask</h1>
                    <img className="kanban__image" src="./kanban.svg" alt="" />
                </div>
                <div className="login-form__container">
                    <h2><span>Log</span> in</h2>
                    <div className="login-form__internal-container">
                    {/* Username */}
                        <form action="./pages/Login" method="post"></form>
                        <div  className="login-input__box">
                            <label htmlFor="login">E-mail: </label>
                            <input type="text" id="login" name="login" required />
                        </div>
                    {/* Senha */}
                        <div className="login-input__box">
                            <label htmlFor="password">Senha: </label>
                            <input type="password" id="password" name="password" required />
                        </div>
                    </div>
                    <div className="login-button__container">
                        <button className="login-button" type="submit">Entrar</button>
                        <a className="forgot-password">Esqueci a senha</a>
                    </div>
                </div>

            </div>

        </main>
    )
}

export default Login;