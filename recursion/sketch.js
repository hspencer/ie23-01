/*

   Recursión
*/

let spread, spreadSlider;


function setup() {
  createCanvas(windowWidth, windowHeight);
  fill(255, 100);
  spreadSlider = createSlider(0, HALF_PI, 0.5, 0.01);
  spreadSlider.position(20, 20);
  spreadSlider.changed(redraw);
  noLoop();
}

function draw() {
  spread = spreadSlider.value();
  background(220);
  branch(width/3, height, -HALF_PI, height/3);
  branch(width* 2/3, height, -HALF_PI, height/3);
}

function branch(x, y, ang, mag){
  push();
  translate(x, y);

  // inentidad circular
  // pasar de coordadas polares a cartesianas
  
  let nx = cos(ang) * mag;
  let ny = sin(ang) * mag;

  let sw = map(mag, 3, 300, .25, 15);
  strokeWeight(sw);
  line(0, 0, nx, ny);

  if(mag > 10){
    let numBranches = round(random(2, 5));
    for(let i = 0; i < numBranches; i++){
      branch(nx, ny, ang + random(-spread, spread), mag * random(0.4, 0.7));
    }
  }
  pop();
}