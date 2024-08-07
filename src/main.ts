import "./effect";
import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="animation-container">
   <canvas id="effect-canvas"></canvas>
  </div>
`;
