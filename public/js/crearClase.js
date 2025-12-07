// Botones y modales
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
const btnCrearClaseCancelar = document.getElementById("crearClaseCancelar");
const btnCrearClaseAceptar = document.getElementById("crearClaseAceptar");
btnCrearClaseCancelar.addEventListener("click", () => {
  dialogoCrearClase.close();
  dialogoClase.showModal();
});
// Logica para la creacion de una clase
btnCrearClaseAceptar.addEventListener("click", (e) => {
  // Prevent default if we want to keep dialog open on error, but for now just let it run.
  // Actually, since it's a form method="dialog", it will close. 
  // We should probably prevent default to handle the async request and then close it manually or redirect.
  e.preventDefault();

  const inputNombreClase = document.getElementById("nombreClase").value;
  const inputSeccion = document.getElementById("seccion").value;
  const inputAsunto = document.getElementById("asunto").value;
  const inputSala = document.getElementById("sala").value;
  const id = crypto.randomUUID();

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
      id: id,
    }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Error al crear la clase");
      return res.json();
    })
    .then((data) => {
      console.log("Clase creada:", data);
      window.location.href = data.url;
    })
    .catch(err => {
      console.error(err);
      alert("Hubo un error al crear la clase");
    });
});
