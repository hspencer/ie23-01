let video;
let slider;
let m = 10;

function setup() {
  let canvasWidth = document.getElementById("right").offsetWidth;
  let canvasHeight = windowHeight;
  
  // Si la ventana es más alta que ancha, hacer que el lienzo sea cuadrado
  if (windowHeight > canvasWidth) {
    canvasHeight = canvasWidth;
  }
  
  let cnv = createCanvas(canvasWidth, canvasHeight);
  cnv.parent("right");
  
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  
  slider = createSlider(2, 150, m); // Deslizador para controlar la distancia entre círculos
  slider.parent("left");
  
  fill(0);
  noStroke();
}


function draw() {
  clear(); // Limpia el lienzo en cada fotograma
  video.loadPixels();
  m = slider.value(); // Actualiza la distancia entre círculos según el deslizador

  for (let y = m; y < height - m; y += m * sqrt(3)) {
    for (let x = m; x < width - m; x += m * 3) {
      let xOffset = 0;
      if ((floor(y / (m * sqrt(3))) % 2) == 0) {
        xOffset = m * 1.5;
      }

      let vidX = floor(map(x + xOffset, m, width - m, 0, video.width));
      let vidY = floor(map(y, m, height - m, 0, video.height));
      let idx = (vidY * video.width + vidX) * 4;

      let brightness = (video.pixels[idx] + video.pixels[idx + 1] + video.pixels[idx + 2]) / 3;
      let circleSize = map(brightness, 0, 255, m * 3, 0); // Invierte el mapeo
      ellipse(x + xOffset, y, circleSize);
    }
  }
}