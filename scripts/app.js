import Gameboard from "./Gameboard.js";

const game = new Gameboard("game_board", "human", "computer", "ball");

document.addEventListener('keydown', event => {
  game.handleKeyPress(event.keyCode);
});

document.addEventListener('keyup', event => {
  game.handleKeyRelease(event.keyCode);
});


document.addEventListener("click", event => {
  game.handleMouseEnter();
});
