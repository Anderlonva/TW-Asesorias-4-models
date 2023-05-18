const express = require('express');
const { getConnection } = require('./db/db-connect-mongo');
require('dotenv').config();  // es necesario para poder usar las variables de entorno en este caso PORT
const cors = require('cors');


const app = express();
const port = process.env.PORT // configuracion del puerto desde el archivo .env 

app.use(cors()); // implementacion de cors -> este sirve para que el frontend pueda consumir el backend desde
                // dominios diferentes 

getConnection();

app.use(express.json()); // Parseo Json

app.use('/tipo-proyecto', require('./router/tipoProyecto'));
app.use('/cliente', require('./router/cliente'));
app.use('/universidad', require('./router/universidad'));
app.use('/etapas', require('./router/etapas'));

app.listen(port, () => {
    console.log(`API REST corriendo en el puerto ${port}`)
})

