import Paddle from "./Paddle.js";
import Ball from "./Ball.js";

class Gameboard{
  constructor(gameBoardQuery, playerPaddleQuery, computerPaddleQuery, ballQuery){
    this.gameBoard = document.querySelector(`.${this.gameBoardQuery}`);
    // im lazy
    this.gameScreen = document.querySelector(".game_screen");
    this.endScreen = document.querySelector(".end_screen");
    this.playerPaddle = new Paddle(playerPaddleQuery);
    this.computerPaddle = new Paddle(computerPaddleQuery);
    this.playerScore = 0;
    this.computerScore = 0;
    this.ball = new Ball(ballQuery, this.playerPaddle, this.computerPaddle);

    this.frameID = 0;
    this.started = false;
  }

  init(){
    this.playerPaddle.init();
    this.computerPaddle.init();
    this.ball.init();
    this.update();
  }

  update(){
    this.moveComputerPaddle();

    if(this.ball.currState != 0){
      if(this.ball.currState == 1){
        this.computerScore++;
      }else{
        this.playerScore++;
      }
      if(this.computerScore > 10 || this.playerScore > 10){
        this.endGame();
        return;
      }
      this.pauseGame();
      return;
    }

    this.frameID = requestAnimationFrame(this.update.bind(this));
  }

  moveComputerPaddle(){
    const paddlePos = this.computerPaddle.getTop();
    const ballPredictedPos = this.ball.getPredictedYPos();
    const diff = paddlePos - ballPredictedPos;
    let dir;
    if(Math.abs(diff) > 1 && this.ball.motionX < 0){
      dir = diff / Math.abs(diff);
      dir *= -1;
    }
    else{
      dir = 0;
    }
    this.computerPaddle.paddleDirection = dir;

  }

  stop(){
    cancelAnimationFrame(this.frameID);
    this.ball.stop();
    this.playerPaddle.stop();
    this.computerPaddle.stop();
  }

  handleKeyPress(code){
    this.playerPaddle.handleKeyPress(code);
  }


  handleKeyRelease(code){
    this.playerPaddle.handleKeyRelease(code);
  }

  startGame(){
    this.gameScreen.style.display = "none";
    this.endScreen.style.display = "none";
    this.ball.motionX = Math.max(0.8, Math.random());
    this.ball.motionY = Math.sqrt(Math.sqrt(3) - Math.pow(this.ball.motionX, 2));
    this.init();
  }

  pauseGame(){
    this.gameScreen.style.display = "block";
    this.started = false;
    this.updateScore();
    this.stop();
    this.resetPos();
  }

  endGame(){
    this.endScreen.style.display = "block";
    this.gameScreen.style.display = "block";
    this.started = false;
    document.querySelector(".end_screen p").innerHTML = `${(this.computerScore > 10) ? "Computer" : "Player"} Won!`;
    this.stop();
    this.reset();
  }

  handleMouseEnter(){
    if(this.started) return;
    this.started = true;
    this.startGame();
  }

  resetPos(){
    this.ball.reset();
    this.playerPaddle.reset();
    this.computerPaddle.reset();
  }

  reset(){
    this.resetPos();
    this.playerScore = 0;
    this.computerScore = 0;
    this.updateScore();
  }

  updateScore(){
    document.querySelector(".human .score").innerHTML = this.playerScore;
    document.querySelector(".computer .score").innerHTML = this.computerScore;
  }
}

export default Gameboard;
