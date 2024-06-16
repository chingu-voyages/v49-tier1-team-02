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

// groq api suggestion

let userHexcode = 0;
// Get the color harmony
function getColorHarmony(){
  if (colorPicker.colors.length != 0) {
    colorPicker.colors = [colorPicker.colors[0]];
  }

  groqQurey(userHexcode);

userHexcode = hexInput.value;

}

async function groqQurey(userHexcode) {
  let systemPrompt = "You are an expert on color harmony.  include base color as part of the suggestion. Do not give any explanation. Use space to separate suggestions"
  let userPrompt =  `base color: ${userHexcode}. Hex Code only.`;

  const url = 'https://api.groq.com/openai/v1/chat/completions';
  const apiKey = 'sk-1e0e4b7b-3b4d-4b7b-8d0e-7b3b4d4b7b8d';

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      messsages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: userPrompt,
        },
      ],
      temperature: 0.6,
      model: "llama3-70b-8192",
      max_tokens: 30,
    }),
});

const groqResponse = await response.json();

const colorSuggestions = groqResponse.choices[0].message.content;

let suggestions = colorSuggestions.split(" ");

for (let i = 0; i < suggestions.length; i++) {
  let suggestion = suggestions[i];
  colorPicker.addColor(suggestion);
  }
}
