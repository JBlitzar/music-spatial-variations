function setup() {
  createCanvas(innerWidth, innerHeight);
}
let ring = new TonalRing(["C", "E", "G", "A#"]);

function draw() {
  background(220);
  fill(255, 0, 0);
  ring.display();
}
