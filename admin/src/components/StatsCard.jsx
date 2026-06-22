export default function StatsCard({ label, value, icon, color, prefix = '' }) {
  return (
    <div className={`stats-card stats-card--${color}`}>
      <div className="stats-card-icon">{icon}</div>
      <div className="stats-card-body">
        <p className="stats-card-label">{label}</p>
        <p className="stats-card-value">
          {prefix}{typeof value === 'number' ? value.toLocaleString() : value}
        </p>
      </div>
      <div className="stats-card-glow" />
    </div>
  );
}
