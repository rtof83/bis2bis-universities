# Projeto Universidades

## Foi utilizado para contrução:
- API -> Node;
- FRONT -> React;
- DB -> MongoDB;
- Conteinerização -> Docker;
- Ferramentas:
    - Visual Studio Code 1.73.1;
    - Console de Gerenciamento da AWS;

&nbsp;

## [Estrutura da base de dados:](https://github.com/rtof83/bis2bis-universities/blob/main/api/models/University.js)
- Universidade (University):

```javascript

  alpha_two_code: String,
  web_pages: Array,
  name: String,
  country: String,
  domains: Array,
  'state-province': String

```

&nbsp;

## [Estrutura da configuração inicial:](https://github.com/rtof83/bis2bis-universities/blob/main/api/models/Create.js)

```javascript
{
    url: 'http://universities.hipolabs.com/search?country=',
    countries: [ "argentina",
                 "brazil",
                 "chile",
                 "colombia",
                 "paraguay",
                 "peru",
                 "suriname",
                 "uruguay" ]
}
```

&nbsp;

## Instalação e Inicialização
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

- porta padrão API: [configuração inicial .env](https://github.com/rtof83/bis2bis-universities/blob/main/api/.env.example);
- porta padrão WEB: 3000;

- a aplicação pode ser acessada através do link:
  - http://bis2bis-uni.s3-website-us-east-1.amazonaws.com
  - FRONT armazenado em instância Amazon S3;
  - API instanciada em EC2 AWS:
    - http://18.234.224.108:3001;

&nbsp;

## Configurações
- [API - conexão com a base de dados](https://github.com/rtof83/bis2bis-universities/blob/main/api/database/conn.js);

- [FRONT - conexão com a API](https://github.com/rtof83/bis2bis-universities/blob/main/web/src/api.js);

- [ENV - arquivo de configuração inicial](https://github.com/rtof83/bis2bis-universities/blob/main/api/.env.example) (deve ser renomeado para .env):
  - exemplo de configuração:

  ```javascript
    DB_USER = user
    DB_PASS = password
    DB_CLUSTER = cluster
    DB_URL = url.mongodb.net
    DB_NAME = dbname

    PORT = 3001

    PER_PAGE = 20
  ```

- [Dockerfile (api)](https://github.com/rtof83/bis2bis-universities/blob/main/api/Dockerfile);

    ``` javascript
    FROM node:alpine

    WORKDIR /app/universities-api

    COPY ./package*.json ./

    RUN npm install

    COPY . .

    EXPOSE 3001

    CMD ["npm", "start"]
    ```

- [Dockerfile (web)](https://github.com/rtof83/bis2bis-universities/blob/main/web/Dockerfile);

    ``` javascript
    FROM node:16

    WORKDIR /app/universities-web

    COPY ./package*.json ./

    RUN npm install

    COPY . .

    EXPOSE 3000

    CMD ["npm", "start"]
    ```

- [docker-compose](https://bitbucket.org/recrutamento_jya_nodejs/recrutamento-conversor-nodejs-zuichuan_msn.com/src/master/docker-compose.yml);

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

&nbsp;

&nbsp;

### Implementações API:
- [Collections Postman](https://github.com/rtof83/bis2bis-universities/blob/main/samples/universities.postman_collection.json);

- Rotas de acesso:
    - POST
        - {baseURL}/universities/create -> cria lista de universidades a partir da configuração inicial;
        - {baseURL}/universities -> cadastra universidade;

    - GET
        - {baseURL}/universities -> retorna todos os registros;
        - {baseURL}/universities/{id} -> retorna registro por id;
        - {baseURL}/universities?page={page} -> retorna registros por paginação;
        - {baseURL}/universities?name={name} -> retorna registros por nome;
        - {baseURL}/universities?country={country} -> retorna registros por país;
        - {baseURL}/universities?country={country}&name={name} -> retorna registros por país e nome;
        - {baseURL}/universities?page={page}&country={country}&name={name} -> retorna registros por paginação, país e nome;
        - {baseURL}/universities/countries -> lista todos os países das universidades cadastradas na base de dados;
        - {baseURL}/config -> retorna url da api externa e lista de países a serem consultados;

    - PUT
        - {baseURL}/universities/{id} -> atualiza registro;

    - DELETE
        - {baseURL}/universities/{id} -> exclui registro;

- Middlewares:
    - [checkUniversity](https://github.com/rtof83/bis2bis-universities/blob/main/api/middlewares/checkUniversity.js) -> verifica se registro já existe ao tentar cadastrar (nome, país e estado);

- Buscas:
    - retorna até XX registros por página ([.env -> PER_PAGE](https://github.com/rtof83/bis2bis-universities/blob/main/api/.env.example));

    &nbsp;

    #### exemplo de inserção ou atualização de Universidade

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

&nbsp;

### Implementações FRONT:
- Criação de lista de universidades a partir da configuração inicial;
- Cadastro, alteração e exclusão de Universidade;
- Lista Universidades;
- Busca por ID;
- Busca por Nome;
- Busca por País;
- Busca combinada;
