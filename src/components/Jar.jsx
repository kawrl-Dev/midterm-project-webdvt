import Wave from 'react-wavify';
import '../css/Jar.css';

function Jar({ label, percent, amount, color, sublabel, size = 'md', width, height }) {
  const clamped = Math.max(0, Math.min(100, percent));

  // Only set inline custom properties when a one-off width/height is passed,
  // so `size` presets keep working untouched otherwise.
  const customVars = {};
  if (width) customVars['--jar-width'] = width;
  if (height) customVars['--jar-height'] = height;

  return (
    <div
      className={`jar-container ${size !== 'md' ? `jar-${size}` : ''}`}
      style={customVars}
    >
      <div className="jar-shape">
        <div className="jar-fill" style={{ height: `${clamped}%` }}>
          <Wave
            fill={color}
            paused={false}
            options={{ height: 6, amplitude: 6, speed: 0.2, points: 4 }}
            style={{ position: 'absolute', top: '-14px', left: 0, width: '100%', height: '24px'}}
          />
          <div className="jar-fill-body" style={{ backgroundColor: color }} />
        </div>
        {clamped === 0 && <span className="jar-empty-label">Empty</span>}
      </div>

      <div className="jar-caption">
        <div className="jar-label text-truncate">{label}</div>
        {sublabel && <div className="jar-sublabel">{sublabel}</div>}
        <div className="jar-percent">{clamped.toFixed(1)}%</div>
        <div className="jar-amount">₱{amount.toFixed(2)}</div>
      </div>
    </div>
  );
}

export default Jar;