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
  
