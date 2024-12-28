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
  this.audioContext = new (window.AudioContext || window.webkitAudioContext)();

  this._playSineWave = function (frequency, duration = 1) {
    const oscillator = this.audioContext.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(
      frequency,
      this.audioContext.currentTime
    );
    oscillator.connect(this.audioContext.destination);
    oscillator.start();
    oscillator.stop(this.audioContext.currentTime + duration);
  };
  this.octave = 1;
}

TonalRing.prototype.display = function () {
  r = height / 4;
  beginShape();
  var firstX;
  var firstY;
  noStroke();
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
        if (firstX === undefined) {
          firstX = x;
          firstY = y;
        }
        try {
          this._playSineWave(440 * pow(2, i / 12) * 2 ** this.octave, 0.5); // learn frequency (I think)
        } catch (e) {
          console.log(e);
        }
      }
    });
  }
  vertex(firstX, firstY); // learn concavity
  vertex(width / 2, height / 2);
  endShape(CLOSE);
};

function TonalRingList() {
  this.rings = [new TonalRing([])];
  this.times = [0];
}
TonalRingList.prototype.addRing = function (ring, delta = 0) {
  this.rings.push(ring);
  this.times.push(delta);
};
TonalRingList.prototype.display = function (t) {
  //t = t % this.times[this.times.length - 1];
  for (var i = 0; i < this.times.length; i++) {
    if (t <= this.times[i]) {
      t = i;
      break;
    }
  }
  t = t - 1;
  //   t = t % this.times.length;
  console.log(t);
  console.log(this.rings[t]);
  if (this.rings[t] === undefined) {
    return;
  }

  this.rings[t].display();
};
TonalRingList.prototype.handleMidiEvent = function (noteId, velocity, delta) {
  if (delta != 0) {
    console.log(`new delta ${delta} ${noteId} ${velocity}`);
    this.addRing(new TonalRing([]), delta);
  }

  var note = new Note(this.rings[0].scale[noteId % 12], velocity / 127);
  this.rings[this.rings.length - 1].notes.push(note);
};
