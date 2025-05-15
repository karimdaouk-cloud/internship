class Circle {
    constructor(x, y, size) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.color = color(random(255), random(255), random(255), 200);
    }
    
    move() {
      let moveAmount = random(1, 5);
      let angle = random(TWO_PI);
      
      this.x += moveAmount * cos(angle);
      this.y += moveAmount * sin(angle);
      
      this.x = constrain(this.x, 0, width);
      this.y = constrain(this.y, 0, height);
    }
    
    display() {
      noStroke();
      fill(this.color);
      ellipse(this.x, this.y, this.size);
    }
  }
  
  let circles = [];
  
  function setup() {
    let canvas = createCanvas(800, 600);
    canvas.parent('canvas-container');
    
    for (let i = 0; i < 20; i++) {
      let x = random(width);
      let y = random(height);
      let size = random(20, 80);
      
      circles.push(new Circle(x, y, size));
    }
  }
  
  function draw() {
    background(240);
    
    for (let circle of circles) {
      circle.move();
      circle.display();
    }
  }