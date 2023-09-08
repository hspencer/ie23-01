let boids;

function setup() {
  createCanvas(windowWidth, windowHeight);
  boids = [];
  fondo(color('#FFF'), color('#96784C'));
  for(let y=0; y < height; y++){
    if(unoEn(100)){
        let b = new Boid(random(width), y, (y/height) * 50, -HALF_PI);
  boids.push(b);
    }
  }
}

function fondo(colA, colB){
  strokeWeight(1);
  for(let y = 0; y < height; y++){
    let col = lerpColor(colA, colB, y/height);
    stroke(col);
    line(0,y, width,y);
  }
}

function draw() {
  for(let i = 0; i < boids.length; i++){
    boids[i].draw();
    boids[i].go();
    if(boids[i].t < 1 || 
       boids[i].x < 0 ||
       boids[i].x > width ||
       boids[i].y < 0 ||
       boids[i].y > height){
      // sáquelo del arreglo
      boids.splice(i, 1);
    }
  }
}

class Boid {
  constructor(x, y, t, a) {
    let fade = 1/(y/height);
    this.x = x;
    this.y = y;
    this.t = t; // tamaño
    this.a = a; // ángulo
    this.seed = round(random(0, 999999));
    this.step = random(1,2);
    this.initSize = t;
    this.col = color(random(100, 80)*fade, random(90, 80)*fade, random(50, 50)*fade, 90);
  }

  draw() {
    let t = this.t;
    noStroke();
    fill(this.col);
    strokeWeight(.25);
    stroke(0, 150);
    push();
    translate(this.x, this.y);
    rotate(this.a + PI/4);
    rect(-t/2, -t/2, t, t, t/2, 0, t/2, t/2);
    pop();
  }
  
  go(){
    noiseSeed(this.seed);
    this.a += (noise(millis()/(this.t)*30) - 0.4725) * 0.333;
    
    // diferencia con el ángulo de crecimiento hacia arriba
    let dif = -HALF_PI - this.a;
    
    // ajuste del ángulo para que crezca un poco hacia arriba
    this.a += dif * 0.018
    
    // identidad circular
    this.x += cos(this.a) * this.step;
    this.y += sin(this.a) * this.step;
    
    // achicamiento de la rama
    this.t *= 0.99;
    
    if(unoEn(100)){
      let nuevaRama = new Boid(this.x, this.y, this.t * 0.8, this.a + random(-1.5, 1.5));
      nuevaRama.col = this.col;
      boids.push(nuevaRama)
    }
  }
}


function mousePressed(){
  let b = new Boid(mouseX, mouseY, (mouseY/height) * 50, -HALF_PI);
  boids.push(b);
}

function keyTyped(){
  if(key === " "){
   fondo(color('#FFF'), color('#96784C'));
  }
  if(key === "b"){
    print("hay "+boids.length+" boids!!!")
  }
}

function unoEn(num){
  let n = random(0, num);
  if(n < 1){
    return true;
  }else{
    return false;
  }
}