// dbclassroom.js
import pg from "pg";
import 'dotenv/config';

const { Pool } = pg;

// Creamos un pool apuntando a la base classroom
const classroomPool = new Pool({
    user: process.env.DB_USER,        // mismo usuario que tu base principal
    host: process.env.DB_HOST,        // host definido en tu .env (ej. "database")
    database: process.env.DB_CLASSROOM, // 👈 aquí usamos la base classroom
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Función para ejecutar queries en la base classroom
export const queryClassroom = (text, params) => {
    console.log("ejecutando query en classroom", text, params);
    return classroomPool.query(text, params);
};

// Función para obtener un cliente conectado a classroom
export const getClassroomClient = () => {
    return classroomPool.connect();
};
