
import { Groq } from '@groq/groq';

const colorPickerInput = '#FF69B4'; // Get the user's input color
const prompt = `Generate a color palette based on the input color ${colorPickerInput}, with a vibrant and playful tone.`;

const groq = new Groq({ apiKey: process.env.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 });
const response = await groq.completion(prompt);

// Process the response to extract the recommended colors
const recommendedColors = [];
const responseText = response.text;
const colorRegex = /\b(#\w{6})\b/g;
let match;
while ((match = colorRegex.exec(responseText)) !== null) {
  recommendedColors.push(match[1]);
}

// Display the recommended color palette to the user
const colorPaletteElement = document.getElementById('color-palette');
recommendedColors.forEach((color) => {
  const colorElement = document.createElement('div');
  colorElement.style.backgroundColor = color;
  colorElement.addEventListener('click', () => {
    // Handle color selection
  });
  colorPaletteElement.appendChild(colorElement);
});