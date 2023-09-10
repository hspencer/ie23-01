// Inicializa un arreglo vacío para almacenar objetos de la clase Boid.
let boids;

// Función de configuración inicial
function setup() {
  // Crea un lienzo del tamaño de la ventana del navegador
  createCanvas(windowWidth, windowHeight);
  
  // Inicializa el arreglo de boids como vacío
  boids = [];
  
  // Establece el fondo del lienzo
  fondo(color('#FFF'), color('#96784C'));
  
  // Llena el arreglo de boids en posiciones aleatorias a lo largo del eje y
  for(let y=0; y < height; y++){
    if(unoEn(100)){
      let b = new Boid(random(width), y, (y/height) * 50, -HALF_PI);
      boids.push(b);
    }
  }
}

// Función para establecer el fondo del lienzo
function fondo(colA, colB){
  strokeWeight(1);
  for(let y = 0; y < height; y++){
    let col = lerpColor(colA, colB, y/height);
    stroke(col);
    line(0,y, width,y);
  }
}

// Función principal de dibujo
function draw() {
  // Itera a través de cada boid en el arreglo
  for(let i = 0; i < boids.length; i++){
    boids[i].draw(); // Dibuja el boid
    boids[i].go();   // Actualiza la posición y el estado del boid
    
    // Verifica si el boid debe ser eliminado del arreglo
    if(boids[i].t < 1 || 
       boids[i].x < 0 ||
       boids[i].x > width ||
       boids[i].y < 0 ||
       boids[i].y > height){
      boids.splice(i, 1); // Elimina el boid del arreglo
    }
  }
}

// Definición de la clase Boid
class Boid {
  constructor(x, y, t, a) {
    // Inicializa las propiedades del objeto
    let fade = 1/(y/height);
    this.x = x;
    this.y = y;
    this.t = t;  // tamaño
    this.a = a;  // ángulo
    this.seed = round(random(0, 999999));
    this.step = random(1,2);
    this.initSize = t;
    this.col = color(random(100, 80)*fade, random(90, 80)*fade, random(50, 50)*fade, 90);
  }
  
  // Función para dibujar el boid
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
  
  // Función para actualizar la posición y el estado del boid
  go(){
    // Actualiza el ángulo del boid usando ruido Perlin
    noiseSeed(this.seed);
    this.a += (noise(millis()/(this.t)*30) - 0.4725) * 0.333;
    
    // Calcula la diferencia entre el ángulo actual y el ángulo vertical (-PI/2)
    let dif = -HALF_PI - this.a;
    
    // Ajusta el ángulo del boid para que tienda a moverse hacia arriba
    this.a += dif * 0.018;
    
    // Actualiza la posición del boid usando coordenadas polares
    this.x += cos(this.a) * this.step;
    this.y += sin(this.a) * this.step;
    
    // Disminuye el tamaño del boid
    this.t *= 0.99;
    
    // Crea una nueva rama (boid) con cierta probabilidad
    if(unoEn(100)){
      let nuevaRama = new Boid(this.x, this.y, this.t * 0.8, this.a + random(-1.5, 1.5));
      nuevaRama.col = this.col;
      boids.push(nuevaRama);
    }
  }
}

// Función para añadir un nuevo boid cuando se hace clic con el mouse
function mousePressed(){
  let b = new Boid(mouseX, mouseY, (mouseY/height) * 50, -HALF_PI);
  boids.push(b);
}

// Funciones de teclado para interactuar con el programa
function keyTyped(){
  if(key === " "){
    fondo(color('#FFF'), color('#96784C'));
  }
  if(key === "b"){
    print("hay "+boids.length+" boids!!!")
  }
}

// Función auxiliar para determinar si un evento debe ocurrir con cierta probabilidad
function unoEn(num){
  let n = random(0, num);
  if(n < 1){
    return true;
  }else{
    return false;
  }
}
