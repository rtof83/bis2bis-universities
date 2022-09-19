# Projeto Ecommerce

## Foi utilizado para contrução:
- API -> Node;
- FRONT -> React;
- DB -> MongoDB;
- Ferramentas:
    - Visual Studio Code 1.7.0.2;
    - Console de Gerenciamento da AWS;

&nbsp;

## Estrutura da base de dados:
- [database.sql](https://github.com/rtof83/ecommerce-java-react/blob/main/samples/database.sql);

&nbsp;

## Instalação
- MySQL -> CREATE DATABASE database;
- /api -> mvn clean package;
- /web -> npm install;

&nbsp;

## Inicialização
- /api -> java -jar target/springboot-store-backend-0.0.1-SNAPSHOT.jar;
- /web -> npm start;
- porta padrão: 8080;
- usuário padrão para acesso ao front:
    - email: admin;
    - password: admin;

&nbsp;

## Configurações
- [API - conexão com a base de dados](https://github.com/rtof83/ecommerce-java-react/blob/main/api/src/main/resources/application.properties);
- [FRONT - conexão com a API](https://github.com/rtof83/ecommerce-java-react/blob/main/web/src/api.js);

&nbsp;

### a aplicação pode ser acessada através do link:
- http://ecomm-teste2.s3-website-us-east-1.amazonaws.com
    - FRONT armazenado em instância Amazon S3;
    - Banco de Dados instanciado no AWS RDS:
        - database.c4gffxjofhme.us-east-1.rds.amazonaws.com:3306;
    - API instanciada em EC2 AWS:
        - http://54.205.178.231:8080;

&nbsp;

### Implementações API:
- [Collections Postman](https://github.com/rtof83/ecommerce-java-react/blob/main/samples/ecommerce.postman_collection.json);

- Rotas de acesso (para os métodos GET, POST, DELETE E PUT):
    - {baseURL}/api/customers -> retorna, cria, atualiza, exclui clientes;
    - {baseURL}/api/products -> retorna, cria, atualiza, exclui produtos;

- Rotas de acesso (para os métodos GET, POST E DELETE):
    - {baseURL}/orders -> retorna, cria e exclui pedidos;

- Rotas de busca:
    - {baseURL}/api/{rota}/:id -> retorna registro por ID;
    - {baseURL}/api/products/sku -> retorna produto por sku;

- Inserção de pedidos:
    - total do pedido e data e hora atual inseridos através da API;
    - a quantidade de produtos é atualizada de forma automatizada (é verificado se a quantidade solicitada é igual ou menor que o estoque);

    &nbsp;

    #### exemplo de inserção de Clientes

    ```javascript
    {
        "name": "Test Client",
        "cpf": "99999999999",
        "email": "client@test.com",
        "address": "Test Street, 95",
        "phone": "(99) 99999-9999",
        "birth": "1999-01-01",
        "password": "123"
    }
    ```

    #### exemplo de inserção de Produtos

    ```javascript
    {
        "sku": "888",
        "name": "Product Test",
        "price": 99.9,
        "quantity": 30
    }
    ```

    #### exemplo de inserção de Pedidos

    ```javascript
    {
        "customerId": 3,
        "address": "Payment Street",
        "payment": "pix",
        "items": [
            {
                "quantity": 2,
                "sku": "888"
            },
            {
                "quantity": 2,
                "sku": "999ab"
            }
        ]
    }
    ```
&nbsp;

### Implementações FRONT:
- Cadastro, alteração e exclusão de Cliente;
- Cadastro, alteração e exclusão de Produto;
- Lista Clientes;
- Lista Produtos;
- Lista Pedidos;
- Carrinho;
- Login;

&nbsp;

### Próximos passos:
- Filtrar listagens;
- Localizar registros por campo;
- Utilizar localstorage (pedidos) concomitante ao ContextAPI;
- Lista pedidos detalhada;
- Validação dos campos;
- Refatoração;
