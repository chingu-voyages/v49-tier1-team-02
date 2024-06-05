const defaultColors = ["#f000", "#0f00", "#00f0", "#0fff", "#ff00", "#f0f0", "#f00f", "#0ff0", "#0f0f"];

/* get the color picker's color */
const hexCode = document.querySelector("#hex-code");
const rgbCode = document.querySelector("#rgb-code");
const hexInput = document.querySelector("#hexInput");
const rgbInput = document.querySelector("#rgbInput");
const colorList = document.getElementById("colorList");

/* create a new color picker instance */
const colorPicker = new iro.ColorPicker("#picker", {
  width: 150,
  colors: defaultColors
});

/* set the color picker's color */
colorPicker.on(["color:init", "color:change"], (colors) => {
//  rgbCode.innerHTML = ("RGB Code: " + colors.rgbString);
  colorList.innerHTML = '';
  hexInput.value = colors.hexString;
  rgbInput.value = colors.rgbString;
  
  colorPicker.colors.forEach(colors => {
    colorList.innerHTML += `
      <li>
        <div class="swatch" style="background: ${ colors.hexString }"></div>
      </li>
    `;
  });
});

/* change the color picker's color */
hexInput.addEventListener('change', function
(colors) {
  colorPicker.colors.hexString = this.value;
});

rgbInput.addEventListener('change', function
(colors) {
  colorPicker.colors.rgbString = this.value;
});