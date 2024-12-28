function TonalRing(tones) {
  this.tones = tones;
  this.notes = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ];

  if (typeof tones[0] === "string") {
    console.log("mappinginging");
    this.tones = tones.map(function (tone) {
      return this.notes.indexOf(tone);
    });
  }
}

TonalRing.prototype.display = function () {
  fill(255, 0, 0);
  r = height / 4;
  beginShape();
  for (var i = 0; i < 12; i++) {
    // centered, starts at 12 o'clock
    var x = width / 2 + r * cos((TWO_PI * i - PI / 4) / 12);
    var y = height / 2 + r * sin((TWO_PI * i - PI / 4) / 12);
    ellipse(x, y, 10, 10);
    text(this.notes[i], x, y);
    if (this.tones.includes(i)) {
      vertex(x, y);
    }
  }
  endShape(CLOSE);
};
