function preload() {
    primaryFont = loadFont(
      "https://fonts.cdnfonts.com/s/76424/BronsonBlack-BWP1B.woff"
    );
  }
  
  function setup() {
    accepted = confirm("WARNING\nProgram may generate flashing colors");
  
    waves = [];
    bgColor = [200, 200, 0]; //rgb
  
    createCanvas(400, 400);
  
    setInterval(() => {
      waves = [...waves, new Wave()];
  
      // remove the wave when is outside the viewport
      if (waves[0].radius > 600) {
        waves.shift();
      }
    }, 1000 * 2);
  }
  
  function draw() {
    background(bgColor);
  
    if (accepted) {
      waves.forEach((wave) => {
        wave.create(0, 20);
        wave.send(2);
  
        // fade out
        if (wave.radius > 200) {
          wave.fade(1.5);
        }
      });
    } else {
      textSize(32);
      textFont(primaryFont);
      textAlign(CENTER);
      text("Sorry", 400 / 2, 400 / 2);
    }
  }
  
  class Wave {
    constructor(radius, waveWeight = 1) {
      this.radius = 0;
      this.speed = 1;
      this.waveWeight = waveWeight;
      this.opacity = 0;
      this.waveColor = [0, 0, 0];
    }
  
    create() {
      noFill();
      strokeWeight(this.waveWeight);
      stroke(this.waveColor);
      ellipse(200, 200, this.radius);
    }
  
    send(speed) {
      this.speed = speed;
  
      if (this.radius < 800) {
        this.radius += this.speed;
        this.waveWeight += this.speed / 30; // increase the thickness gradually, but based on the speed (idk why)
      }
    }
  
    fade(rate = 1) {
      /*
            the plan is to make the rgb values of the wave
            to be the same as the background rgb values, 
            so we're simulating transparency...
      */
  
      this.waveColor = [...this.waveColor].map((v, i) => {
        // if the wave rgb value is less than the bg color, increase till they match
        if (v < bgColor[i]) {
          v += rate;
        } else if (v > bgColor[i]) {
          // else decrease till match
          v -= rate;
        }
  
        return v;
      });
    }
  }
  