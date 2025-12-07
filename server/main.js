//vamos a cargar el puerto
import 'dotenv/config'
import pg from "pg";
import { login } from '../loginController.js';
import { register } from '../loginController.js';
import { getComentariosPrivados } from './controllers/ControllerComentariosPrivados.js';
const { Pool } = pg;


const PORT = process.env.SERVER_PORT;
import express from 'express'
import cors from 'cors'
const app = express();

app.use(cors());

// ------------------- NUEVO: rutas para comentarios privados -------------------

// Obtener comentarios de un usuario en una tarea
app.get('/api/comentarios/:id_usuario/:id_tarea', getComentariosPrivados);

// ------------------------------------------------------------------------------


//le decimos a express que cargue la carpeta public
app.use(express.static('public'))

app.use(express.json());//vamos a leer el cuerpo de la peticion, osea el ID


app.post('/api/login', login);
app.post('/api/register', register);

//la funcion que manda a prender el servidor para que usas pnpm start
app.listen(PORT, () => {
    console.log(`Servidor express encendido en http://localhost:${PORT}`);
})

