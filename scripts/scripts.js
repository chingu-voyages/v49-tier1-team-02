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


async function recommendColor() { 
  const colorPrompt = "Please suggest 5 colors that match with #ff0000. Please return only the hex codes, without any other texts"; 

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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' 
      },
      body: JSON.stringify({
        messages: [
          { role: "user", content: colorPrompt }
        ],
        model: "llama3-8b-8192" 
      })
    });

    const data = await response.json(); 
    const colorsResponse = data.choices[0].message.content; 
    const suggestedColorArray = getHexCodes(colorsResponse);
    return suggestedColorArray; 

  } catch (error) {
    return error; 
  }
}

function getHexCodes(colorMessage) {
  const hexCodes = [];
  for (let index = 0; index < colorMessage.length; index++) {
    const character = colorMessage[index];
    if (character === "#") {
      const singleColorCode = colorMessage.slice(index, index + 7);
      hexCodes.push(singleColorCode);
    }
  }
  return hexCodes;
}

recommendColor();