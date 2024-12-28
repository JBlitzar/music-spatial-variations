function setup() {
  createCanvas(innerWidth, innerHeight);
  colorMode(HSB);
  angleMode(RADIANS);
}
let ring = new TonalRing(["C", "E", "G", "A#"]);

function draw() {
  background(220);
  fill(255, 0, 0);
  ring.display();
}
