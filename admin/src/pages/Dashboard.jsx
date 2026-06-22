import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import api from '../api/axios';
import StatsCard from '../components/StatsCard';

const ICONS = {
  users: (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 00-3-3.87"/>
      <path d="M16 3.13a4 4 0 010 7.75"/>
    </svg>
  ),
  orders: (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
      <line x1="3" y1="6" x2="21" y2="6"/>
      <path d="M16 10a4 4 0 01-8 0"/>
    </svg>
  ),
  products: (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  revenue: (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <line x1="12" y1="1" x2="12" y2="23"/>
      <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
    </svg>
  ),
};

export default function Dashboard() {
  const [stats, setStats]     = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/stats')
      .then(({ data }) => setStats(data))
      .catch(() => toast.error('Failed to load dashboard stats'))
      .finally(() => setLoading(false));
  }, []);

  const cards = stats
    ? [
        { label: 'Total Users',    value: stats.users,    color: 'indigo',  icon: ICONS.users,    prefix: '' },
        { label: 'Total Orders',   value: stats.orders,   color: 'violet',  icon: ICONS.orders,   prefix: '' },
        { label: 'Total Products', value: stats.products, color: 'cyan',    icon: ICONS.products, prefix: '' },
        { label: 'Total Revenue',  value: stats.revenue,  color: 'emerald', icon: ICONS.revenue,  prefix: '₹' },
      ]
    : [];

  return (
    <div className="page">
      <div className="page-header">
        <h2 className="page-title">Overview</h2>
        <p className="page-subtitle">Real-time business metrics from your store</p>
      </div>

      {loading ? (
        <div className="stats-grid">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="stats-skeleton" />
          ))}
        </div>
      ) : (
        <div className="stats-grid">
          {cards.map((c) => (
            <StatsCard key={c.label} {...c} />
          ))}
        </div>
      )}

      {/* Quick info */}
      {stats && (
        <div className="dashboard-info">
          <div className="info-card">
            <h3 className="info-card-title">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              System Summary
            </h3>
            <ul className="info-list">
              <li>
                <span>Active users in database</span>
                <strong>{stats.users}</strong>
              </li>
              <li>
                <span>Orders placed</span>
                <strong>{stats.orders}</strong>
              </li>
              <li>
                <span>Products in catalogue</span>
                <strong>{stats.products}</strong>
              </li>
              <li>
                <span>Average order value</span>
                <strong>
                  {stats.orders > 0
                    ? `₹${(stats.revenue / stats.orders).toFixed(2)}`
                    : '—'}
                </strong>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
