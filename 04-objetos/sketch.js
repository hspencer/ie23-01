/*

Objetos

*/

let boids, num;

function setup(){
  createCanvas(windowWidth, windowHeight);
  num = 10;
  boids = [];

  for(let i = 0; i < num; i++){
    let nuevoBoid = new Boid(width/2, height/2);
    boids.push(nuevoBoid);
  }
}

function draw(){
  //clear();
  for(let b of boids){
    b.be();
  }
  velo();
}

function velo(){
  noStroke();
  fill(255, 5);
  rect(0, 0, width, height);
}

class Boid{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.diam = random(20, 100);
    this.age = 0;
    this.maxAge = round(random(900, 1000));
    this.angle = random(TWO_PI);
    this.seed = round(random(999999));
    this.t = this.diam; // tamaño 
  }


  be(){
    this.age++;
    this.move();
    this.render();

    // tener un hijo
    if(random(1) < 0.001){
      let nuevoBoid = new Boid(this.x, this.y);
      nuevoBoid.angle = this.angle;
      nuevoBoid.diam = this.t;
      boids.push(nuevoBoid);
    }

    if(this.age > this.maxAge){
      boids.splice(this, 1);
      print("boid eliminado, ahora la cantidad de boids es "+boids.length);
    }
  }

  move(){
   noiseSeed(this.seed);
   this.angle += (noise(frameCount/100) - 0.5) * 0.1;
   this.x += cos(this.angle);
   this.y += sin(this.angle);
  }

  render(){
    let c = this.age / this.maxAge; // coeficiente de vida
    this.t = (1-c) * this.diam; // coeficiente de tamaño
    fill(c * 255);
    stroke(0);
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    
    // rombo direccionado
    beginShape();
    vertex(this.t, 0);
    vertex(0, -this.t/2);
    vertex(-this.t/2, 0);
    vertex(0, this.t/2);
    endShape(CLOSE);
   

    // texto
    /*
    fill(255);
    textSize(16);
    text(this.age+"/"+this.maxAge, 0, textAscent()/2);
    */

    pop();
  }
}


function mouseClicked(){
  boids.push(new Boid(mouseX, mouseY));
}