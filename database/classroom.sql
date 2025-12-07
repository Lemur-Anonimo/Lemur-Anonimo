CREATE DATABASE classroom;

\connect classroom

CREATE TABLE cursos (
  id_curso SERIAL PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  descripcion TEXT,
  clave_acceso VARCHAR(20) NOT NULL,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE anuncios (
  id_publicacion SERIAL PRIMARY KEY,
  id_curso INT NOT NULL,
  contenido TEXT,
  fecha_publicacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_curso) REFERENCES cursos(id_curso)
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE material (
  id_material SERIAL PRIMARY KEY,
  id_curso INT NOT NULL,
  titulo VARCHAR(150) NOT NULL,
  contenido TEXT,
  fecha_publicacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_curso) REFERENCES cursos(id_curso)
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE tareas (
  id_tarea SERIAL PRIMARY KEY,
  id_curso INT NOT NULL,
  titulo VARCHAR(150) NOT NULL,
  descripcion TEXT,
  fecha_limite DATE,
  fecha_publicacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_curso) REFERENCES cursos(id_curso)
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE usuarios (
  id_usuario SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE usuarios_cursos (
  id_usuarios_cursos SERIAL PRIMARY KEY,
  id_usuario INT NOT NULL,
  id_curso INT NOT NULL,
  rol VARCHAR(20) CHECK (rol IN ('alumno','profesor')) NOT NULL,
  fecha_asignacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
    ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (id_curso) REFERENCES cursos(id_curso)
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE entregas (
  id_entrega SERIAL PRIMARY KEY,
  id_tarea INT NOT NULL,
  id_usuario INT NOT NULL,
  texto_respuesta TEXT,
  fecha_entrega TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  calificacion DECIMAL(5,2),
  retroalimentacion TEXT,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
    ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (id_tarea) REFERENCES tareas(id_tarea)
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE archivos (
  id_archivo SERIAL PRIMARY KEY,
  id_material INT,
  id_entrega INT,
  nombre_archivo VARCHAR(150) NOT NULL,
  url_archivo VARCHAR(255) NOT NULL,
  fecha_subida TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_material) REFERENCES material(id_material)
    ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (id_entrega) REFERENCES entregas(id_entrega)
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE comentarios (
  id_comentario SERIAL PRIMARY KEY,
  id_tarea INT NOT NULL,
  id_usuario INT NOT NULL,
  contenido TEXT,
  fecha_subida TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_tarea) REFERENCES tareas(id_tarea)
    ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
    ON UPDATE CASCADE ON DELETE CASCADE
);
