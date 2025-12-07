// js/S_tarea.js

const tareasData = [
    {
        id: 1,
        titulo: "Reporte de código FCFS",
        descripcion: "Subir el reporte en PDF con conclusiones.",
        clase: "Sistemas Operativos",
        fecha: "Mañana, 23:59",
        estado: "pendiente"
    },
    {
        id: 2,
        titulo: "Diagrama de flujo Login",
        descripcion: "Realizar el diagrama en LucidChart.",
        clase: "Ingeniería de Software",
        fecha: "Hoy, 18:00",
        estado: "retrasada"
    },
    {
        id: 3,
        titulo: "Investigación UX",
        descripcion: "Resumen de las leyes de UX.",
        clase: "Interfaces de Usuario",
        fecha: "Entregado el lunes",
        estado: "entregada"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    cargarTareas(tareasData);
});

function cargarTareas(tareas) {
    const contenedor = document.getElementById('lista-de-tareas');
    contenedor.innerHTML = '';

    if (tareas.length === 0) {
        contenedor.innerHTML = '<p style="text-align:center; color:#666;">No hay tareas asignadas.</p>';
        return;
    }

    tareas.forEach(tarea => {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('tarjeta-tarea', tarea.estado);

        tarjeta.innerHTML = `
            <div class="info-tarea">
                <h2>${tarea.titulo}</h2>
                <p>${tarea.descripcion}</p>
            </div>
            <div class="meta-tarea">
                <span class="fecha-entrega">Vence: ${tarea.fecha}</span>
                <span class="nombre-clase">${tarea.clase}</span>
            </div>
        `;

        tarjeta.addEventListener('click', () => {
            console.log("Redirigiendo a detalle de tarea...");
            window.location.href = 'tarea.html'; 
        });

        contenedor.appendChild(tarjeta);
    });
}

// 3. Filtros
const btnTodas = document.getElementById('btn-todas');
const btnPendientes = document.getElementById('btn-pendientes');
const btnCompletadas = document.getElementById('btn-completadas');

if(btnTodas && btnPendientes && btnCompletadas){
    btnTodas.addEventListener('click', () => {
        activarBoton(btnTodas);
        cargarTareas(tareasData);
    });

    btnPendientes.addEventListener('click', () => {
        activarBoton(btnPendientes);
        const pendientes = tareasData.filter(t => t.estado === 'pendiente' || t.estado === 'retrasada');
        cargarTareas(pendientes);
    });

    btnCompletadas.addEventListener('click', () => {
        activarBoton(btnCompletadas);
        const completadas = tareasData.filter(t => t.estado === 'entregada');
        cargarTareas(completadas);
    });
}

function activarBoton(boton) {
    document.querySelectorAll('.filtro').forEach(b => b.classList.remove('activo'));
    boton.classList.add('activo');
}