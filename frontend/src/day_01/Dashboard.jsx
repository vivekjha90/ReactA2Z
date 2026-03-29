import React from 'react';
import { Link, Outlet, useLocation} from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  const role = localStorage.getItem("userRole"); 
  const location = useLocation();

  const menuConfig = [
    { name: 'Staff', href: 'staff', roles: ['owner', 'specialist'] },
    { name: 'Specialists', href: 'specialists', roles: ['owner'] },
    { name: 'Remainder', href: 'remainder', roles: ['owner'] },
    { name: 'Services', href: 'services', roles: ['owner', 'specialist'] },
    { name: 'Analytics', href: 'analytics', roles: ['owner'] },
    { name: 'Visitors', href: 'visitors', roles: ['owner', 'staff'] },
  ];

  const allowedMenus = menuConfig.filter(menu => menu.roles.includes(role));

  return (
    <div className="dashboard-container">
    {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo-text">mySalon</div>
          <span className="role-badge">{role}</span>
        </div>
        
        <ul className="menu-list">
          {allowedMenus.map((item) => {
            const isActive = location.pathname.includes(item.href);
            return (
              <li key={item.name} className="menu-item">
                <Link 
                  to={item.href} 
                  className={`menu-link ${isActive ? 'active' : ''}`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="content-card">
          {location.pathname === '/dashboard' || location.pathname === '/dashboard/' ? (
            <div className="welcome-section">
              <h1 className="welcome-title">Welcome back!</h1>
              <p className="welcome-sub">
                You are managing the panel as <span className="highlight-role">{role}</span>
              </p>
              
              <div className="promo-banner">
                ✨ Enjoy the mindfulness services
              </div>
            </div>
          ) : (
            <Outlet /> 
          )}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
