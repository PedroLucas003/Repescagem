# Use uma imagem base, como Node.js
FROM node:16

# Defina o diretório de trabalho no container
WORKDIR /app

# Copie os arquivos package.json e package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código
COPY . .

# Exponha a porta em que o backend está rodando (ajuste se necessário)
EXPOSE 8800

# Comando para iniciar o servidor
CMD ["npm", "start"]
