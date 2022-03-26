function preload() {
  // preload font
  primaryFont = loadFont(
      "https://fonts.cdnfonts.com/s/76424/BronsonBlack-BWP1B.woff"
    );
  }
  
  function setup() {
    accepted = confirm("WARNING\nProgram may generate flashing colors");
    waves = []; // where created waves will be kept and removed
    
    // default values
    // [r, g, b]
    bgColor = [200, 200, 0];
    waveColor = [0, 0, 0]
    waveSpeed = 2;
    waveThickness = 2;

    // input values
    const waveSpeedSlider = document.querySelector("#wave-speed")
    const waveThicknessInput = document.querySelector("#wave-weight")
    const BgColorPicker = document.querySelector("#bg-color")
    const waveColorPicker = document.querySelector("#wave-color")
    
    // set values from the inputs
    waveSpeed = Number(waveSpeedSlider.value); 
    waveThickness = Number(waveThicknessInput.value);
    waveColor = waveColorPicker.value.replace('#', '').convertToRGB();
    bgColor = BgColorPicker.value.replace('#', '').convertToRGB();

    inputs = [waveSpeedSlider, waveThicknessInput, waveColorPicker, BgColorPicker]

    console.log(waveColorPicker.value.replace('#', '').convertToRGB())
    // use a for loop to add event listener to earch input
    inputs.forEach(input => {
      input.addEventListener("input", (ev) => {
        const inputValue = ev.currentTarget.value; 
        
        // update variables depending on the input that was changed
        switch (ev.currentTarget.id) {
          case "wave-speed":
            waveSpeed = Number(inputValue);
          break;
         
          case "bg-color":
            bgColor = BgColorPicker.value.replace('#', '').convertToRGB()
          break
         
          case "wave-color":
            waveColor = waveColorPicker.value.replace('#', '').convertToRGB()
          break
            
          case "wave-weight":
            waveThickness = Number(inputValue);
          break
          
          default:
            console.warn('something went wrong')
          break;
        }
      })
    })

    createCanvas(400, 400);

    // create a wave every x interval
    setInterval(() => {
      // create wave
      waves = [...waves, new Wave(0, waveColor, waveThickness)];
  
      // remove the wave when is outside the canvas view
      if (waves[0].radius > 600) {
        waves.shift();
      }
      
    }, 1000); // convert to milliseconds
  }
  
  function draw() {
    background(bgColor);
  
    if (accepted) {
      waves.forEach((wave) => {
        wave.create();
        wave.send(waveSpeed);
        
        // fade out
        if (wave.radius > 150 - wave.waveWeight) {
          wave.fade(0.85);
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
    constructor(radius, waveColor = [0, 0 ,0], waveWeight = 1) {
      this.radius = radius;
      this.speed = 1;
      this.waveWeight = waveWeight;
      this.waveColor = waveColor;
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
  
// add prototype function on string to convert hex to rgb
String.prototype.convertToRGB = function(){
  if(this.length != 6){
      throw "Only six-digit hex colors are allowed.";
  }

  var aRgbHex = this.match(/.{1,2}/g);
  var aRgb = [
      parseInt(aRgbHex[0], 16),
      parseInt(aRgbHex[1], 16),
      parseInt(aRgbHex[2], 16)
  ];
  return aRgb;
}