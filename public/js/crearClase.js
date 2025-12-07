// Botones y modales
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("nombreClase").value = "";
  document.getElementById("seccion").value = "";
  document.getElementById("asunto").value = "";
  document.getElementById("sala").value = "";
});

const btnAbrirModalClase = document.getElementById("abrirOpcionesClase");
const dialogoClase = document.getElementById("dialogoOpcionesClase");
// Se abre el dialogo de crear clase
btnAbrirModalClase.addEventListener("click", () => {
  dialogoClase.showModal();
});
const btnCrearClase = document.getElementById("crearClasebtn");
const dialogoCrearClase = document.getElementById("crearClaseDialog");
// Se abre el modal para crear una clase
btnCrearClase.addEventListener("click", () => {
  dialogoCrearClase.showModal();
});
const btnUnirseClase = document.getElementById("unirseClasebtn");
const dialogoUnirseClase = document.getElementById("unirseClaseDialog");
// Se abre el modal para unirse a una clase
btnUnirseClase.addEventListener("click", () => {
  dialogoUnirseClase.showModal();
});
const btnUnirseClaseCancelar = document.getElementById("unirseClaseCancelar");
const btnUnirseClaseAceptar = document.getElementById("unirseClaseAceptar");
// Boton de cancelar unirse a clase
btnUnirseClaseCancelar.addEventListener("click", () => {
  dialogoUnirseClase.close();
  dialogoClase.showModal();
});

// Logica para unirse a una clase
btnUnirseClaseAceptar.addEventListener("click", (e) => {
  e.preventDefault();
  const codigo = document.getElementById("codigoClase").value;

  if (!codigo) {
    alert("Por favor ingrese un código");
    return;
  }
  fetch("/api/join-class", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: codigo }),
  })
    .then((res) => {
      if (!res.ok) {
        if (res.status === 404) throw new Error("Clase no encontrada");
        throw new Error("Error al unirse a la clase");
      }
      return res.json();
    })
    .then((data) => {
      window.location.href = data.url;
    })
    .catch((err) => {
      console.error(err);
      alert(err.message);
    });
});
const btnCrearClaseCancelar = document.getElementById("crearClaseCancelar");
const btnCrearClaseAceptar = document.getElementById("crearClaseAceptar");
btnCrearClaseCancelar.addEventListener("click", () => {
  dialogoCrearClase.close();
  dialogoClase.showModal();
});
// Logica para la creacion de una clase
btnCrearClaseAceptar.addEventListener("click", (e) => {
  e.preventDefault();

  const inputNombreClase = document.getElementById("nombreClase").value;
  const inputSeccion = document.getElementById("seccion").value;
  const inputAsunto = document.getElementById("asunto").value;
  const inputSala = document.getElementById("sala").value;

  if (!inputNombreClase) {
    alert("El nombre de la clase es obligatorio");
    return;
  }

  fetch("/api/create-class-file", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nombreClase: inputNombreClase,
      seccion: inputSeccion,
      asunto: inputAsunto,
      sala: inputSala,
    }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Error al crear la clase");
      return res.json();
    })
    .then((data) => {
      console.log("Clase creada:", data);

      // Limpiar formulario
      document.getElementById("nombreClase").value = "";
      document.getElementById("seccion").value = "";
      document.getElementById("asunto").value = "";
      document.getElementById("sala").value = "";

      window.location.href = data.url;
    })
    .catch((err) => {
      console.error(err);
      alert("Hubo un error al crear la clase");
    });
});

// Cargar clases al iniciar
document.addEventListener("DOMContentLoaded", () => {
  // Limpiar inputs
  const inputs = document.querySelectorAll("#crearClaseDialog input");
  inputs.forEach(input => input.value = "");

  fetch("/api/classes")
    .then(res => res.json())
    .then(classes => {
      const container = document.querySelector(".swiper-wrapper");
      classes.forEach(clase => {
        const card = document.createElement("div");
        card.className = "tarea swiper-slide";
        card.innerHTML = `
          <div id="img-clase">
            <div class="contenido">
              <h1 class="materia">
                <a class="a-clase" href="${clase.url}">${clase.nombre}</a>
              </h1>
              <h2><strong>${clase.seccion}</strong></h2>
            </div>
          </div>
        `;
        container.appendChild(card);
      });

      // Actualizar Swiper si existe
      const swiperEl = document.querySelector(".swiper");
      if (swiperEl && swiperEl.swiper) {
        swiperEl.swiper.update();
      }
    })
    .catch(err => console.error("Error cargando clases:", err));
});
