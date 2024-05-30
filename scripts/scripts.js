const colorPicker = new iro.ColorPicker("#picker", {
  width: 150,
  color: "#f00"
});

const hexCode = document.querySelector("#hex-code");
const rgbCode = document.querySelector("#rgb-code");
const hslCode = document.querySelector("#hsl-code");

colorPicker.on(["color:init", "color:change"], function 
(color) {
  hexCode.innerHTML = ("HEX Code: " + color.hexString);
  rgbCode.innerHTML = ("RGB Code: " + color.rgbString);
  hslCode.innerHTML = ("HSL Code: " + color.hslString);
});
