// ControllerComentariosPrivados.js
import { queryClassroom } from '../../database/dbClassroom.js';

export const getComentariosPrivados = async (req, res) => {
  const { id_usuario, id_tarea } = req.params;
  try {
    const text = `
      SELECT c.id_comentario, c.contenido, c.fecha_subida, u.nombre AS autor
      FROM comentarios c
      INNER JOIN usuarios u ON c.id_usuario = u.id_usuario
      WHERE c.id_usuario = $1 AND c.id_tarea = $2
      ORDER BY c.fecha_subida DESC;
    `;
    const result = await queryClassroom(text, [id_usuario, id_tarea]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};
