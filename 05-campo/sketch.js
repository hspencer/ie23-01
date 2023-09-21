/*

Campo

*/



// Inicialización de variables
let zoomSlider, rSlider, angular;
let boids = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Crear boids iniciales
  for (let i = 0; i < 5555; i++) {
    boids.push(new Boid(random(width), random(height)));
  }
  
  // Crear controles de interfaz de usuario
  zoomSlider = createSlider(1, 1000, 55, 1);
  zoomSlider.position(10, height - 20);
  rSlider = createSlider(0, 50, 0, 0.001);
  rSlider.position(200, height - 20);
  angular = createCheckbox("snap", true);
  angular.position(400, height - 20);
}

function draw() {
  // Actualizar parámetros de control
  const zoom = zoomSlider.value();
  const r = rSlider.value();
  
  // Actualizar cada boid
  for (const boid of boids) {
    boid.update(zoom, r);
  }
  
  // Efecto de desvanecimiento
  fade();
}

function fade() {
  noStroke();
  blendMode(SCREEN);
  fill(255, 7);
  rect(0, 0, width, height);
  blendMode(BLEND);
}

class Boid {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.angle = noise(this.x / 55.5, this.y / 55.5) * TWO_PI * 2;
    this.color = getColor();
    this.age = 0;
    this.maxAge = random(100, 110);
    this.seed = random(10);
  }
  
  update(zoom, r) {
    // Actualizar posición y ángulo
    this.move(zoom, r);
    this.wrap();
    
    // Dibujar el boid
    this.render();
  }
  
  wrap() {
    this.x = (this.x + width) % width;
    this.y = (this.y + height) % height;
  }
  
  move(zoom, r) {
    const noiseVal = noise((this.x + this.seed * r) / zoom, (this.y + this.seed * r) / zoom);
    this.angle = angular.checked() ? round((noiseVal - 0.5) * TWO_PI * 2) : (noiseVal - 0.5) * TWO_PI * 2;
    this.x += cos(this.angle);
    this.y += sin(this.angle);
  }
  
  render() {
    this.age++;
    if(this.age > this.maxAge){
      this.x = random(width);
      this.y = random(width);
      this.age = 0;
    }
    stroke(this.color);
    strokeWeight(3)
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    point(0,0);
    pop();
  }
}

function mouseClicked() {
  boids.push(new Boid(mouseX, mouseY));
}

const colorPaletteArray = ["#4a019355", "#55049155", "#60098f55", "#6a0e8c55", "#74138855", "#7d188255", "#861d7c55", "#8e227655", "#96266f55", "#9e2b6755", "#a52f5f55", "#ac355555", "#b13b4c55", "#b6424355", "#ba493a55", "#bd503155", "#c0572855", "#c15f1f55", "#c1681455", "#c1700855", "#bf790055", "#bb820055", "#b78b0055", "#b2940155"];

function getColor() {
  const randomIndex = floor(random(colorPaletteArray.length));
  return colorPaletteArray[randomIndex];
}

