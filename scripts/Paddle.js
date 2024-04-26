class Paddle{
  constructor(paddleQuery){
    this.paddle = document.querySelector(`.${paddleQuery} .paddle`);

    this.maxPaddleUpdate = 1.5;
    this.paddleDirection = 0;
    this.frameID = 0;
  }

  init(){
    this.update();
  }

  getTop(){
    return parseFloat(getComputedStyle(this.paddle).getPropertyValue("--pos"));
  }

  update(){
    if(this.paddleDirection != 0){
      this.paddle.style.setProperty("--pos", `${Math.max(Math.min(this.getTop() + (this.maxPaddleUpdate * this.paddleDirection), 100), 0)}%`);
    }
    this.frameID = requestAnimationFrame(this.update.bind(this));
  }

  stop(){
    cancelAnimationFrame(this.frameID);
  }

  handleKeyPress(code){
    if(code != 38 && code != 40) return;
    this.paddleDirection = code - 39;
  }

  handleKeyRelease(code){
    if(code != 38 && code != 40) return;
    if(code - 39 == this.paddleDirection)
      this.paddleDirection = 0;
  }


  reset(){
    this.paddle.style.setProperty("--pos", "50%");
  }
}

export default Paddle;
