# Canvas Pixel Effect

This project creates an interactive effect visualization using HTML5 Canvas and TypeScript. The animation responds to mouse movements, adjusting the colors and proximity index of the visual elements based on the cursor's position.

### Key Features

- **Interactive Animation**: The effect dynamically changes based on mouse movement, creating an engaging and responsive user experience.
- **Proximity Calculation**: Elements adjust their color and display a proximity index based on their distance from the mouse pointer.
- **Throttled Mouse Movement**: Mouse movement events are throttled to improve performance and reduce lag.
- **Canvas-Based Rendering**: Utilizes HTML5 Canvas for efficient rendering and manipulation of visual elements.
- **Euclidean Pop Animation**: A click event triggers a Euclidean pop animation, expanding and contracting the proximity distance to create a ripple effect.

### Preview

![Effect Visual](/docs/effImg.png "effect visual")

### Future Enhancements

- Customization Options: Add a settings panel for users to customize colors, sizes, animation speed, and other effect parameters.
- Performance Optimization: Further optimize the rendering and calculation logic for even smoother performance.
- Additional Effects: Implement additional visual effects and transitions to enhance the cyclone effect, such as different color schemes or animation patterns.
- Mobile Support: Optimize the effect for mobile devices, ensuring smooth performance and responsiveness on smaller screens.
- Dynamic Content: Allow dynamic content updates, such as changing the text or shapes displayed in the animation based on user input or external data.
- Advanced Proximity Calculations: Experiment with more advanced proximity calculations, such as different distance metrics or weighting functions.
- Sound Integration: Integrate sound effects that respond to mouse movements or clicks, adding an auditory dimension to the visual experience.
- Interactive Elements: Add interactive elements that users can click or drag to modify the animation, providing a more engaging experience.

## Installation

Follow these steps to set up and run the canvas pixel effect Project on your local machine.

### Prerequisites

Ensure you have the following installed:

- Node.js and npm
- TypeScript

### Setup

1. **Clone the Repository**

   Clone the project repository to your local machine.

   ```bash
   git clone https://github.com/vars7899/hoverEffect.git
   cd hoverEffect
   ```

2. **Install Dependecies**

   Install my-project with pnpm

   ```bash
   pnpm install
   ```

3. **Run on local machine**

   Clone the project repository to your local machine.

   ```bash
   pnpm run dev
   ```

   _visit the generated local link (http://localhost:5173), might be different if port already taken._
