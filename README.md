

<h1 align="center">
     XMLiser Client API
</h1>

<h3 align="center">
    Uma API de uso simples para gerenciar e importar e exportar clientes em XML.
</h3>


Tabela de conteúdos
=================
<!--ts-->
   * [Sobre o projeto](#-sobre-o-projeto-)
   * [Funcionalidades](#-funcionalidades)
   * [Como executar o projeto](#-como-executar-o-projeto)
     * [Pré-requisitos](#pré-requisitos)
     * [Criando o Banco de Dados](#user-content--criando-o-banco-de-dados)
     * [Rodando o Backend](#user-content--rodando-o-backend)
   * [Tecnologias](#-tecnologias)
     * [Server](#user-content-server--nodejs----typescript)
   * [Autor](#-autor)
<!--te-->


## 🔵 Sobre o projeto 🔵

API para gerenciamento de clientes, importação e exportação desses clientes por XML. Esta APi foi desenvolvida como uma avaliação para um processo seletivo.

---

## ⚙️ Funcionalidades

<h4 align="center">
    Usuários
</h4>

Crud completo de usuários, com criação, listagem com paginação, listagem de um usuário, update e delete.
Também há toda a parte de gerenciamento de acesso com alteração de senha, solicitação de reset de senha e login.

<h4 align="center">
    Clientes
</h4>

Crud completo de cliente, com criação, listagem com paginação, listagem com busca por nome e intervalo entre datas de nascimento, listagem filtrada por cidade, sexo e especie, listagem de um cliente, update, delete, importação e exportação por XML.

<h3 align="center">
    Todas as rotas e seus exemplos de uso constam na coleção postman e coleção insomnia aqui anexados.
</h3>
  
---

## Como executar o projeto

Para executar o projeto é preciso seguir alguns passos.

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/), [MySql](https://www.mysql.com/downloads/). 
Além disto é necessário que possua uma ferramenta para testar serviços RESTful (Web APIs) por meio do envio de requisições HTTP como o [Postman](https://www.postman.com/downloads/) ou o [Insomnia](https://insomnia.rest/download)

#### 🎲 Conectando com Banco de Dados

```bash

# No arquivo .env adicione as credenciais do banco de dados no campo DATABASE_URL conforme o exemplo presente no arquivo .env.example


```

#### ⚙️ Rodando o Backend

```bash

# Clone este repositório

# Acesse a pasta do projeto no terminal/cmd

# Em seu terminal/cmd instale as dependências

# Execute as migrations do projeto
$ yarn prisma migrate dev

# Builde a aplicação 
$ yarn build

# Execute a aplicação em modo de produção
$ yarn start

# Ou execute a aplicação em modo de desenvolvimento
$ yarn dev

# O servidor inciará na porta:3359 - acesse http://localhost:3359
```

#### Utilizando a API

Para utilizar a API basta inicir um novo projeto sua ferramenta de teste de API e adicionar a URL padrão http://localhost:3359. 
Abaixo as coleções para uso nas ferramentas de teste de API.


## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

####**Server**  ([NodeJS](https://nodejs.org/en/)  +  [TypeScriptScript](https://www.typescriptlang.org/))

-   **[Express](https://expressjs.com/)**
-   **[CORS](https://expressjs.com/en/resources/middleware/cors.html)**
-   **[Prisma](https://www.prisma.io/)**
-   **[MySql](https://www.mysql.com/downloads/)**
-   **[BcryptJS](https://github.com/shaneGirish/bcrypt-nodejs)**
-   **[JsonWebToken](https://github.com/auth0/node-jsonwebtoken)**
-   **[Multer](https://github.com/expressjs/multer)**
-   **[XML2Js](https://github.com/Leonidas-from-XIV/node-xml2js)**
-   **[XMLBuilder](https://github.com/oozcitak/xmlbuilder-js)**


#### **Utilitários**

-   Teste de API:  **[Insomnia](https://insomnia.rest/)**
-   Coleção Insominia:  [Insomnia](https://github.com/LeonardoSAfonso/Client-XMLiser/blob/main/Insomnia%20-%20XMLiser.json)
-   Coleção Postman:  [Postman](https://github.com/LeonardoSAfonso/Client-XMLiser/blob/main/Postaman%20-%20XMLiser.json)

---

Para o front-end em angular, acesse clone o repositorio no link abaixo

- https://github.com/LeonardoSAfonso/Client-XMLiser-front

Instale suas dependencias e o inicie com 
yarn ng serve -o

Para facilitar todo o entendimento segue o passo a passo de toda a instalação e utilização do projeto.
 - [Passo a Passo](https://drive.google.com/file/d/1aLl8_Ih4v-F7dzPeTd_NswSuoOXK9_Pp/view?usp=sharing)

## Autor

[Leonardo Afonso](https://github.com/LeonardoSAfonso)
 
[![outlook Badge](https://img.shields.io/badge/-leonardo.s_afonso@hotmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:leonardo.s_afonso@hotmail.com)](mailto:leonardo.s_afonso@hotmail.com)

---
