//vamos a cargar el puerto
import 'dotenv/config'
import pg from "pg";
import { login } from './loginController.js';
import { register } from './loginController.js';
const { Pool } = pg;
 
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

const PORT = process.env.PORT;
import express from 'express'
const app = express();


//esta es la funcion que nos permite hacer consultas
export const query = (text, params) => {
    console.log("ejecutando query", text, params)
    //este metodo es bueno contra inyeccion de SQL
    return pool.query(text, params)
}

//le decimos a express que cargue la carpeta public
app.use(express.static('public'))

app.use(express.json());//vamos a leer el cuerpo de la peticion, osea el ID






app.post('/api/login', login);
app.post('/api/register', register);

//la funcion que manda a prender el servidor para que usas pnpm start
app.listen(PORT, () => {
    console.log(`Servidor express encendido en http://localhost:${PORT}`);
})

