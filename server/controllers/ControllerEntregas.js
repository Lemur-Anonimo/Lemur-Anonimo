import { queryClassroom } from '../../database/dbClassroom.js';

// Función modular para guardar archivo relacionado con una entrega
const guardarArchivoEntrega = async (id_entrega, nombre_archivo) => {
  try {
    // Simulación de URL (puedes cambiarlo luego a un servicio real tipo S3, Firebase, etc.)
    const urlSimulada = `http://fake-storage/archivos/${nombre_archivo}`;

    const insertArchivoQuery = `
      INSERT INTO archivos (id_entrega, nombre_archivo, url_archivo)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;

    const valuesArchivo = [id_entrega, nombre_archivo, urlSimulada];
    const resultArchivo = await queryClassroom(insertArchivoQuery, valuesArchivo);

    return resultArchivo.rows[0];
  } catch (error) {
    console.error('Error al guardar archivo:', error);
    throw error;
  }
};

// Controlador principal
export const subirEntrega = async (req, res) => {
  try {
    console.log("Petición recibida en /api/entregas:", req.body);
    const { id_tarea, id_usuario, texto_respuesta, nombre_archivo } = req.body;

    if (!id_tarea || !id_usuario || !texto_respuesta) {
      return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    const insertQuery = `
      INSERT INTO entregas (id_tarea, id_usuario, texto_respuesta)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;

    const values = [id_tarea, id_usuario, texto_respuesta];
    const result = await queryClassroom(insertQuery, values);
    const entrega = result.rows[0];

    // Si viene nombre_archivo, lo guardamos en la tabla archivos
    let archivo = null;
    if (nombre_archivo) {
      archivo = await guardarArchivoEntrega(entrega.id_entrega, nombre_archivo);
    }

    res.status(201).json({
      message: 'Entrega registrada exitosamente',
      entrega,
      archivo, // opcional, solo si se agregó archivo
    });
  } catch (error) {
    console.error('Error al subir entrega:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};