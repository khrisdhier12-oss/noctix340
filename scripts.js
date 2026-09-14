// Bouton pour aller aux statistiques
const startButton = document.getElementById("startButton");

startButton.addEventListener("click", () => {
    document.getElementById("stats").scrollIntoView({
        behavior: "smooth"
    });
});


// =========================
// MINI-JEU DE RÉFLEXE
// =========================

const target = document.getElementById("target");
const startGame = document.getElementById("startGame");
const timeDisplay = document.getElementById("time");
const bestDisplay = document.getElementById("best");
const gameArea = document.getElementById("gameArea");
const scoreList = document.getElementById("scoreList");

let scores = JSON.parse(localStorage.getItem("scores")) || [];
let startTime = 0;
let bestTime = localStorage.getItem("bestTime");

if (bestTime !== null) {
    bestDisplay.textContent = bestTime;
}


// Bouton COMMENCER
startGame.addEventListener("click", () => {

    // Choisir une position aléatoire
    const maxX = gameArea.clientWidth - target.offsetWidth;
    const maxY = gameArea.clientHeight - target.offsetHeight;

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    target.style.left = x + "px";
    target.style.top = y + "px";

    // Afficher la cible
    target.style.display = "block";

    // Démarrer le chrono
    startTime = Date.now();
});


// Quand on clique sur la cible
target.addEventListener("click", () => {

    const reactionTime = Date.now() - startTime;

    timeDisplay.textContent = reactionTime;

    target.style.display = "none";

    // Meilleur score
    if (bestTime === null || reactionTime < Number(bestTime)) {

        bestTime = reactionTime;

        localStorage.setItem("bestTime", bestTime);

        bestDisplay.textContent = bestTime;
    }
});function updateScoreList() {

    scoreList.innerHTML = "";

    scores.sort((a, b) => a - b);

    scores.slice(0, 5).forEach(score => {

        scoreList.innerHTML += `<li>${score} ms</li>`;
    });scores.push(reactionTime);

    localStorage.setItem("scores", JSON.stringify(scores));

    updateScoreList();
}if (bestTime !== null) {
    bestDisplay.textContent = bestTime;
}updateScoreList();