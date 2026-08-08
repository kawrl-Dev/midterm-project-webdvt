import Wave from "react-wavify";
import {useTheme} from '../context/ThemeContext.jsx'

const waveStyle = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    transition: 'fill 0.4s ease',
}

function WebsiteFooter() {
    const {waveColors} = useTheme();

    return (
    <footer style={{height: '140px', overflow: 'hidden', opacity: '60%'}}>
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
    </footer>
  );
}

export default WebsiteFooter;