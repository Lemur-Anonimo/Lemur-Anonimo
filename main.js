//vamos a cargar el puerto
import 'dotenv/config'
import pg from "pg";
import { login } from './loginController.js';
import { register } from './loginController.js';
const { Pool } = pg;
 

const PORT = process.env.PORT;
import express from 'express'
const app = express();



//le decimos a express que cargue la carpeta public
app.use(express.static('public'))

app.use(express.json());//vamos a leer el cuerpo de la peticion, osea el ID


app.post('/api/login', login);
app.post('/api/register', register);

//la funcion que manda a prender el servidor para que usas pnpm start
app.listen(PORT, () => {
    console.log(`Servidor express encendido en http://localhost:${PORT}`);
})

