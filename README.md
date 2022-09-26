# Sobre o Projeto
Este projeto foi elaborado no challenge Back-end edição 4 da Alura.

---
<h4>DETALHES SOBRE O PROJETO :</h4>
Em apenas quatro semanas desenvolver uma API Rest de uma aplicação de controle financeiro, realizar validações de regras de negócio, implementar um relatório de informações e um controle de acesso !

* Os challenges são desenvolvidos para que os alunos e alunas da Alura possam colocar em prática tudo o que estão aprendendo.

* Assim saindo da teoria e terá uma experiência real, seguindo os moldes de solicitação, execução e entrega de um projeto para as empresas que você irá trabalhar no futuro.

* Esse projeto foi elaborado para que o aluno esteja mais preparado(a) para o mercado e com um portfólio.
---
<h4>DESAFIO :</h4>
Após alguns testes com protótipos feitos pelo time de UX de uma empresa, foi requisitada a primeira versão de uma aplicação para controle de orçamento familiar. A aplicação deve permitir que uma pessoa cadastre suas receitas e despesas do mês, bem como gerar um relatório mensal.

Os times de frontend e UI já estão trabalhando no layout e nas telas. Para o back-end, as principais funcionalidades a serem implementadas são:

* API com rotas implementadas seguindo as boas práticas do modelo REST
* Validações feitas conforme as regras de negócio
* Implementação de base de dados para persistência das informações
* Serviço de autenticação/autorização para restringir acesso às informações.
---
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
* Recomendado utilizar as mesmas versões das dependências
* Tenha o redis instalado no seu PC 
(windows https://github.com/microsoftarchive/redis/releases/tag/win-3.0.504)
Linux(https://redis.io/download/)
```bash
	"dependencies": {
		"bcrypt": "^5.0.1",
		"body-parser": "^1.20.0",
		"express": "^4.18.1",
		"jsonwebtoken": "^8.5.1",
		"mysql2": "^2.3.3",
		"passport": "^0.6.0",
		"passport-http-bearer": "^1.0.1",
		"passport-local": "^1.0.0",
		"path": "^0.12.7",
		"redis": "^3.0.2",
		"sequelize": "^6.21.4",
		"sequelize-cli": "^6.4.1"
	},
	"devDependencies": {
		"dotenv": "^16.0.1",
		"nodemon": "^2.0.19"
	}
```

* sobre JWT https://jwt.io/introduction

```bash
USER_NAME = seu usuario aqui
DB_PASSWORD = sua senha aqui
DATABASE_NAME = nome de seu bando de dados aqui
DB_HOST = seu host aqui
CHAVE_JWT = sua chave JWT aqui
```
---
<h3>Executando aplicação :</h3>
A API está configurada para rodar na porta 4002 se deseja alterar va até o arquivo <strong>server.js</strong> localizada dentro da pasta <strong>api</strong>, no terminal rode o comando:

```bash
npm run dev
```
---
<h3>Rotas http da API :</h3>

Utilizei o Postman para testar a API você pode utilizar a plataforma de sua preferência !

Nos metodos DELETE foi aplicado um Soft Delete para os dados serem mantidos no banco mesmo após a requisição, para caso o usuário queira restaurar algum dado deletado posteriormente.

---
! IMPORTANTE ⭐

<strong>Apague as chaves { } e preencha com a informação</strong>

Após o login de usuário na rota (http://localhost:4002/usuarios/login) copie o Token de Authorization nos Headres da resposta da requisição e o copie nas proximas requisições que desejar efetuar na aba Authorization no tipo Bearer Token, por padrão configurei o token para expirar em 24hrs ou no momento do logout se desejar alterar o tempo de expiração vá até a pasta <strong>controllers</strong> no arquivo <strong>usersController.js</strong> e faça a alteração na função criarTokenJWT

---
* <strong>GET usuários</strong>

Listar usuário /
Listar usuário por ID / 
Logout de usuário

```bash
http://localhost:4002/usuarios
http://localhost:4002/usuarios/{id}
http://localhost:4002/usuarios/logout
```
---
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
---
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
---
* <strong>DELETE usuários</strong>

Deletar usuário :
```bash
http://localhost:4002/usuarios/{id}
```
---
* <strong>GET receitas</strong>

Listar receitas / Listar receitas por ID / Listar receitas por Ano e Mês
```bash
http://localhost:4002/receitas
http://localhost:4002/receitas/{id}
http://localhost:4002/receitas/{ano}/{mes}
```
---
* <strong>POST receitas</strong>

Cadastrar receita :
```bash
http://localhost:4002/receitas

exemplo BODY :

{
    "descricao": "salário",
    "valor": "3000",
    "data": "2022-09-02"
}
```
Restaurar receita deletada: 
```bash
http://localhost:4002/receitas/{id}/restaura
```
---
* <strong>PUT receitas</strong>

Alterar receita :
```bash
http://localhost:4002/receitas/{id}

exemplo BODY :

{
    "descricao": "",
    "valor": "",
    "data": ""
} 
```
---
* <strong>DELETE receitas</strong>

Deletar receita :
```bash
http://localhost:4002/receitas/{id}
```
---
* <strong>GET despesas</strong>

Listar despesas / Listar despesa por ID / Listar despesas por Ano e Mês
```bash
http://localhost:4002/despesas
http://localhost:4002/despesas/{id}
http://localhost:4002/despesas/{ano}/{mes}
```
---
* <strong>POST despesas</strong>

Cadastrar despesa :
```bash
http://localhost:4002/despesas

exemplo BODY :

{
    "descricao": "Compras",
    "categoria": "Alimentação",
    "valor": "900",
    "data": "2022-09-02"
}
```
Restaurar despesa deletada :
```bash
http://localhost:4002/despesas/{id}/restaura
```
---
* <strong>PUT despesas</strong>

Alterar despesa :
```bash
http://localhost:4002/despesas/{id}

exemplo BODY :

{
    "descricao": "",
    "categoria": "",
    "valor": ""
}
```
---
* <strong>DELETE despesas</strong>

Deletar despesa :
```bash
http://localhost:4002/despesas/{id}
```
---
* <strong>GET resumo</strong>

Listar resumo do Ano e Mês :
```bash
http://localhost:4002/resumo/{ano}/{mes}
```
---
Feito com amor 💗 por Ewerton | https://www.linkedin.com/in/ewpnascimento/