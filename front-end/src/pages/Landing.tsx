import React from "react";

const Landing: React.FC = () => {
  return (
    <main className="landing__container">
      <div className="image-landing-container">
        <img className="landing__image" src="./kanban.svg" alt="" />
      </div>

      <div className="text-landing-container">
        <h1>ToTask</h1>
        <h2> Kanban simples e eficiente para sua empresa</h2>
        <p>
          Gerenciar tarefas nunca foi tão fácil. ToTask oferece uma ferramenta
          funcional e prática de Kanban, sem complicações ou excesso de
          recursos.
          <br />   <br />
           Com quatro colunas essenciais — Backlog, Em andamento,
          Concluído e Cancelados — sua equipe visualiza o fluxo completo do
          trabalho, incluindo as tarefas que foram canceladas ou pausadas, para
          manter o controle total do que acontece no projeto. 
        
          <br />   <br />  Ideal para times que querem
          simplicidade, clareza e controle na gestão de suas atividades.
          Experimente ToTask e volte ao básico com toda a eficiência que seu
          negócio merece.
        </p>

        <button>Start Now</button>
      </div>

    </main>
  );
};

export default Landing;
