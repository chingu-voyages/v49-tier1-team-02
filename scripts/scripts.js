/* create a new color picker instance */
const colorPicker = new iro.ColorPicker("#picker", {
  width: 150,
  color: "#f00"
});

/* get the color picker's color */
const hexCode = document.querySelector("#hex-code");
const rgbCode = document.querySelector("#rgb-code");
const hexInput = document.querySelector("#hexInput");
const colorPreview = document.querySelector("#color-preview-box");

/* set the color picker's color */
colorPicker.on(["color:init", "color:change"], function 
(color) {
  hexCode.innerHTML = ("HEX Code: " + color.hexString);
  rgbCode.innerHTML = ("RGB Code: " + color.rgbString);
  hexInput.value = color.hexString;
  colorPreview.style.backgroundColor = color.hexString;
});

/* change the color picker's color */
hexInput.addEventListener('change', function
(color) {
  colorPicker.color.hexString = this.value;
});