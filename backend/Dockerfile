FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8800
# Comando para iniciar o servidor
CMD ["npm", "start"]
