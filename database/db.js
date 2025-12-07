// db.js

import pg from "pg";
import 'dotenv/config'; 

const { Pool } = pg;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Exporta la función 'query' para que otros archivos la usen
export const query = (text, params) => {
    console.log("ejecutando query", text, params)
    return pool.query(text, params)
}

export const getClient = () => {
    return pool.connect()
}