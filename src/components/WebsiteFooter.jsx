import Wave from "react-wavify";
import ThemeToggle from "./ThemeToggle.jsx";
import { useTheme } from '../context/useTheme.js';

const waveStyle = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  transition: 'fill 0.4s ease',
};

function WebsiteFooter() {
  const { waveColors } = useTheme();

  return (
    <footer style={{ height: '140px', position: 'relative', overflow: 'clip' }}>
      <div style={{ opacity: '60%', height: '100%', overflow: 'hidden' }}>
        {/* Back layer: slowest, most transparent, tallest amplitude for depth */}
        <Wave
          fill={waveColors[0]}
          paused={false}
          options={{ height: 20, amplitude: 30, speed: 0.1, points: 3 }}
          style={{ ...waveStyle, height: '140px' }}
        />
        {/* Middle layer */}
        <Wave
          fill={waveColors[1]}
          paused={false}
          options={{ height: 25, amplitude: 25, speed: 0.15, points: 4 }}
          style={{ ...waveStyle, height: '120px' }}
        />
        {/* Front layer: fastest, most opaque */}
        <Wave
          fill={waveColors[2]}
          paused={false}
          options={{ height: 30, amplitude: 20, speed: 0.2, points: 5 }}
          style={{ ...waveStyle, height: '100px' }}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1,
        }}
      >
        <ThemeToggle />
      </div>
    </footer>
  );
}

export default WebsiteFooter;