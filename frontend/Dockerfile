# Use uma imagem base, como Node.js, para a construção do frontend
FROM node:16 as build

# Defina o diretório de trabalho no container
WORKDIR /app

# Copie os arquivos package.json e package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código
COPY . .

# Construa a aplicação para produção
RUN npm run build

# Use uma imagem Nginx para servir o frontend
FROM nginx:alpine

# Copie os arquivos construídos para o diretório padrão do Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exponha a porta 80 para o frontend
EXPOSE 80
