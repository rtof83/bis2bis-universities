# Projeto Universidades

## Foi utilizado para contrução:
- API -> Node;
- FRONT -> React;
- DB -> MongoDB;
- Ferramentas:
    - Visual Studio Code 1.71.2;
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

    url: 'http://universities.hipolabs.com/search?country=',
    countries: [ "argentina",
                 "brazil",
                 "chile",
                 "colombia",
                 "paraguay",
                 "peru",
                 "suriname",
                 "uruguay" ]
```

&nbsp;

## Instalação
- /api -> npm install;
- /web -> npm install;

&nbsp;

## Inicialização
- /api -> npm start;
- /web -> npm start;
- porta padrão API: 3001;
- porta padrão WEB: 3000;

&nbsp;

## Configurações
- [API - conexão com a base de dados](https://github.com/rtof83/bis2bis-universities/blob/main/api/database/conn.js);
- [FRONT - conexão com a API](https://github.com/rtof83/bis2bis-universities/blob/main/web/src/api.js);

&nbsp;

### a aplicação pode ser acessada através do link:
- http://bis2bis-universities.s3-website-us-east-1.amazonaws.com
    - FRONT armazenado em instância Amazon S3;
    - API instanciada em EC2 AWS:
        - http://34.235.154.60:3001;

&nbsp;

### Implementações API:
- [Collections Postman](https://github.com/rtof83/bis2bis-universities/blob/main/samples/universities.postman_collection.json);

- Rotas de acesso (para os métodos GET, POST, DELETE E PUT):
    - {baseURL}/universities -> retorna, cria, atualiza, exclui registros;

- Rota de acesso (para o método POST):
    - {baseURL}/universities/create -> cria lista de universidades a partir da configuração inicial;

- Rotas de acesso (para o método GET):
    - {baseURL}/universities/countries -> retorna lista de países das universidades cadastradas;

- Rotas de busca:
    - {baseURL}/universities/:id -> retorna registro por ID;
    - {baseURL}/universities?country={country} -> retorna registros por país;
    - {baseURL}/universities?country={country}&name={name} -> retorna registros por país e nome;
    - {baseURL}/universities?page={page}&country={country}&name={name} -> retorna registros por país, nome e paginação;

- Buscas:
    - retorna 20 registros por página;

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
- Cadastro, alteração e exclusão de Universidades;
- Lista Universidade;
- Busca por ID;
- Busca por Nome;
- Busca por País;
