class Thing {
    constructor(x, y, size, color) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.color = color;
      this.speed = 2;
    }
    
    move() {
    }
    
    display() {
    }
    
    checkEdges() {
    }
  }
  
  class Circle extends Thing {
    constructor(x, y, size, color) {
      super(x, y, size, color);
      this.direction = random([-1, 1]);
    }
    
    move() {
      this.y += this.speed * this.direction;
      this.checkEdges();
    }
    
    display() {
      fill(this.color);
      ellipse(this.x, this.y, this.size);
    }
    
    checkEdges() {
      if (this.y - this.size/2 < 0) {
        this.y = this.size/2;
        this.direction *= -1;
      } else if (this.y + this.size/2 > height) {
        this.y = height - this.size/2;
        this.direction *= -1;
      }
    }
  }
  
  class Square extends Thing {
    constructor(x, y, size, color) {
      super(x, y, size, color);
      this.direction = random([-1, 1]);
    }
    
    move() {
      this.x += this.speed * this.direction;
      this.checkEdges();
    }
    
    display() {
      fill(this.color);
      rectMode(CENTER);
      rect(this.x, this.y, this.size, this.size);
    }
    
    checkEdges() {
      if (this.x - this.size/2 < 0) {
        this.x = this.size/2;
        this.direction *= -1;
      } else if (this.x + this.size/2 > width) {
        this.x = width - this.size/2;
        this.direction *= -1;
      }
    }
  }
  
  class Triangle extends Thing {
    constructor(x, y, size, color) {
      super(x, y, size, color);
      this.xDirection = random([-1, 1]);
      this.yDirection = random([-1, 1]);
    }
    
    move() {
      this.x += this.speed * this.xDirection;
      this.y += this.speed * this.yDirection;
      this.checkEdges();
    }
    
    display() {
      fill(this.color);
      push();
      translate(this.x, this.y);
      beginShape();
      vertex(0, -this.size/2);
      vertex(-this.size/2, this.size/2);
      vertex(this.size/2, this.size/2);
      endShape(CLOSE);
      pop();
    }
    
    checkEdges() {
      if (this.x - this.size/2 < 0) {
        this.x = this.size/2;
        this.xDirection *= -1;
      } else if (this.x + this.size/2 > width) {
        this.x = width - this.size/2;
        this.xDirection *= -1;
      }
      
      if (this.y - this.size/2 < 0) {
        this.y = this.size/2;
        this.yDirection *= -1;
      } else if (this.y + this.size/2 > height) {
        this.y = height - this.size/2;
        this.yDirection *= -1;
      }
    }
  }
  
  let shapes = [];
  const numShapes = 15;
  let canvas;
  
  function setup() {
    const containerWidth = document.getElementById('shapes-canvas').offsetWidth;
    const canvasHeight = Math.min(500, window.innerHeight * 0.6);
    
    canvas = createCanvas(containerWidth, canvasHeight);
    canvas.parent('shapes-canvas');
    
    for (let i = 0; i < numShapes; i++) {
      let shapeType = i % 3;
      let x = random(50, width - 50);
      let y = random(50, height - 50);
      let size = random(20, 50);
      let color = [random(255), random(255), random(255), 200];
      
      if (shapeType === 0) {
        shapes.push(new Circle(x, y, size, color));
      } else if (shapeType === 1) {
        shapes.push(new Square(x, y, size, color));
      } else {
        shapes.push(new Triangle(x, y, size, color));
      }
    }
  }
  
  function draw() {
    background(240);
    
    for (let shape of shapes) {
      shape.move();
      shape.display();
    }
  }
  
  function windowResized() {
    const containerWidth = document.getElementById('shapes-canvas').offsetWidth;
    const canvasHeight = Math.min(500, window.innerHeight * 0.6);
    
    resizeCanvas(containerWidth, canvasHeight);
  }