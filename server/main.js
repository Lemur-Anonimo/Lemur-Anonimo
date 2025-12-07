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

app.use(express.json());

app.post("/api/login", login);
app.post("/api/register", register);
// Recrear __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.post("/api/create-class-file", (req, res) => {
  const { nombreClase, seccion, asunto, sala } = req.body;
  // Convertir nombre a formato seguro
  const nombreSeguro = nombreClase.toLowerCase().replace(/\s+/g, "-");

  // Función para generar ID de 5 caracteres (Mayusculas y Numeros)
  const generateId = () => {
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  let id;
  let archivo;
  let ruta;
  const carpetaClases = path.join(process.cwd(), "public", "clases");

  // Asegurar que la carpeta existe antes de verificar archivos
  if (!fs.existsSync(carpetaClases)) {
    fs.mkdirSync(carpetaClases, { recursive: true });
  }

  // Generar ID único
  do {
    id = generateId();
    archivo = `clase-${nombreSeguro}-${id}.html`;
    ruta = path.join(carpetaClases, archivo);
  } while (fs.existsSync(ruta));

  // Plantilla HTML base
  const html = `
<!DOCTYPE html>
<html>
<head>
    <title>${nombreClase}</title>
    <a href="/principal.html">Inicio</a>
    <link rel="stylesheet" href="/css/estiloClase.css">
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
  // Crear archivo
  fs.writeFile(ruta, html, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "No se pudo crear el archivo" });
    }
    // URL publica
    // URL publica
    const urlPublica = `/clases/${archivo}`;

    // Guardar en classes.json
    const classesFile = path.join(process.cwd(), "classes.json");
    let classes = [];
    if (fs.existsSync(classesFile)) {
      try {
        const data = fs.readFileSync(classesFile, "utf8");
        classes = JSON.parse(data);
      } catch (e) {
        console.error("Error reading classes.json", e);
      }
    }
    classes.push({
      id,
      nombre: nombreClase,
      seccion,
      url: urlPublica,
    });
    fs.writeFileSync(classesFile, JSON.stringify(classes, null, 2));

    res.json({ url: urlPublica });
  });
});

app.get("/api/classes", (req, res) => {
  const classesFile = path.join(process.cwd(), "classes.json");
  if (fs.existsSync(classesFile)) {
    try {
      const data = fs.readFileSync(classesFile, "utf8");
      let classes = JSON.parse(data);

      // Filtrar clases que existen fisicamente
      const validClasses = classes.filter(clase => {
        const fileName = clase.url.split("/").pop();
        const filePath = path.join(process.cwd(), "public", "clases", fileName);
        return fs.existsSync(filePath);
      });

      // Si hubo cambios, actualizar el JSON
      if (validClasses.length !== classes.length) {
        fs.writeFileSync(classesFile, JSON.stringify(validClasses, null, 2));
      }

      res.json(validClasses);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Error reading classes" });
    }
  } else {
    res.json([]);
  }
});

app.post("/api/join-class", (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "ID es requerido" });
  }

  const carpetaClases = path.join(process.cwd(), "public", "clases");

  if (!fs.existsSync(carpetaClases)) {
    return res.status(404).json({ error: "No hay clases creadas" });
  }

  // Buscar archivo que termine con -<id>.html
  fs.readdir(carpetaClases, (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error al leer clases" });
    }

    const claseEncontrada = files.find((file) => file.endsWith(`-${id}.html`));

    if (claseEncontrada) {
      res.json({ url: `/clases/${claseEncontrada}` });
    } else {
      res.status(404).json({ error: "Clase no encontrada" });
    }
  });
});

//la funcion que manda a prender el servidor para que usas pnpm start
app.listen(PORT, () => {
  console.log(`Servidor express encendido en http://localhost:${PORT}`);
});
