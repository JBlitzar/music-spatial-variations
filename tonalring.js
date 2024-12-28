function Note(tone, volume) {
  this.tone = tone;
  this.volume = volume;
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
  if (typeof tone === "string") {
    this.tone = this.notes.indexOf(tone);
  }
}

function TonalRing(notes) {
  this.notes = notes;
  this.scale = [
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
}

TonalRing.prototype.display = function () {
  r = height / 4;
  beginShape();
  vertex(width / 2, height / 2);
  for (var i = 0; i < 12; i++) {
    // centered, starts at 12 o'clock
    // learn trig
    var angle = (TWO_PI * i) / 12 - PI / 2;
    var x = width / 2 + r * cos(angle);
    var y = height / 2 + r * sin(angle);

    // learn dimensional analysis
    fill((angle * 180) / PI, 85, 90);
    //console.log((angle * 180) / PI);

    ellipse(x, y, 10, 10);
    text(this.scale[i], x, y);
    this.notes.forEach((element) => {
      if (element.tone === i) {
        var x = width / 2 + r * element.volume * cos(angle);
        var y = height / 2 + r * element.volume * sin(angle);
        vertex(x, y);
      }
    });
  }
  endShape(CLOSE);
};
