export const generateClassHtml = (nombreClase, seccion, asunto, sala, id) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${nombreClase}</title>
    <link rel="stylesheet" href="/css/clasesCreadas.css">
</head>
<body>
    <header class="header">
        <div class="izquierda">
            <a href="#"><img src="/img/menu.svg" alt="menu" class="header-img"></a>
            <a href="/principal.html"><h2>Lemur Anonimo</h2></a>
        </div>

        <nav class="centro">
            <a href="#"><img src="/img/assignment.svg" alt="Tarea" class="header-img"></a>
            <a href="#"><h2>Tarea</h2></a>

            <a href="https://calendar.google.com" target="_blank"><img src="/img/calander.svg" alt="Calendario" class="header-img"></a>
            <a href="https://calendar.google.com" target="_blank"><h2>Calendario</h2></a>

            <a href="https://meet.google.com/landing" target="_blank"><img src="/img/videocall.svg" alt="Video Llamada" class="header-img"></a>
            <a href="https://meet.google.com/landing" target="_blank"><h2>Video Llamadas</h2></a>
        </nav>

        <div class="derecha">
            <a href="#"><img src="/img/notification.svg" alt="notif" class="header-img"></a>
            <a href="#"><img src="/img/user.jpg" alt="user" class="user-img"></a>
        </div>
    </header>

    <section class="imagen_perfil">
        <h1 id="titulo_de_clase">${nombreClase}</h1>
    </section>

    <section class="cajon-aviso-tareas">
        <div class="aviso">
            <div class="contenido">
                <h1>Información de la Clase</h1>
                <p><strong>Sección:</strong> ${seccion}</p>
                <p><strong>Asunto:</strong> ${asunto}</p>
                <p><strong>Sala:</strong> ${sala}</p>
                <p><strong>ID de clase:</strong> ${id}</p>
            </div>
        </div>
    </section>
</body>
</html>
  `;
};
