const sphere = document.querySelector(".sphere");

// Define the gradient color stops
const gradients = [
  ["#d0ffcc", "#2de21d", "#ff1a1a"],
  ["#f2f2fb", "#07c2eb", "#6d0177"],
  ["#F1F9DC", "#CFE19D", "#054194"],
  ["#FCFDD2", "#F3C888", "#A10000"],
  ["#CDE4BB", "#D3B884", "#315018"],
  ["#F9FDD2", "#F0DA4B", "#57340A"],
  ["#F2F2FB", "#07C2EB", "#6D0177"],
  ["#6B60EC", "#354DCE", "#000000"],
];

let currentGradientIndex = 0;
let nextGradientIndex = 1;

let step = 0;
const steps = 100; // Number of steps for transition, increase for more smoothness

function computeStepColor(startColor, endColor, step) {
  const startRGB = parseInt(startColor.slice(1), 16);
  const startR = startRGB >> 16;
  const startG = (startRGB >> 8) & 0xff;
  const startB = startRGB & 0xff;

  const endRGB = parseInt(endColor.slice(1), 16);
  const endR = endRGB >> 16;
  const endG = (endRGB >> 8) & 0xff;
  const endB = endRGB & 0xff;

  const diffR = endR - startR;
  const diffG = endG - startG;
  const diffB = endB - startB;

  const r = Math.round(startR + diffR * step)
    .toString(16)
    .padStart(2, "0");
  const g = Math.round(startG + diffG * step)
    .toString(16)
    .padStart(2, "0");
  const b = Math.round(startB + diffB * step)
    .toString(16)
    .padStart(2, "0");

  return `#${r}${g}${b}`;
}

function animateGradient() {
  const currentColors = gradients[currentGradientIndex].map((color, index) => {
    return computeStepColor(
      gradients[currentGradientIndex][index],
      gradients[nextGradientIndex][index],
      step / steps
    );
  });

  sphere.style.background = `radial-gradient(95% 95% at 65% 32%, ${currentColors[0]} 0%, ${currentColors[1]} 25%, ${currentColors[2]} 100%)`;

  step++;

  if (step > steps) {
    step = 0;

    // Move to the next gradient array
    currentGradientIndex = nextGradientIndex;
    nextGradientIndex++;

    // Wrap around if we're at the end of the gradient list
    if (nextGradientIndex === gradients.length) {
      nextGradientIndex = 0; // Reset to the start
    }
  }

  requestAnimationFrame(animateGradient);
}

requestAnimationFrame(animateGradient);
