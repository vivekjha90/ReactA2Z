import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  Users, Stethoscope, Bell, Wrench,
  BarChart2, UserCheck, LayoutDashboard,
  LogOut, Settings, Scissors, Menu, X
} from 'lucide-react';

// ── Responsive hook ──────────────────────────────────────────
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < breakpoint);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, [breakpoint]);
  return isMobile;
}

// ── Icon map ─────────────────────────────────────────────────
const getIcon = (name) => {
  switch (name.toLowerCase()) {
    case 'staff':       return <Users size={18} />;
    case 'specialists': return <Stethoscope size={18} />;
    case 'remainder':   return <Bell size={18} />;
    case 'services':    return <Wrench size={18} />;
    case 'analytics':   return <BarChart2 size={18} />;
    case 'visitors':    return <UserCheck size={18} />;
    case 'dashboard':   return <LayoutDashboard size={18} />;
    default:            return <Scissors size={18} />;
  }
};

function Dashboard() {
  const role = localStorage.getItem("userRole");
  const location = useLocation();
  const isMobile = useIsMobile();
  const [drawerOpen, setDrawerOpen] = useState(false);

  
  useEffect(() => { if (!isMobile) setDrawerOpen(false); }, [isMobile]);

  const menuConfig = [
    { name: 'Staff',       href: 'staff',      roles: ['owner', 'specialist'] },
    { name: 'Specialists', href: 'specialists', roles: ['owner'] },
    { name: 'Remainder',   href: 'remainder',   roles: ['owner'] },
    { name: 'Services',    href: 'services',    roles: ['owner', 'specialist', 'user'] },
    { name: 'Analytics',   href: 'analytics',   roles: ['owner'] },
    { name: 'Visitors',    href: 'visitors',    roles: ['owner', 'staff'] },
  ];

  const allowedMenus = menuConfig.filter(m => m.roles.includes(role));
  const isDashboardHome = location.pathname === '/dashboard' || location.pathname === '/dashboard/';

  
  const SidebarContent = ({ showClose = false }) => (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>

      {/* Brand */}
      <div style={{ padding: '1.75rem 1.5rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: '1.25rem', fontWeight: 900, letterSpacing: '-0.04em', color: '#1e293b', fontStyle: 'italic' }}>
            mySalon
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.5rem' }}>
            <span style={{ width: '0.4rem', height: '0.4rem', borderRadius: '9999px', background: '#6366f1', display: 'inline-block' }} />
            <span style={{ fontSize: '0.625rem', fontWeight: 800, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.18em' }}>
              {role}
            </span>
          </div>
        </div>

       
        {showClose && (
          <button
            onClick={() => setDrawerOpen(false)}
            style={{ background: 'rgba(99,102,241,0.08)', border: 'none', borderRadius: '0.625rem', padding: '0.4rem', cursor: 'pointer', color: '#6366f1', display: 'flex' }}
          >
            <X size={18} />
          </button>
        )}
      </div>

      <div style={{ height: '1px', background: 'rgba(148,163,184,0.15)', margin: '0 1.25rem' }} />

     
      <nav style={{ flex: 1, padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.125rem', overflowY: 'auto' }}>
        {allowedMenus.map((item) => {
          const isActive = location.pathname.includes(item.href);
          return (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => setDrawerOpen(false)}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.875rem',
                padding: '0.625rem 1rem',
                borderRadius: '0.875rem',
                fontSize: '0.8125rem', fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.2s',
                background: isActive ? '#4f46e5' : 'transparent',
                color: isActive ? '#fff' : '#64748b',
                boxShadow: isActive ? '0 4px 14px rgba(99,102,241,0.35)' : 'none',
              }}
              onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = 'rgba(255,255,255,0.8)'; e.currentTarget.style.color = '#1e293b'; }}}
              onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#64748b'; }}}
            >
              <span style={{ color: isActive ? '#fff' : '#94a3b8', display: 'flex' }}>
                {getIcon(item.name)}
              </span>
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div style={{ height: '1px', background: 'rgba(148,163,184,0.15)', margin: '0 1.25rem' }} />

      
      
    </div>
  );

  
  const sidebarShell = {
    background: 'rgba(255,255,255,0.80)',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    border: '1px solid rgba(255,255,255,0.85)',
    boxShadow: '0 8px 32px rgba(99,102,241,0.10)',
    overflow: 'hidden',
  };

  return (
    <>
      <style>{`
        @keyframes blob {
          0%   { transform: translate(0,0) scale(1); }
          33%  { transform: translate(30px,-50px) scale(1.1); }
          66%  { transform: translate(-20px,20px) scale(0.9); }
          100% { transform: translate(0,0) scale(1); }
        }
        .blob-1 { animation: blob 20s infinite alternate; }
        .blob-2 { animation: blob 25s infinite alternate-reverse; }
        .blob-3 { animation: blob 18s infinite linear; }
      `}</style>

      <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', position: 'relative', background: '#fdfbff' }}>

       
        <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
          <div className="blob-1" style={{ position: 'absolute', top: '-20%', left: '-10%', width: '70%', height: '70%', borderRadius: '9999px', background: 'rgba(199,210,254,0.5)', filter: 'blur(120px)' }} />
          <div className="blob-2" style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '60%', height: '60%', borderRadius: '9999px', background: 'rgba(254,205,211,0.5)', filter: 'blur(120px)' }} />
          <div className="blob-3" style={{ position: 'absolute', top: '20%', right: '10%', width: '40%', height: '40%', borderRadius: '9999px', background: 'rgba(204,251,241,0.4)', filter: 'blur(100px)' }} />
        </div>

        
        {!isMobile && (
          <div style={{
            ...sidebarShell,
            position: 'relative', zIndex: 10,
            width: '15rem', minWidth: '15rem',
            margin: '1rem 0 1rem 1rem',
            borderRadius: '1.75rem',
            display: 'flex', flexDirection: 'column',
          }}>
            <SidebarContent showClose={false} />
          </div>
        )}

        
        {isMobile && drawerOpen && (
          <>
           
            <div
              onClick={() => setDrawerOpen(false)}
              style={{ position: 'fixed', inset: 0, zIndex: 40, background: 'rgba(15,23,42,0.25)', backdropFilter: 'blur(2px)' }}
            />
            {/* Drawer */}
            <div style={{
              ...sidebarShell,
              position: 'fixed', top: 0, left: 0, bottom: 0,
              width: '16rem', zIndex: 50,
              borderRadius: '0 1.75rem 1.75rem 0',
              display: 'flex', flexDirection: 'column',
            }}>
              <SidebarContent showClose={true} />
            </div>
          </>
        )}

      
        <div style={{
          position: 'relative', zIndex: 10,
          flex: 1,
          margin: isMobile ? '0.75rem' : '1rem',
          background: 'rgba(255,255,255,0.40)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderRadius: isMobile ? '1.5rem' : '2rem',
          border: '1px solid rgba(255,255,255,0.65)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.04)',
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
          minWidth: 0,
        }}>

         
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.6)', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>

             
              {isMobile && (
                <button
                  onClick={() => setDrawerOpen(true)}
                  style={{ background: 'rgba(99,102,241,0.08)', border: 'none', borderRadius: '0.625rem', padding: '0.45rem', cursor: 'pointer', color: '#6366f1', display: 'flex' }}
                >
                  <Menu size={20} />
                </button>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#94a3b8', fontWeight: 500 }}>
                <LayoutDashboard size={15} color="#818cf8" />
                <span style={{ color: '#cbd5e1' }}>/</span>
                <span style={{ color: '#334155', fontWeight: 600, textTransform: 'capitalize' }}>
                  {isDashboardHome ? 'Home' : location.pathname.split('/').filter(Boolean).pop()}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.375rem 1rem', background: 'rgba(255,255,255,0.65)', border: '1px solid rgba(255,255,255,0.9)', borderRadius: '9999px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', flexShrink: 0 }}>
              <span style={{ width: '0.375rem', height: '0.375rem', borderRadius: '9999px', background: '#34d399', display: 'inline-block' }} />
              <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.15em' }}>{role}</span>
            </div>
          </div>

          {/* Page body */}
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {isDashboardHome ? (
              <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'clamp(1.5rem, 5vw, 4rem)', textAlign: 'center' }}>

                <div style={{ marginBottom: '2rem', padding: '0.375rem 1.5rem', background: 'rgba(255,255,255,0.65)', border: '1px solid rgba(255,255,255,0.9)', borderRadius: '9999px', fontSize: '0.625rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.35em' }}>
                  Current Access: <span style={{ color: '#6366f1' }}>{role}</span>
                </div>

                <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 800, color: '#1e293b', lineHeight: 1.1, letterSpacing: '-0.03em', margin: 0 }}>
                  Welcome back.
                  <span style={{ display: 'block', marginTop: '0.5rem', background: 'linear-gradient(90deg, #818cf8, #a78bfa, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontStyle: 'italic', paddingBottom: '0.25rem' }}>
                    Breathe deeply.
                  </span>
                </h1>

                <p style={{ marginTop: '1.5rem', fontSize: 'clamp(0.9rem, 2vw, 1.125rem)', color: 'rgba(100,116,139,0.85)', maxWidth: '28rem', fontWeight: 300, lineHeight: 1.7 }}>
                  Your mindfulness space is ready. Manage your panel with clarity and ease.
                </p>

                <button
                  style={{ marginTop: '2.5rem', padding: '0.875rem 2.25rem', background: '#fff', color: '#4f46e5', borderRadius: '2rem', fontWeight: 800, fontSize: '0.8125rem', textTransform: 'uppercase', letterSpacing: '0.12em', border: '1px solid rgba(99,102,241,0.1)', boxShadow: '0 4px 20px rgba(99,102,241,0.08)', cursor: 'pointer', transition: 'all 0.3s', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(99,102,241,0.15)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(99,102,241,0.08)'; }}
                >
                  <span style={{ fontSize: '1.1rem' }}>✨</span> Enter Dashboard
                </button>
              </div>
            ) : (
              <div style={{ padding: '1.5rem' }}>
                <Outlet />
              </div>
            )}
          </div>
        </div>

      </div>
    </>
  );
}

export default Dashboard;