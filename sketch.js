var ringList = new TonalRingList();

document
  .getElementById("midiFileInput")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const arrayBuffer = e.target.result;
        const midi = new Midi(arrayBuffer);
        midi.tracks.forEach((track) => {
          track.notes.forEach((note) => {
            const noteId = note.midi;
            const velocity = note.velocity * 127;
            const delta = note.time;
            ringList.handleMidiEvent(noteId, velocity, delta);
          });
        });
      };
      reader.readAsArrayBuffer(file);
    }
  });

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
