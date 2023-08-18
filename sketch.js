let colors;
let currentColorIndex = 0;

function setup(){
  let cnv = createCanvas(windowWidth, windowHeight);
  colors = [color(138, 191, 225, 40), color(90, 130, 194, 40), color(75, 111, 175, 40), color(66, 99, 155, 40)];
}

function draw(){
  stroke(colors[currentColorIndex]);
  line(width/2, height/2, mouseX, mouseY);
  currentColorIndex = (currentColorIndex + 1) % colors.length;
}

