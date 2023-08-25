let video;
let slider;
let m = 10;

function setup() {
  // Obtiene el ancho del elemento con el ID "right" y establece el lienzo con ese ancho
  let halfWidth = document.getElementById("right").offsetWidth;
  let cnv = createCanvas(document.getElementById("right").offsetWidth, windowHeight);
  cnv.parent("right"); // Coloca el lienzo dentro del elemento con el ID "right"

  video = createCapture(VIDEO); // Captura el video de la cámara web del usuario
  video.size(width, height); // Define el tamaño del video para que coincida con el lienzo
  video.hide(); // Oculta el elemento de video en sí

  slider = createSlider(2, 150, m); // Crea un deslizador para controlar la distancia entre los círculos
  slider.parent("left"); // Coloca el deslizador dentro del elemento con el ID "left"
  
  fill(0);
  noStroke();
}

function draw() {
  clear(); // Limpia el lienzo en cada fotograma
  video.loadPixels(); // Carga los píxeles del video para su procesamiento

  m = slider.value(); // Actualiza la distancia entre los círculos según el valor del deslizador

  for (let y = m*2; y < height - m*2; y += m * sqrt(3)) {
    for (let x = m*2; x < width - m*2; x += m * 3) {
      let xOffset = 0;
      if ((floor(y / (m * sqrt(3))) % 2) == 0) {
        xOffset = m * 1.5;
      }

      // Mapea las coordenadas del lienzo a las coordenadas de los píxeles del video
      let vidX = floor(map(x + xOffset, m, width - m, 0, video.width));
      let vidY = floor(map(y, m, height - m, 0, video.height));
      let idx = (vidY * video.width + vidX) * 4;

      // Calcula el brillo en función de los píxeles del video
      let brightness = (video.pixels[idx] + video.pixels[idx + 1] + video.pixels[idx + 2]) / 3;
      let circleSize = map(brightness, 0, 255, m * 3, 0); // Invierte el mapeo

      ellipse(x + xOffset, y, circleSize); // Dibuja el círculo
    }
  }
}

function keyPressed() {
  if (key == 's' || key == 'S') { // Si se presiona la tecla "s"
    let timestamp = hour() + '-' + minute() + '-' + second(); // Crea una marca de tiempo
    saveCanvas('retrato-' + timestamp + '.png'); // Guarda el lienzo como una imagen PNG con el nombre único
  }
}

function windowResized(){
  clear();
  resizeCanvas(document.getElementById("right").offsetWidth, windowHeight); // Redimensiona el lienzo cuando se cambia el tamaño de la ventana
}
