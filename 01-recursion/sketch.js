/*
   Árbol de Recursión
*/

// Declaración de variables globales para almacenar el ángulo de ramificación y el control deslizante
let spread, spreadSlider;

// Función de configuración inicial
function setup() {
  // Crear un lienzo del tamaño de la ventana del navegador
  createCanvas(windowWidth, windowHeight);
  
  // Establecer el color de relleno para las figuras dibujadas
  fill(255, 100);
  
  // Crear un control deslizante para ajustar el ángulo de ramificación
  spreadSlider = createSlider(0, HALF_PI, 0.5, 0.01);
  
  // Posicionar el control deslizante en la ventana
  spreadSlider.position(20, 20);
  
  // Llamar a la función `redraw` cuando cambie el valor del control deslizante
  spreadSlider.changed(redraw);
  
  // Detener el ciclo de dibujo de p5.js
  noLoop();
}

// Función principal de dibujo
function draw() {
  // Obtener el valor actual del control deslizante y almacenarlo en la variable `spread`
  spread = spreadSlider.value();
  
  // Establecer el color de fondo del lienzo
  background(220);
  
  // Dibujar dos ramas principales del árbol
  branch(width/3, height, -HALF_PI, height/5);
  branch(width* 2/3, height, -HALF_PI, height/5);
}

// Función recursiva para dibujar una rama
function branch(x, y, ang, mag){
  // Guardar el estado actual del sistema de coordenadas
  push();
  
  // Mover el origen del sistema de coordenadas a la posición (x, y)
  translate(x, y);
  
  // Convertir coordenadas polares a coordenadas cartesianas
  let nx = cos(ang) * mag;
  let ny = sin(ang) * mag;
  
  // Establecer el grosor de la línea en función de la longitud de la rama
  let sw = map(mag, 3, 300, .25, 15);
  strokeWeight(sw);
  
  // Dibujar la línea que representa la rama
  line(0, 0, nx, ny);
  
  // Si la longitud de la rama es suficientemente grande, dibujar subramas
  if(mag > 10){
    let numBranches = round(random(2, 5));
    for(let i = 0; i < numBranches; i++){
      branch(nx, ny, ang + random(-spread, spread), mag * random(0.3, 0.9));
    }
  }
  
  // Restaurar el estado del sistema de coordenadas
  pop();
}
