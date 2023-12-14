# Blogs Api

Neste projeto foi desenvolvido uma API e um banco de dados para a produção de conteúdo para um blog usando `Node.js` com pacote `sequelize` para fazer um `CRUD` de posts.
Os endpoints estão conectados ao banco de dados seguindo os princípios básicos do REST.
O usuário deve fazer login, trabalhando assim a relação entre `user` e `post`.
Além disso, é necessária a utilização de categorias de posts, trabalhando assim a relação de `posts` para `categories` e de `categories` para `posts`.

## 🚀 Começando

<details>
  <summary><strong>🐋 Rodando no Docker vs Localmente</strong></summary>
  
  ## 👉 Com Docker
 
  **:warning: Antes de começar, seu docker-compose precisa estar na versão 1.29 ou superior. [Veja aqui](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04-pt) ou [na documentação](https://docs.docker.com/compose/install/) como instalá-lo. No primeiro artigo, você pode substituir onde está com `1.26.0` por `1.29.2`.**


  > :information_source: Rode os serviços `node` e `db` com o comando `docker-compose up -d --build`.

  - Lembre-se de parar o `mysql` se estiver usando localmente na porta padrão (`3306`), ou adapte, caso queria fazer uso da aplicação em containers;

  - Esses serviços irão inicializar um container chamado `blogs_api` e outro chamado `blogs_api_db`;

  - A partir daqui você pode rodar o container `blogs_api` via CLI ou abri-lo no VS Code;

  > :information_source: Use o comando `docker exec -it blogs_api bash`.

  - Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.

  > :information_source: Instale as dependências [**Caso existam**] com `npm install`. (Instale dentro do container)
  
  - **:warning: Atenção:** Caso opte por utilizar o Docker, **TODOS** os comandos disponíveis no `package.json` (npm start, npm test, npm run dev, ...) devem ser executados **DENTRO** do container, ou seja, no terminal que aparece após a execução do comando `docker exec` citado acima. 

  - **⚠️ Atenção:** O **git** dentro do container não vem configurado com suas credenciais. Ou faça os commits fora do container, ou configure as suas credenciais do git dentro do container.

  - **⚠️ Atenção:** Não rode o comando npm audit fix! Ele atualiza várias dependências do projeto, e essa atualização gera conflitos com o avaliador.

  <br />
  
  ## 👉 Sem Docker

  > :information_source: Instale as dependências [**Caso existam**] com `npm install`
  
  - Lembre-se de usar o prefixo `env $(cat .env)` ao rodar os comandos localmente para carregar as variáveis de ambiente do arquivo `.env`. Por exemplo:
  
    ```bash
    env $(cat .env) npm run dev
    ```
  
  - **⚠️ Atenção:** Não rode o comando `npm audit fix`! Ele atualiza várias dependências do projeto, e essa atualização gera conflitos com o avaliador.

  - **✨ Dica:** Para rodar o projeto desta forma, obrigatoriamente você deve ter o `node` instalado em seu computador.
  - **✨ Dica:** O avaliador espera que a versão do `node` utilizada seja a 16.

  <br/>
</details>

<details>
  <summary><strong>🔧 Instalação</strong></summary>

<br />

1. Clone o repositório
  * `git clone git@github.com:Wesleyhmendes/blogs-api-back-end.git`.
  * Entre na pasta do repositório que você acabou de clonar:
    * `blogs-api-back-end.git`

2. Instale as dependências [**Caso existam**]
  * `npm install`

3. Crie uma branch a partir da branch `master`
  * Verifique que você está na branch `master`
    * Exemplo: `git branch`
  * Se não estiver, mude para a branch `master`
    * Exemplo: `git checkout master`
  * Agora crie uma branch com o nome desejado

<br />
</details>

<details>
  <summary><strong>📋 Requisitos</strong></summary>

<br />


**1 - Crie migrations para as tabelas `users`, `categories`, `blog_posts`, `posts_categories`**
<br />
<br />
**2 - Crie o modelo `User` em `src/models/User.js` com as propriedades corretas**
<br />
<br />
**3 - Sua aplicação deve ter o endpoint POST `/login`**
<br />
<br />
**4 - Sua aplicação deve ter o endpoint POST `/user`**
<br />
<br />
**5 - Sua aplicação deve ter o endpoint GET `/user`**
<br />
<br />
**6 - Sua aplicação deve ter o endpoint GET `/user/:id`**
<br />
<br />
**7 - Crie o modelo `Category` em `src/models/Category.js` com as propriedades corretas**
<br />
<br />
**8 - Sua aplicação deve ter o endpoint POST `/categories`**
<br />
<br />
**9 - Sua aplicação deve ter o endpoint GET `/categories`**
<br />
<br />
**10 - Crie o modelo `BlogPost` em `src/models/BlogPost.js` com as propriedades e associações corretas**
<br />
<br />
**11 - Crie o modelo `PostCategory` em `src/models/PostCategory.js` com as propriedades e associações corretas**
<br />
<br />
**12 - Sua aplicação deve ter o endpoint POST `/post`**
<br />
<br />
**13 - Sua aplicação deve ter o endpoint GET `/post`**
<br />
<br />
**14 - Sua aplicação deve ter o endpoint GET `/post/:id`**
<br />
<br />
**15 - Sua aplicação deve ter o endpoint PUT `/post/:id`**
<br />
<br />
**16 - Sua aplicação deve ter o endpoint DELETE `/post/:id`**
<br />
<br />
**17 - Sua aplicação deve ter o endpoint DELETE `/user/me`**
<br />
<br />
**18 - Sua aplicação deve ter o endpoint GET `/post/search?q=:searchTerm`**
<br />
<br />
</details>


## 🛠️ Construído com

Mencione as ferramentas que você usou para criar seu projeto

* [Node.js](https://nodejs.org/docs/latest/api/) - O software usado
* [npm](https://www.npmjs.com/) - Gerente de Dependência

## 📌 Versão

Nós usamos [Docker](https://www.docker.com/) para controle de versão.

## ✒️ Autores

* **Wesley Mendes** - *Trabalho Inicial* - [Wesley Mendes](https://github.com/Wesleyhmendes)
