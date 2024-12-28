var ringList = new TonalRingList();

ringList.addRing(
  new TonalRing([new Note("F", 1), new Note("G#", 1), new Note("C", 1)]),
  0
);
ringList.addRing(
  new TonalRing([new Note("C#", 1), new Note("F", 1), new Note("G#", 1)]),
  1
);
ringList.addRing(
  new TonalRing([new Note("C", 1), new Note("E", 1), new Note("G", 1)]),
  2
);
ringList.addRing(
  new TonalRing([new Note("D#", 1), new Note("F", 1), new Note("A#", 1)]),
  2
);
ringList.addRing(
  new TonalRing([new Note("E", 1), new Note("F", 1), new Note("A#", 1)]),
  2
);
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
  frameRate(1);
}
//let ring = new TonalRing([new Note("C", 1), new Note("E", 1)]);

function draw() {
  background(220);
  fill(255, 0, 0);
  //ring.display();
  ringList.display(frameCount);
}
