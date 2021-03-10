## Para rodar o projeto

**Quando API não estava funcionando** 

Sqlite3 não estava instalando \
Clonar servidor: https://github.com/tuliofaria/minhas-series-server \
Executar: npm install\
Executar: npm install https://github.com/mapbox/node-sqlite3/tarball/master \
Executar: node ./index.js\
Estará rodando na porta 3002\
OBS.: \
Houve alteração na API em algum momento causando falha na execução correta do projeto. Duvida se pode ocorrer novamente. Em uma versão que clonei, um campo se chamava "genre", clonando a mesma base dias depois, o campo passou a se chamar "genre_name"\   

**Com API funcionando**

- Clonar esse projeto\
- Executar: npm install\
- Executar: npm start\
Aplicação estará rodando na porta 3000\
- Executar: node node_modules\minhas-series-server\index.js \
API estará rodando na porta 3002