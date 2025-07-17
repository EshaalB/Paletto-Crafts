import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaTools, FaInfoCircle, FaEnvelope, FaStar, FaPalette } from 'react-icons/fa';

const navLinks = [
  { to: '/', label: 'Home', icon: <FaHome /> },
  { to: '/toolkit', label: 'Toolkit', icon: <FaTools /> },
  { to: '/about', label: 'About', icon: <FaInfoCircle /> },
  { to: '/contact', label: 'Contact', icon: <FaEnvelope /> },
  { to: '/favorites', label: 'Favorites', icon: <FaStar /> },
  { to: '/templates', label: 'Templates', icon: <FaPalette /> },
];

export default function Sidebar() {
  const location = useLocation();
  return (
    <aside style={{
      width: 220,
      height: '100vh',
      background: '#181825',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding: '2.5rem 1.2rem 2rem 1.2rem',
      position: 'fixed',
      left: 0,
      top: 0,
      bottom: 0,
      zIndex: 200,
      boxShadow: '2px 0 16px rgba(0,0,0,0.10)',
      borderRight: '2px solid #232336',
      gap: 10,
    }}>
      <div style={{ fontWeight: 900, fontSize: 28, marginBottom: 44, letterSpacing: 1, alignSelf: 'center', color: '#c4b5fd' }}>Paletto Crafts</div>
      <nav style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {navLinks.map(link => {
          const isActive = location.pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                color: isActive ? '#fff' : '#c4b5fd',
                background: isActive ? 'linear-gradient(90deg, #8b5cf6 60%, #6366f1 100%)' : 'transparent',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: 19,
                padding: '14px 22px',
                borderRadius: 12,
                margin: '2px 0',
                transition: 'background 0.18s, color 0.18s, box-shadow 0.18s',
                boxShadow: isActive ? '0 4px 16px rgba(139,92,246,0.13)' : 'none',
                outline: isActive ? '2px solid #fff' : 'none',
              }}
              tabIndex={0}
            >
              <span style={{ fontSize: 24, display: 'flex', alignItems: 'center' }}>{link.icon}</span>
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div style={{
        marginTop: 'auto',
        width: '100%',
        padding: '20px 14px',
        background: '#232336',
        borderRadius: 14,
        marginBottom: 10,
        color: '#c4b5fd',
        fontWeight: 700,
        fontSize: 17,
        textAlign: 'center',
        boxShadow: '0 2px 8px rgba(139,92,246,0.08)',
        border: '1.5px solid #232336',
      }}>
        Palette Controls
        {/* Future: Add palette buttons, lock, randomize, etc. */}
      </div>
    </aside>
  );
} 