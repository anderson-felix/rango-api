### Para iniciar a API, execute os seguintes comandos

- Crie um arquivo na raiz chamado `.env` e insira o conteudo do arquivo `.env.example`
- Instale os pacotes

```bash
yarn
```

- Build a imagem docker

```bash
yarn image:build
```

- Inicie os containers

```bash
yarn up
```

- Executar as migrations

```bash
yarn migration:run
```

_(Caso ocorra algum erro relacionado ao uuid_generate_v4(), basta executar o seguinte comando dentro banco de dados postgreSQL) `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`_
