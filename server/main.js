//vamos a cargar el puerto
import "dotenv/config";
import pg from "pg";
import { login } from "../loginController.js";
import { register } from "../loginController.js";
// Imports para crear una clase
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const { Pool } = pg;

const PORT = process.env.SERVER_PORT;
import express from "express";
import cors from "cors";
const app = express();

app.use(cors());

//le decimos a express que cargue la carpeta public
app.use(express.static(path.join(process.cwd(), "public")));

app.use(express.json()); //vamos a leer el cuerpo de la peticion, osea el ID

app.post("/api/login", login);
app.post("/api/register", register);
// Recrear __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.post("/api/create-class-file", (req, res) => {
  const { nombreClase, seccion, asunto, sala, id } = req.body;
  // Convertir nombre a formato seguro
  const nombreSeguro = nombreClase.toLowerCase().replace(/\s+/g, "-");
  // nombre final del archivo
  const archivo = `clase-${nombreSeguro}-${id}.html`;
  // Ruta fisica donde se guardara
  // Usamos process.cwd() para asegurar que apunte a la carpeta raiz del proyecto donde se ejecuta npm start
  const ruta = path.join(process.cwd(), "public", "clases", archivo);
  // Plantilla HTML base
  const html = `
<!DOCTYPE html>
<html>
<head>
    <title>${nombreClase}</title>
</head>
<body>
    <h1>${nombreClase}</h1>
    <h2>${seccion}</h2>
     <h2>${asunto}</h2>
      <h2>${sala}</h2>
    <p>ID de clase: ${id}</p>
</body>
</html>
    `;
  // Crear carpeta si no existe
  const carpetaClases = path.join(process.cwd(), "public", "clases");

  if (!fs.existsSync(carpetaClases)) {
    fs.mkdirSync(carpetaClases, { recursive: true });
  }
  // Crear archivo
  fs.writeFile(ruta, html, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "No se pudo crear el archivo" });
    }
    // URL publica
    const urlPublica = `/clases/${archivo}`;
    res.json({ url: urlPublica });
  });
});

//la funcion que manda a prender el servidor para que usas pnpm start
app.listen(PORT, () => {
  console.log(`Servidor express encendido en http://localhost:${PORT}`);
});
