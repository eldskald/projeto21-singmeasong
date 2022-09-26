# Sing me a Song

Por Rafael de Lima Bordoni.

# Documentação

Precisamos acertar o banco de dados e as variáveis de ambiente. Também usamos *Cypress* para testes ponta a ponta, então já o tenha instalado na sua máquina. Feito isso, execute um ``npm install`` tanto no back quanto no front.

## Variáveis de ambiente

Temos um ``.env.example`` a ser seguido tanto no front quanto no back. No back, você precisa configurar tanto um ``.env`` quanto um ``.env.test`` com endereços diferentes para bancos de dados separados para cada ambiente. No front, temos apenas uma pro endereço da API que servirá para ambos os ambientes então tome cuidado se usar portas diferentes nos ambientes de teste e de desenvolvimento.

## Banco de dados

Tendo configurado suas variáveis de ambiente no back e instalado as dependências, execute os seguintes comandos para inicializar os bancos de dados:

    npx prisma migrate dev
    npx dotenv-cli -e .env.test prisma migrate dev

O primeiro cria o banco para desenvolvimento local e o segundo para os testes.

## Scripts para rodar o projeto

Tenha certeza de que está na pasta correta antes de executar o comando no seu terminal.

### No back

- ``npm run dev`` - Levanta o servidor local para desenvolvimento. Precisa do banco de dados de desenvolvimento.
- ``npm run test:e2e`` - Levanta um servidor local para testes ponta a ponta em particular.
- ``npm run test:unit`` - Roda os testes unitários. Não precisam de servidor levantado ou de banco de dados.
- ``npm run test:integration`` - Roda os testes de integração. Não precisam de servidor levantado. Precisa do banco de dados de teste.
- ``npm run build`` - Builda o projeto para deploy.
- ``npm run start`` - Levanta o servidor depois de build, para produção.

### No front

- ``npm run start`` - Levanta um servidor local para desenvolvimento. Precisa do servidor de desenvolvimento rodando.
- ``npx cypress open`` - Abre o *Cypress* para executar os testes ponta a ponta. Precisa do servidor de testes ponta a ponta e do banco de dados de teste.
