const hexCode = document.querySelector("#hex-code");
const rgbCode = document.querySelector("#rgb-code");
const hexInput = document.querySelector("#hexInput");

const colorPicker = new iro.ColorPicker("#picker", {
  width: 150,
  color: "#f00"
});

colorPicker.on(["color:init", "color:change"], function 
(color) {
  hexCode.innerHTML = ("HEX Code: " + color.hexString);
  rgbCode.innerHTML = ("RGB Code: " + color.rgbString);
  hexInput.value = color.hexString;
});

hexInput.addEventListener('change', function
(color) {
  colorPicker.color.hexString = this.value;
});