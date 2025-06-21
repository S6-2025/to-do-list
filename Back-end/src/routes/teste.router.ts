// Em algum lugar do seu projeto, talvez um arquivo de utilidades do banco

import { sql } from '../DB/Database'; // Certifique-se que o caminho está correto

interface ColunaInfo {
    column_name: string;
    data_type: string;
    is_nullable: 'YES' | 'NO';
    column_default: string | null;
}

async function listarColunasDeTabela(nomeDaTabela: string): Promise<any> {
  try {
    console.log(`Buscando as colunas da tabela "${nomeDaTabela}"...`);

    const colunas = await sql`
      SELECT
        column_name,
        data_type,
        is_nullable,
        column_default
      FROM
        information_schema.columns
      WHERE
        table_name = ${nomeDaTabela} AND table_schema = 'public'
      ORDER BY
        ordinal_position;
    `;

    if (colunas.length === 0) {
        console.warn(`Nenhuma coluna encontrada para a tabela "${nomeDaTabela}" ou a tabela não existe.`);
    } else {
        console.log(`Colunas da tabela "${nomeDaTabela}":`);
        colunas.forEach(coluna => {
            console.log(`- ${coluna.column_name} (Tipo: ${coluna.data_type}, Nula: ${coluna.is_nullable})`);
        });
    }

    return colunas;

  } catch (error) {
    console.error(`Ocorreu um erro ao listar as colunas da tabela "${nomeDaTabela}":`, error);
    throw error;
  }
}

async function listarTabelasDisponiveis() {
  try {
    console.log("Buscando a lista de tabelas no banco de dados...");
    
    const tabelas = await sql`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `;
    
    // A variável 'tabelas' será um array de objetos. Ex: [{ table_name: 'users' }, { table_name: 'tasks' }]
    console.log("Tabelas encontradas:");
    tabelas.forEach(tabela => {
        console.log(`- ${tabela.table_name}`);
    });

    return tabelas;

  } catch (error) {
    console.error("Ocorreu um erro ao listar as tabelas:", error);
    throw error; // Lança o erro para quem chamou a função poder tratar
  }
}

export { listarColunasDeTabela, listarTabelasDisponiveis };