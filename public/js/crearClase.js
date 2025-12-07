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
