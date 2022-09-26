# Sobre o Projeto
Este projeto foi elaborado no challenge Back-end edição 4 da Alura.
<h4>DETALHES SOBRE O PROJETO</h4>
Em apenas quatro semanas desenvolver uma API Rest de uma aplicação de controle financeiro, realizar validações de regras de negócio, implementar um relatório de informações e um controle de acesso !

* Os challenges são desenvolvidos para que os alunos e alunas da Alura possam colocar em prática tudo o que estão aprendendo.

* Assim saindo da teoria e terá uma experiência real, seguindo os moldes de solicitação, execução e entrega de um projeto para as empresas que você irá trabalhar no futuro.

* Esse projeto foi elaborado para que o aluno esteja mais preparado(a) para o mercado e com um portfólio.

<h4>DESAFIO :</h4>
Após alguns testes com protótipos feitos pelo time de UX de uma empresa, foi requisitada a primeira versão de uma aplicação para controle de orçamento familiar. A aplicação deve permitir que uma pessoa cadastre suas receitas e despesas do mês, bem como gerar um relatório mensal.

Os times de frontend e UI já estão trabalhando no layout e nas telas. Para o back-end, as principais funcionalidades a serem implementadas são:

* API com rotas implementadas seguindo as boas práticas do modelo REST
* Validações feitas conforme as regras de negócio
* Implementação de base de dados para persistência das informações
* Serviço de autenticação/autorização para restringir acesso às informações.

<h4>FUNCIONALIDADES :</h4>

* Busca de receitas e despesas por descrição
* Listagem de receitas e despesas de um determinado mês
* Resumo de determinado mês (total de receitas, total de despesas, saldo final e valor total agrupado por categoria)
* Implementar um mecanismo de autenticação na API, para que apenas usuários autenticados possam interagir com ela.

# Tecnologias Utilizadas

* JavaScript
* Node
* Express
* Sequelize
* MySQL
* JWT
* Passport
* Bcrypt
* Redis
* Postman

# Como rodar a API 
Após clonar o projeto e instalar suas dependências instale também as dependências de desenvolvimento (dotenv e nodemon) após as instalações, crie um arquivo na pasta <strong>backend-challenge4-alura</strong> com o nome <strong>.env</strong> (aqui você irá criar suas variáveis de desenvolvimento) copie e cole o codigo abaixo e faça as suas modificações conforme seu banco de dados.
* sobre JWT https://jwt.io/introduction

```bash
USER_NAME = seu usuario aqui
DB_PASSWORD = sua senha aqui
DATABASE_NAME = nome de seu bando de dados aqui
DB_HOST = seu host aqui
CHAVE_JWT = sua chave JWT aqui
```
<h3>Executando aplicação :</h3>
A API está configurada para rodar na porta 4002 se deseja alterar va até o arquivo <strong>server.js</strong> localizada dentro da pasta <strong>api</strong>, no terminal rode o comando:

```bash
npm run dev
```
<h3>Rotas http da API :</h3>

Eu utilizei o Postman para testar a API você pode utilizar a plataforma de sua preferência !

<strong>Apague as chaves { } e preencha com a informação</strong>

Após o login de usuário na rota (http://localhost:4002/usuarios/login) copie o Token de Authorization nos Headres da requisição e o copie nas proximas requisições que desejar efetuar na aba Authorization no tipo Bearer Token!
* <strong>GET usuários</strong>

Listar usuário /
Listar usuário por ID / 
Logout de usuário

```bash
http://localhost:4002/usuarios
http://localhost:4002/usuarios/{id}
http://localhost:4002/usuarios/logout
```
* <strong>POST usuários</strong>

Cadastrar usuário :
```bash
http://localhost:4002/usuarios

exemplo BODY : 

{
    "usuario": "ewerton",
    "email": "ewerton@gmail.com",
    "senha": "ewerton123"
}
```
Login de usuário :
```bash
http://localhost:4002/usuarios/login

exemplo BODY : 

{
    "email": "ewerton@gmail.com",
    "senha": "ewerton123"
}
```
Restaurar usuário deletado : 
```bash
http://localhost:4002/usuarios/{id}/restaura
```
* <strong>PUT usuários</strong>

Alterar nome do usuário :
```bash
http://localhost:4002/usuarios/usuario/{id}

exemplo BODY :

{
    "usuario": ""
}
```
Alterar email do usuário :
```bash
http://localhost:4002/usuarios/email/{id}

exemplo BODY :

{
    "email": ""
}
```
Alterar senha do usuário :
```bash
http://localhost:4002/usuarios/senha/{id}

exemplo BODY :

{
    "senha": ""
}
```
* <strong>DELETE usuários</strong>

Deletar usuário :
```bash
http://localhost:4002/usuarios/{id}
```