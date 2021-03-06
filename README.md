# Proposta
### A API deve conter os seguintes serviços:
- 1º - Serviço para calcular o IMC com os seguintes paramentos: nome,
cpf, altura e peso. O retorno deve conter o IMC obtido e também a
classificação. Lembrando que todos resultados devem ser registrados
em um banco de dados com a data da inserção
- 2º - Serviço para listar todos os cálculos contendo todas as informações
registradas.
- 3º - Serviço para buscar um registro por cpf contendo todas as
informações registradas.

### O front-end precisa conter os seguintes requisitos:
- Tela para cadastro do IMC, seguindo as informações como: nome, cpf,
altura e peso. Depois do cadastro deve exibir uma mensagem do
resultado do primeiro serviço.
- Tela que lista todos os dados cadastrados, usando o segundo serviço.
- Tela que busca o registro por cpf e mostra as informações registradas
usando o terceiro serviço.
- Menu de navegação entre as telas.

# Projeto Angular + NodeJS

Este é um projeto Fullstack feito com Angular 9, Bootstrap, NodeJS, Express e PostgreSQL.

## Instalação

### Node
Primeiramente, faça o download e instale o [Node](https://nodejs.org/en/).

### Angular
Depois disso, instale o Angular mais recente em sua máquina rodando o seguinte comando no prompt de comandos:

```bash
npm install -g @angular/cli
```
### PostgreSQL
Agora, para a instalação do banco de dados, você deve escolher a versão 
adequada para seu sistema operacional no site do [PostgreSQL](https://www.postgresql.org/download/).

## Banco de dados

Abra o pgAdmin

Vá em Restore, escolha o arquivo (selecione o arquivo BittarDB) e clique no botão de restore

## Finalizando

#### No prompt de comando:  

Antes de podermos rodar as aplicações, é necessário instalar todas as dependências, para isso, acesse suas respectivas pastas e rode o seguinte comando:
``` bash
npm install
```

Para abrir o servidor do Back-End acesse a pasta da API (bittar-api) e rode o seguinte comando:

```bash
npm run dev
```
Para abrir o servidor do Front-End acesse a pasta da Aplicação (bittar-app) e rode o seguinte comando:

```bash
ng serve
```

## Licensa
[MIT](https://choosealicense.com/licenses/mit/)
