import '../css/SegmentedBar.css';

// Renders a single pill-shaped bar divided into proportional colored
// segments (one per category) — the "iPhone storage" style — with a
// legend underneath naming each segment.
function SegmentedBar({ items, emptyMessage }) {
  if (items.length === 0) {
    return <p className="text-muted">{emptyMessage}</p>;
  }

  return (
    <div className="segmented-bar">
      <div className="segmented-bar-track">
        {items.map((item) => (
          <div
            key={item.category}
            className="segmented-bar-segment"
            style={{ width: `${item.percent}%`, backgroundColor: item.color }}
            title={`${item.category}: ${item.percent.toFixed(1)}%`}
          />
        ))}
      </div>

      <ul className="segmented-bar-legend">
        {items.map((item) => (
          <li key={item.category} className="segmented-bar-legend-item">
            <span className="legend-dot" style={{ backgroundColor: item.color }} />
            <span className="legend-label text-truncate">{item.category}</span>
            <span className="legend-value">₱{item.amount.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SegmentedBar;