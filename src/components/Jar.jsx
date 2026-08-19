import Wave from 'react-wavify';
import '../css/Jar.css';

function Jar({ label, percent, amount, color, sublabel }) {
  const clamped = Math.max(0, Math.min(100, percent));

  return (
    <div className="jar-container">
      <div className="jar-shape">
        <div className="jar-fill" style={{ height: `${clamped}%` }}>
          <Wave
            fill={color}
            paused={false}
            options={{ height: 6, amplitude: 6, speed: 0.2, points: 4 }}
            style={{ position: 'absolute', top: '-14px', left: 0, width: '100%' }}
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