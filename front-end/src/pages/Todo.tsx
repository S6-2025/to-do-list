import React from 'react'
import { Link } from 'react-router-dom'

const Todo: React.FC = () => {
  return (
    <main className="super-container" >
        <div className="personalize-container">
          <section className="text-button-block">
            <h1>Personalize suas dietas!</h1>
            <span>🍎Descubra o que funciona para você de forma prática e rápida.</span>
            <p>
              Se você quer melhorar sua alimentação, mas não sabe por onde começar, responda nosso rápido questionário e receba
              recomendações personalizadas com base no seu perfil, objetivos e preferências alimentares.
              <br /><br />
              Nosso objetivo é tornar a nutrição simples, acessível e adaptada à sua rotina.
            </p>
            <div className="button-wrapper">
            <Link to="/questionary"><button type="button">Comece Agora!</button> </Link>
          </div>
          </section>
          <img src="/frutas_semfundo.PNG" alt="Frutas" id="fruits1" />
        </div>

{/* waves aqui */}
      <section className="section-divider">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" aria-hidden="true" focusable="false">
          <path
            fill="#DBFFD0"
            fillOpacity="1"
            d="M0,256L48,240C96,224,192,192,288,192C384,192,480,224,576,224C672,224,768,192,864,176C960,160,1056,160,1152,160C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </section>
{/* waves acaba aqui */}

      <div className="liberty-container">
        <section className="text-button-block" id="block2">
          <h1>Liberdade de escolha!</h1>
          <p>
            Escolha qual dieta seguir, com base nos alimentos que mais gosta.
            <br />
            Utilizamos como base as rotinas de dietas cetogênica, vegetariana, mediterrânea e low carb.
          </p>
          <div className="button-wrapper">
            <Link to="/questionary"><button type="button">Montar minha dieta</button> </Link>
          </div>
        </section>
        <div className="healthy-options-img-container">
          <svg><use xlinkHref="/icons.svg#healthy-options"/></svg>
        </div>
      </div>
    </main>
  )
}

export default Todo