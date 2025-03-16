# Usa una imagen de Node.js como base
FROM node:18

# Crea el directorio de trabajo
RUN mkdir -p /usr/src/app 

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos de la aplicación
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos y el directorio de trabajo
COPY . .

# Expone el puerto interno de la API
EXPOSE ${API_PORT}

# Comando para ejecutar la aplicación en modo de desarrollo
CMD ["npm", "run", "start:dev"]