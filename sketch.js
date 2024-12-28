function setup() {
  createCanvas(innerWidth, innerHeight);
  colorMode(HSB);
  angleMode(RADIANS);
}
let ring = new TonalRing([new Note("C", 1), new Note("E", 0.2)]);

function draw() {
  background(220);
  fill(255, 0, 0);
  ring.display();
}
