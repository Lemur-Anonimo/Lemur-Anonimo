# Guía de Configuración y Uso del Proyecto

Este proyecto es una aplicación web para subir tareas, construida con Node.js, Express, PostgreSQL y Docker.

## 📁 ¿Qué se sube al repositorio?

Al subir este proyecto a un repositorio remoto (como GitHub), se deben incluir todos los archivos de código fuente y configuración, **EXCEPTO**:
- `node_modules/`: Dependencias instaladas (se generan automáticamente).
- `.env`: Variables de entorno con información sensible (contraseñas, puertos).
- `.git/`: Historial de versiones local.
- Datos de la base de datos (volúmenes de Docker).

El archivo `.gitignore` se encarga de excluir estos archivos automáticamente.

## 🚀 Cómo iniciar el proyecto (Guía paso a paso)

Si descargas o clonas este repositorio en una nueva máquina, sigue estos pasos para que funcione exactamente igual:

### 1. Requisitos previos
- Tener instalado [Docker](https://www.docker.com/) y Docker Compose.
- Tener instalado [Git](https://git-scm.com/).

### 2. Configuración
1.  Clona el repositorio:
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd SoftwareGE
    ```
2.  Crea un archivo `.env` en la raíz del proyecto (basado en el ejemplo de abajo) para configurar las variables de entorno necesarias.

    **Ejemplo de archivo `.env`:**
    ```env
    SERVER_IMAGE=softwarege-server
    SERVER_HOST=server
    SERVER_PORT=3000
    DB_USER=postgres
    DB_HOST=database
    DB_DATABASE=postgres
    DB_PASSWORD=password
    DB_PORT=5432
    ```

### 3. Ejecución
Ejecuta el siguiente comando para construir e iniciar los contenedores:

```bash
docker compose --env-file .env up --build
```

El servidor estará disponible en: `http://localhost:3000`

## 🗑️ Cómo borrar los datos de la base de datos

Los datos de PostgreSQL se guardan en un "volumen" de Docker para que no se pierdan al reiniciar. Si deseas **borrar todo** y empezar desde cero (base de datos vacía), ejecuta:

```bash
docker compose down -v
```

La opción `-v` (volumes) elimina los volúmenes asociados, borrando así toda la persistencia de la base de datos. Al volver a iniciar con `docker compose up`, la base de datos se creará limpia nuevamente.
