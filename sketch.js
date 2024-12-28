function setup() {
  createCanvas(innerWidth, innerHeight);
}

function draw() {
  background(220);
  fill(255, 0, 0);
  for (var i = 0; i < 12; i++) {
    var x = width / 2 + (height / 4) * cos((TWO_PI * i) / 12);
    var y = height / 2 + (height / 4) * sin((TWO_PI * i) / 12);
    ellipse(x, y, 10, 10);
  }
}
