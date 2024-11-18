Para fazer uso do projeto, é necessario ter previamente o Node.Js na sua máquina
Dependencias necessarias. npm install express axios cors e npm install path(precisa ser instalada separadamente)
O backend depende de duas chaves de API para funcionar corretamente: API do OpenWeather (principal): Acesse o OpenWeather e crie uma conta para obter a chave. API do Weatherstack (secundária):Acesse o Weatherstack para obter a chave de API para substituir a chave do projeto pela sua, esta localizada no arquivo server.js no backend.
Uso do docker, será necessario ter o docker desktop previamente instalado. e para usar o docker deixei o programa aberto enquanto faz os teste na IDE
Comandos docker - (docker-compose up --build) pode executar no terminal da propria IDE na raiz do projeto (Estou usando o Vscode)
Comando k6 para requisições - (k6 run --vus 100 --duration 60s load-test.js      aqui ela faz 100 requisições) No CMD da sua maquina, choco install k6 use esse comando para instalar o k6
Comando para rodar o backend e visualizar o projeto - (abra o terminal e navegue para o diretorio do backend (cd backend) depois fique na aba do index.html e use o LiveServer do próprio Vscode(o icone fica na parte de baixo com o nome Go Live) caso não tenha a extensao é so baixa-la na IDE na aba de extensões ou utilize esse caminho no seu navegador http://127.0.0.1:5500/frontend/index.html)
Caso o frontend so apareca os arquivos em o css, basta entrar na pasta do frontend.
