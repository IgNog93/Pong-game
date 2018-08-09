import { SVG_NS } from '../settings.js';

export default class Ball {
    constructor(boardWidth, boardHeight, radius) {
      this.radius = radius;
      this.boardWidth = boardWidth;
      this.boardHeight = boardHeight;
      this.direction = 1;
      this.ping = new Audio("public/sounds/pong-02.wav");
      this.reset();
    }

    reset() {
        this.x = this.boardWidth / 2;
        this.y = this.boardHeight / 2;

        this.vy = 0;

        while( this.vy === 0 ){
            this.vy = Math.floor(Math.random() * 10 - 5);
        }
            this.vx = this.direction * (6 - Math.abs(this.vy));    
    }   

    
    wallCollision(paddle1, paddle2){
        const hitBottom = this.y + this.radius >= this.boardHeight;
        const hitTop = this.y - this.radius <=  0 ;
        const hitLeft = this.x - this.radius <= 0 ;
        const hitRight = this.x + this.radius >= this.boardWidth;
   
        if (hitTop || hitBottom){
          this.vy = this.vy * -1;
        } else if(hitLeft) {
          paddle2.incrementScore();
          this.reset();
          this.direction = -this.direction;
        }
        else if (hitRight) {
          paddle1.incrementScore();
          this.direction = -this.direction;
          this.reset();
        }
      }

      paddleCollision(paddle1, paddle2) {
        if (this.vx > 0){
              // check for player 2
          let [leftX, rightX, topY, bottomY] = paddle2.coordinates();
          
          if((this.x + this.radius >= leftX) &&
              (this.x + this.radius <= rightX) &&
              (this.y >= topY && this.y <= bottomY)){
                this.vx = this.vx * -1;
                this.ping.play();
              }
          }else {
              // check for player 1
              let [leftX, rightX, topY, bottomY] = paddle1.coordinates();
   
          if((this.x - this.radius <= rightX) &&
              (this.x - this.radius >= leftX) &&
              (this.y >= topY && this.y <= bottomY)){
                this.vx = this.vx * -1;
                this.ping.play();
              }
        }
      }


    render(svg, paddle1, paddle2) {
        //...
          this.x += this.vx;
          this.y += this.vy;

          this.wallCollision(paddle1, paddle2);
          this.paddleCollision(paddle1, paddle2);
          
          let ball = document.createElementNS(SVG_NS, 'circle');
          ball.setAttributeNS(null, 'r', this.radius);
          ball.setAttributeNS(null, 'cx', this.x);
          ball.setAttributeNS(null, 'cy', this.y);
          ball.setAttributeNS(null, 'fill', 'black');
          svg.appendChild(ball);
    }
}