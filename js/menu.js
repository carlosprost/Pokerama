/* Seleccionar Nivel */

const btnJuego = document.querySelectorAll(".btn-nivel");

btnJuego.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    elegirNivel(e.target.id);
  });
});

let elegirNivel = (nivel) => {
    window.location.href = `./niveles/${nivel}.html`;
};
