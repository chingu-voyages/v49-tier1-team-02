/* create a new color picker instance */
const colorPicker = new iro.ColorPicker("#picker", {
  width: 150,
  colors: ["#f00",
          "#ff0",
          "#0f0",
          "#0ff",
          "#00f",
          "#f0f",
] 
});

const colorList = document.getElementById("colorList");
const activeColor = document.getElementById("activeColor");

function setColor(colorIndex) {
  // setActiveColor expects the color index!
  colorPicker.setActiveColor(colorIndex);
}

/* get the color picker's color */
const hexCode = document.querySelector("#hex-code");
const rgbCode = document.querySelector("#rgb-code");
const hexInput = document.querySelector("#hexInput");

/* set the color picker's color */
colorPicker.on(["color:init", "color:change", "color:mount"], function 
(colors) {
  hexCode.innerHTML = ("HEX Code: " + colors.hexString);
  rgbCode.innerHTML = ("RGB Code: " + colors.rgbString);
  colorList.innerHTML = '';
  hexInput.value = colors.hexString;
  
  
  colorPicker.colors.forEach(colors => {
    const index = colors.index + 1;
    const hexString = colors.hexString;
    colorList.innerHTML += `
      <li onClick="setColor(${ index })">
        <div class="swatch" style="background: ${ hexString }"></div>
        <span>${ index }: ${ hexString }</span>
      </li>
    `;
  });
});

/* change the color picker's color */
hexInput.addEventListener('change', function
(colors) {
  colorPicker.colors.hexString = this.value;
});

colorPicker.on(["mount", "color:setActive", "color:change"], function(){
  // colorPicker.color is always the active color
  const index = colorPicker.colors.index;
  const hexString = colorPicker.colors.hexString;
  activeColor.innerHTML = `
    <div class="swatch" style="background: ${ hexString }"></div>
    <span>${ index }: ${ hexString }</span>
  `;
})
