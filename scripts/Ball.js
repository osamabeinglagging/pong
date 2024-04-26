class Ball{
  constructor(ballQuery, humanPaddle, computerPaddle){
    this.ball = document.querySelector(`.${ballQuery}`);
    this.humanPaddle = humanPaddle;
    this.computerPaddle = computerPaddle;

    this.frameID = 0;
    this.motionX = 0;
    this.motionY = 0;

    this.lastPosX = this.getLeft();
    this.lastPosY = this.getTop();
    this.currPosX = this.lastPosX;
    this.currPosY = this.lastPosY;

    this.currState = 0;
  }

  init(){
    this.update();
  }

  getLeft(){
    return parseFloat(getComputedStyle(this.ball).getPropertyValue("--left"))
  }

  getTop(){
    return parseFloat(getComputedStyle(this.ball).getPropertyValue("--top"))
  }

  update(){
    let posX = this.getLeft();
    let posY = this.getTop();

    if(posY >= 100 || posY <= 0){
      this.motionY *= -1;
    }

    if(this.isCollidingWithPaddle(this.computerPaddle) || this.isCollidingWithPaddle(this.humanPaddle)){
      this.motionX *= -1;

      if(this.isCollidingWithPaddle(this.humanPaddle)){
        this.motionY += 0.4 * this.humanPaddle.paddleDirection;
      }
      console.log(`MotionX: ${this.motionX}, MotionY: ${this.motionY}`);
    }

    if(this.getLeft() <= 0){
      this.currState = -1;
    }

    if(this.getLeft() >= 100){
      this.currState = 1;
    }

    if(this.currState != 0){
      return;
    }

    posX += this.motionX;
    posY += this.motionY;

    this.lastPosX = this.currPosX;
    this.lastPosY = this.currPosY;

    this.currPosX = posX;
    this.currPosY = posY;
    
    this.ball.style.setProperty("--left", `${posX}%`);  
    this.ball.style.setProperty("--top", `${posY}%`);  

    this.frameID = requestAnimationFrame(this.update.bind(this));
  }

  stop(){
    cancelAnimationFrame(this.frameID);
  }

  // Credits to ChatGPT - ICBA think
  isCollidingWithPaddle(paddle) {
    const ballRect = this.ball.getBoundingClientRect();
    const paddleRect = paddle.paddle.getBoundingClientRect();

    const ballCenterX = ballRect.left + ballRect.width / 2;
    const ballCenterY = ballRect.top + ballRect.height / 2;

    const paddleCenterX = paddleRect.left + paddleRect.width / 2;
    const paddleCenterY = paddleRect.top + paddleRect.height / 2;

    const deltaX = Math.abs(ballCenterX - paddleCenterX);
    const deltaY = Math.abs(ballCenterY - paddleCenterY);

    const minDistanceX = paddleRect.width / 2 + ballRect.width / 2;
    const minDistanceY = paddleRect.height / 2 + ballRect.width / 2;

    if (deltaX <= minDistanceX && deltaY <= minDistanceY) {
      return true;
    }

    return false;
  }

  getPredictedYPos(){
    let yPos = (((this.currPosY - this.lastPosY)/(this.currPosX - this.lastPosX)) * -1 * this.currPosX) + this.currPosY;
    if(yPos > 100){
      yPos = 200 - yPos;
    }

    if(yPos < 0){
      yPos *= -1;
    }
    return yPos;
  }

  reset(){
    this.ball.style.setProperty("--top", "40%");
    this.ball.style.setProperty("--left", "40%");
    this.currState = 0;
  }

  getCurrState(){
    return this.currState;
  }

}

export default Ball;
