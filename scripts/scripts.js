const defaultColors = ["#f000", "#0f00", "#00f0", "#0fff", "#ff00", "#f0f0", "#f00f", "#0ff0", "#0f0f"];

/* get the color picker's color */
const hexInput = document.querySelector("#hexInput");
const rgbInput = document.querySelector("#rgbInput");
const colorList = document.getElementById("colorList");

/* create a new color picker instance */
const colorPicker = new iro.ColorPicker("#picker", {
  width: 150,
  colors: defaultColors,
  layoutDirection: 'horizontal'
});

/* set the color picker's color */
colorPicker.on(["color:init", "color:change"], (colors) => {
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
  colorPicker.color.hexString = this.value;
});

rgbInput.addEventListener('change', function
(colors) {
  colorPicker.color.rgbString = this.value;
});


function recommendColor() {
  const colorPrompt = "Please suggest colors that match with #ff0000";

  fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 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'
    },
    body: JSON.stringify({
      messages: [
        {
          role: "user",
          content: colorPrompt,
        },
      ],
      model: "llama3-8b-8192"
    })
  })
  .then(response => response.json())
  .then(data => console.log(data.choices[0].message.content))
  .catch(error => console.error(error));
}

recommendColor();