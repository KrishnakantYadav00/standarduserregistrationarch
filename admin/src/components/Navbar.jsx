import { useLocation } from 'react-router-dom';

const titles = {
  '/dashboard': 'Dashboard',
  '/products':  'Product Management',
};

export default function Navbar() {
  const { pathname } = useLocation();
  const title = titles[pathname] || 'Admin Panel';

  return (
    <header className="navbar">
      <div className="navbar-left">
        <div className="navbar-menu-icon">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </div>
        <h1 className="navbar-title">{title}</h1>
      </div>
      <div className="navbar-right">
        <div className="navbar-badge">
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
          <span>Administrator</span>
        </div>
      </div>
    </header>
  );
}
