
function getTareas() {
    return JSON.parse(localStorage.getItem("tareas")) || [];
}

function saveTareas(lista) {
    localStorage.setItem("tareas", JSON.stringify(lista));
}


const formulario = document.getElementById("form-tarea");

if (formulario) {
    formulario.addEventListener("submit", function (e) {
        e.preventDefault();

        // Tomar valores del formulario
        const titulo = document.getElementById("titulo").value;
        const descripcion = document.getElementById("descripcion").value;
        const fecha = document.getElementById("fecha").value;

        // Crear objeto tarea
        let tarea = {
            titulo,
            descripcion,
            fecha,
            completada: false
        };

        // Guardar
        let tareas = getTareas();
        tareas.push(tarea);
        saveTareas(tareas);

        // Redirigir
        window.location.href = "curso.html";
    });
}


const contenedor = document.getElementById("lista-tareas");

if (contenedor) {
    let tareas = getTareas();

    if (tareas.length === 0) {
        contenedor.innerHTML = "<p>No hay tareas aún.</p>";
    } else {
        tareas.forEach((tarea) => {
            contenedor.innerHTML += `
                <section class="cajon-aviso-tareas">
   
            <div class="tarea">
                    <img src="img/user.jpg" alt="user" class="user-img" />
                    <div class="contenido">
                        <h1>
                            <strong>${tarea.titulo}</strong>
                        </h1>
                        <p class="hora-fecha">${tarea.fecha}</p>
                        <p class="texto-aviso">${tarea.descripcion}</p>
                    </div>
                </div>
                <br>
            `;
        });
    }
}
