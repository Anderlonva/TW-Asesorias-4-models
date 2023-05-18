FROM node:18 
# decimos que version de node se va a utilizar en el contenedor

WORKDIR /usr/src/app
# crea el directorio donde se va a copiar en nuestro contenedor de docker

COPY package*.json ./
#copia el packge.json para poder descargar las dependencias que usamos en nuestra aplicacion en la ./ raiz de la imagen

RUN npm install

COPY . .
# copia todo el contenido de nuestra aplicacion dentro del directorio que creamos en WORKDIR

EXPOSE 4000
# debe de ser el mismo puerto que configuramos en PORT en el archivo .env

CMD [ "node", "index.js" ]
# se debe de poner el archivo principal de nuestra aplicacion en este caso index.js 

#se busca en internet  node js dockerfile y en el primero que sale se busca  
#Your Dockerfile should now look like this: y se copia y pega 