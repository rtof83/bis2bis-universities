# Projeto Universidades

## O projeto tem como objetivo varrer uma API externa para obter uma lista de universidades contidas em cada país previamente informados nas configurações iniciais.

&nbsp;

## Conteúdo
- [Construção](#construção)
- [Instalação e Inicialização](#instalação-e-inicialização)
- [Acesso à Aplicação](#a-aplicação-pode-ser-acessada-através-dos-links)
- [Configurações](#configurações)
- [Estrutura da Base de Dados](#estrutura-da-base-de-dados)
- [Implementações API](#implementações-api)
- [Exemplos Inserção / Atualização](#exemplos-de-inserção--atualização)
- [Estrutura Grupo de Acesso](#estrutura-grupo-de-acesso)
- [Implementações WEB](#implementações-web)

&nbsp;

## Construção:

| Recursos          |                                         |
| ----------------- | --------------------------------------- |
| `API`             | Node 17                                 |
| `WEB`             | React 18                                |
| `Base de Dados`   | MongoDB                                 |
| `ODM`             | Mongoose                                |
| `Conteinerização` | Docker                                  |
| `Autenticação`    | JWT                                     |
| `Testes`          | Jest                                    |
| `Ferramentas`     | Visual Studio Code 1.74.2               |
|                   | Console de Gerenciamento da AWS         |
|                   | Console de Gerenciamento MongoDB Atlas  |

<!-- --- -->
&nbsp;

## Instalação e Inicialização:

- npm (/api):
    - npm install;
    - npm start;

- npm (/web):
    - npm install;
    - npm start;

- Docker (build /api e /web):
    - docker build -t {imagem} .;
    - docker run -p {porta}:{porta} -d {imagem};

- Docker (compose):
    - construção de ambos os projetos (/raiz):
        - docker-compose up;

- Testes (/api/tests):
    - npm install;
    - npx jest nome-do-arquivo;

- porta padrão API: [configuração inicial .env](https://github.com/rtof83/bis2bis-universities/blob/main/api/.env.example);

- porta padrão WEB: 3000;

- usuário padrão:
  ```JavaScript
  user: admin
  password: admin
  ```

- ### a aplicação pode ser acessada através dos links:
  - WEB (armazenado em instância Amazon S3)
    - http://bis2bis-uni.s3-website-us-east-1.amazonaws.com
  - API (instanciada em EC2 AWS)
    - http://3.92.70.204:3001

<!-- --- -->
&nbsp;

## Configurações

- [WEB - conexão com a API](https://github.com/rtof83/bis2bis-universities/blob/main/web/src/api.js);

- [ENV - variáveis de ambiente - configuração inicial](https://github.com/rtof83/bis2bis-universities/blob/main/api/.env.example) <strong>(antes da inicialização, deve ser renomeado para .env):</strong>

  exemplo configuração:

  ```javascript
  DB_USER = user             |
  DB_PASS = password         |
  DB_CLUSTER = cluster       |--> parâmetros base de dados
  DB_URL = url.mongodb.net   |
  DB_NAME = dbname           |

  PORT = 3001                # -> porta API

  SECRET = secret_word       # -> chave utilizada para geração / autenticação do token

  UPDATE_HOUR = 24           # -> intervalo (em horas) que a aplicação atualiza automaticamente a lista de universidades


  ### initial config to database (configuração que será exportada para a collection "config")

  PER_PAGE = 20              # -> número de registros por página (listas)

  TIMEOUT = 600000           # -> 'ms' or 'h' or 'd' (tempo de sessão)

  URL_CONFIG = http://universities.hipolabs.com/search?country=
  COUNTRIES_CONFIG = argentina, brazil, chile, colombia, paraguay, peru, suriname, uruguay
  ```

- [Dockerfile (api):](https://github.com/rtof83/bis2bis-universities/blob/main/api/Dockerfile)

  ``` javascript
  FROM node:alpine

  WORKDIR /app/universities-api

  COPY ./package*.json ./

  RUN npm install

  COPY . .

  EXPOSE 3001

  CMD ["npm", "start"]
  ```

- [Dockerfile (web):](https://github.com/rtof83/bis2bis-universities/blob/main/web/Dockerfile)

  ``` javascript
  FROM node:16

  WORKDIR /app/universities-web

  COPY ./package*.json ./

  RUN npm install

  COPY . .

  EXPOSE 3000

  CMD ["npm", "start"]
  ```

- [docker-compose:](https://github.com/rtof83/bis2bis-universities/blob/main/docker-compose.yml)

  ``` javascript
  version: "3"

  services:

  dockerapi:
      build: ./api
      ports:
      - "3001:3001"
      
  dockerweb:
      build: ./web
      ports:
      - "3000:3000"
  ```

<!-- --- -->
&nbsp;

## Estrutura da Base de Dados:

- [Universidade (University):](https://github.com/rtof83/bis2bis-universities/blob/main/api/models/University.js)

  ```javascript
  alpha_two_code: String
  web_pages: Array
  name: String
  country: String
  domains: Array
  'state-province': String
  ```

- [Usuário (User):](https://github.com/rtof83/bis2bis-universities/blob/main/api/models/User.js)

  ```javascript
  name: String
  email: String
  password: String
  access: String
  ```

- [Grupo (Group):](https://github.com/rtof83/bis2bis-universities/blob/main/api/models/Group.js)

  ```javascript
  name: String
  POST: Object
  DELETE: Object
  PUT: Object
  GET: Object
  ```

- [Configuração (Config):](https://github.com/rtof83/bis2bis-universities/blob/main/api/models/Config.js)

  ```javascript
  url: String
  countries: Array
  perPage: Number
  timeOut: Number
  ```

- [Log:](https://github.com/rtof83/bis2bis-universities/blob/main/api/models/Log.js)

  ```javascript
  lastUpdate: Date
  message: String
  ```

<!-- --- -->
&nbsp;

### Implementações API:

- [Collections Postman](https://github.com/rtof83/bis2bis-universities/blob/main/samples/universities.postman_collection.json);

- Rotas de acesso:

  - <strong>Padrão</strong> (rotas que retornam todos os [métodos](https://github.com/rtof83/bis2bis-universities/blob/main/api/methods/index.js) de forma automatizada através dos [modelos](https://github.com/rtof83/bis2bis-universities/blob/main/api/models/index.js) informados)

    - UNIVERSITIES

      | GET                                                                 |                                                                       |
      | ------------------------------------------------------------------  | --------------------------------------------------------------------- |
      | `{baseURL}/universities`                                            | retorna todas universidades                                           |
      | `{baseURL}/universities/{id}`                                       | retorna universidade por id                                           |
      | `{baseURL}/universities?page={page}`                                | retorna universidades por paginação                                   |
      | `{baseURL}/universities?name={name}`                                | retorna universidades por nome                                        |
      | `{baseURL}/universities?country={country}`                          | retorna universidades por país                                        |
      | `{baseURL}/universities?country={country}&name={name}`              | retorna universidades por país e nome                                 |
      | `{baseURL}/universities?page={page}&country={country}&name={name}`  | retorna universidades por paginação, país e nome                      |


      | POST                                                                |                                                                       |
      | ------------------------------------------------------------------- | --------------------------------------------------------------------- |
      | `{baseURL}/universities`                                            | cadastra universidade                                                 |


      | PUT                                                                 |                                                                       |
      | ------------------------------------------------------------------- | --------------------------------------------------------------------- |
      | `{baseURL}/universities/{id}`                                       | atualiza universidade                                                 |


      | DELETE                                                              |                                                                       |
      | ------------------------------------------------------------------- | --------------------------------------------------------------------- |
      | `{baseURL}/universities/{id}`                                       | exclui universidade                                                   |

      &nbsp;

    - USERS

      | GET                                                                 |                                                                       |
      | ------------------------------------------------------------------- | --------------------------------------------------------------------- |
      | `{baseURL}/users`                                                   | retorna todos usuários (access: admin)                                |
      |                                                                     | retorna somente o usuário requisitante (access: user)                 |
      | `{baseURL}/users/{id}`                                              | retorna usuário por id                                                |
      | `{baseURL}/users?page={page}`                                       | retorna usuários por paginação                                        |
      | `{baseURL}/users?name={name}`                                       | retorna usuários por nome                                             |
      | `{baseURL}/users?page={page}&name={name}`                           | retorna usuários por paginação e nome                                 |


      | POST                                                                |                                                                       |
      | ------------------------------------------------------------------- | --------------------------------------------------------------------- |
      | `{baseURL}/users`                                                   | cria usuário                                                          |


      | PUT                                                                 |                                                                       |
      | ------------------------------------------------------------------- | --------------------------------------------------------------------- |
      | `{baseURL}/users/{id}`                                              | atualiza usuário                                                      |


      | DELETE                                                              |                                                                       |
      | ------------------------------------------------------------------- | --------------------------------------------------------------------- |
      | `{baseURL}/users/{id}`                                              | exclui usuário                                                        |

    &nbsp;

  - [Rotas Personalizadas](https://github.com/rtof83/bis2bis-universities/tree/main/api/routes)

    - UNIVERSITIES

      | POST                                                                |                                                                       |
      | ------------------------------------------------------------------- | --------------------------------------------------------------------- |
      | `{baseURL}/create`                                                  | cria lista de universidades a partir da configuração inicial          |

     &nbsp;

    - COUNTRIES

      | GET                                                                 |                                                                       |
      | ------------------------------------------------------------------- | --------------------------------------------------------------------- |
      | `{baseURL}/countries`                                               | lista todos os países das universidades cadastradas na base de dados  |

    &nbsp;

    - LOGIN

      | POST                                                                |                                                                       |
      | ------------------------------------------------------------------- | --------------------------------------------------------------------- |
      | `{baseURL}/login`                                                   | valida autenticação ao sistema através da inserção de usuário e senha |
      | `{baseURL}/validate`                                                | retorna se o usuário possui acesso ao sistema através de token        |

    &nbsp;

    - CONFIG

      | POST                                                                |                                                                       |
      | ------------------------------------------------------------------- | --------------------------------------------------------------------- |
      | `{baseURL}/config`                                                  | retorna as configurações da aplicação                                 |

    
      | PUT                                                                 |                                                                       |
      | ------------------------------------------------------------------- | --------------------------------------------------------------------- |
      | `{baseURL}/config`                                                  | atualiza configurações                                                |

    &nbsp;

    - LOG

      | GET                                                                 |                                                                       |
      | ------------------------------------------------------------------- | --------------------------------------------------------------------- |
      | `{baseURL}/log`                                                     | retorna lista de logs (ordem descrescente de data)                    |


      | DELETE                                                              |                                                                       |
      | ------------------------------------------------------------------- | --------------------------------------------------------------------- |
      | `{baseURL}/log`                                                     | exclui toda a lista                                                   |

    &nbsp;

    - GROUP

      | GET                                                                 |                                                                       |
      | ------------------------------------------------------------------- | --------------------------------------------------------------------- |
      | `{baseURL}/group`                                                   | retorna lista de grupo de acesso                                      |

&nbsp;

- [Middlewares:](https://github.com/rtof83/bis2bis-universities/tree/main/api/middlewares)

  - checkUniversity:
    - verifica se registro já existe ao tentar cadastrar nova universidade (nome, país e estado);

  - checkUser:
    - verifica se registro já existe ao tentar cadastrar novo usuário (nome);

  - checkAdminDel:
    - ao excluir usuário, verifica se existe ao menos um administrador na base de dados;

  - checkRoute:
    - valida cada rota de acesso através do nível de permissão dos grupos de acesso;

  - checkValidate:
    - retorna permissão de acesso através do token informado;

&nbsp;

- [Serviços:](https://github.com/rtof83/bis2bis-universities/tree/main/api/services)

  - createUniversities:
    - retorna lista de universidades a partir da configuração inicial;
    - será requisitado automaticamente de acordo com a variável UPDATE_HOUR (.env) ou ainda através do endpoint {baseURL}/create;
    - é gerado um log a cada solicitação;

  - updateHour:
    - executa o serviço createUniversities a partir da periodicidade informada em UPDATE_HOUR (.env);

  - initialConfig, initialGroup, initialUniversities, initialUser:
    - envia ao banco de dados as informações iniciais caso não existam (.env);

&nbsp;

- [Testes (endpoints):](https://github.com/rtof83/bis2bis-universities/tree/main/api/tests)

  - config:
    - get config;
    - get complete config;

  - log:
    - get logs;
    - delete logs;

  - user:
    - get users list;
    - get user by id;
    - create user;
    - return error when create same user;
    - update user;
    - delete user;

  - university:
    - get countries list;
    - get universities list;
    - get university by id;
    - create university;
    - return error when create same university;
    - update university;
    - delete university;

&nbsp;

### Exemplos de inserção / atualização

- Universidade:

  ```javascript
  {
      "alpha_two_code": "BR",
      "web_pages": ["page1@page.com", "page2@page.com"],
      "name": "University",
      "country": "Brazil",
      "domains": ["uni.br", "uni.org"],
      "state-province": "AA"
  }
  ```

- Usuário:

  ```javascript
  {
    "name": "user",
    "email": "user@email.com",
    "password": "pass",
    "access": "admin"
  }
  ```

- Config:

  ```javascript
  { 
    "url": "http://universities.hipolabs.com/search?country=",
    "countries": ["argentina", "brazil", "chile", "colombia", "paraguay", "peru", "suriname", "uruguay"],
    "perPage": 10,
    "timeOut": 600000
  }
  ```

&nbsp;

### Estrutura Grupo de Acesso

- admin:
  - acesso completo aos métodos, rotas e recursos WEB;

  ```javascript
  {
    "name": "admin",
    "POST": { "grant": "all" },
    "DELETE": { "grant": "all" },
    "PUT": { "grant": "all" },
    "GET": { "grant": "all" }
  }
  ```

- user:
  - acesso negado ao método POST (qualquer rota);
  - acesso ao método DELETE e GET apenas à rota /users e restrito ao usuário que a acessa;
  - acesso ao método PUT: completo na rota /universities e restrito ao usuário que acessa a rota /users;
  - acesso restrito WEB (cadastro, log e configurações);

  ```javascript
  {
    "name": "user",
    "POST": { "grant": "none" },
    "DELETE": { "grant": { "/users": "self" } },
    "PUT": { "grant": { "/universities": "all", "/users": "self" } },
    "GET": { "grant": { "/users": "self" } }
  }
  ```

&nbsp;

### Implementações WEB:
- Cadastro, alteração e exclusão de Universidade;
- Cadastro, alteração e exclusão de Usuário;
- Configurações;
- Login;
- Temporizador de sessão;

- Lista Universidades:
  - Busca por ID;
  - Busca por Nome;
  - Busca por País;
  - Busca combinada;
  - Paginação;

- Lista Usuários:
  - Busca por ID;
  - Busca por nome;
  - Paginação;
