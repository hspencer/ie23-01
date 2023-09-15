/*

Sol Lewitt:

50 puntos ubicados aleatoriamente sobre el muro conectados entre ellos

*/


let num, puntos, m;

function setup(){
  createCanvas(windowWidth, windowHeight);
  num = 50;
  puntos = []; // inicializo como un arreglo
  m = 100;
  for(let i = 0; i < num; i++){
    let p = createVector(random(m, width-m), random(m, height-m));
    puntos.push(p);
  }

  stroke(0, 90);
}

function draw(){
  background(255);
  for(let i = 0; i < puntos.length; i++){  
    for(let j = 0; j < i; j++){
      line(puntos[i].x, puntos[i].y, puntos[j].x, puntos[j].y);
    }
    
    // cada punto se mueva aleatoriamente
    puntos[i].x += random(-2, 2);
    puntos[i].y += random(-2, 2);
  }

  
}