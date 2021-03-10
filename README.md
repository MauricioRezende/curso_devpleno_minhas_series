## Para rodar o projeto

**Quando API não estava funcionando** 

Sqlite3 não estava instalando, gernado um erro ao clonar, para resolver e finalizar o desenvolvimento da aplicação, executei os seguintes passos:
- Clonar servidor: https://github.com/tuliofaria/minhas-series-server
- Executar: npm install
- Executar: npm install https://github.com/mapbox/node-sqlite3/tarball/master
- Executar: node ./index.js \
API estará rodando na porta 3002
- Clonar esse projeto
- Executar: npm install
- Executar: npm start \
Aplicação estará rodando na porta 3000

**Com API funcionando**

- Clonar esse projeto
- Executar: npm install
- Executar: node node_modules\minhas-series-server\index.js \
API estará rodando na porta 3002
- Executar: npm start \
Aplicação estará rodando na porta 3000


**OBS.:** \
Houve alteração na API em algum momento causando falha na execução correta do projeto. Duvida se pode ocorrer novamente. Em uma versão que clonei, um campo se chamava "genre", clonando a mesma base dias depois, o campo passou a se chamar "genre_name".
