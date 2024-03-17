# Usa una imagen de Node.js como base
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos de la aplicación
COPY package*.json ./
COPY dist/ ./dist/

# Instala las dependencias
RUN npm install

# Expone el puerto 3000
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "dist/main.js"]
