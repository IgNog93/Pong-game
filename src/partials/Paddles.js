import { SVG_NS } from '../settings.js';

export default class Paddle {
    constructor(boardHeight, width, height, x, y, up, down) {
      this.boardHeight = boardHeight;
      this.width = width;
      this.height = height;
      this.x = x;
      this.y = y;
      this.speed = 50;
      this.score = 0;
    
    document.addEventListener('keydown', event => {
      switch (event.key) {
        case up:
          this.up();
        break;
        case down:
          this.down();
        break;
      }
    });
    }

    getScore (){
      return this.score;
    }

    incrementScore () {
      this.score = this.score + 1;
    }

    coordinates() {
      let leftX = this.x;
      let rightX = this.x + this.width;
      let topY = this.y;
      let bottomY = this.y + this.height;
      return [leftX, rightX, topY, bottomY];
    }


    up(){
      this.y = Math.max(0, this.y - this.speed); 
    }

    down(){
      this.y = Math.min(this.boardHeight - this.height, this.y + this.speed);
    }
    
    render(svg) {
        let Paddle = document.createElementNS(SVG_NS, 'rect');
        Paddle.setAttributeNS(null, 'width', this.width);
        Paddle.setAttributeNS(null, 'height', this.height);
        Paddle.setAttributeNS(null, 'x', this.x);
        Paddle.setAttributeNS(null, 'y', this.y);
        Paddle.setAttributeNS(null, 'fill', 'blacktoo');
        
        svg.appendChild(Paddle);
    }
}