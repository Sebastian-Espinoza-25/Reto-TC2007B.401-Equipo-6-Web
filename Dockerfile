# Usar la imagen de Node.js como base
FROM node:18

# Establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar los archivos de package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos de la aplicación
COPY . .

# Construir la aplicación para producción
RUN npm run build

# Exponer el puerto que la aplicación usará
EXPOSE 3001

# Comando por defecto para ejecutar la aplicación
CMD ["npm", "start"]