/* index */
const btnIniciar = document.getElementById("iniciar");
const btnRanking = document.getElementById("ranking");

btnIniciar.addEventListener("click", () => {
  move("menu");
});

btnRanking.addEventListener("click", () => {
  move("ranking");
});

function move(location) {
  window.location.href = `./src/${location}.html`;
}
