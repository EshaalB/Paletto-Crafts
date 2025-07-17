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
      padding: '2rem 1rem',
      position: 'fixed',
      left: 0,
      top: 0,
      bottom: 0,
      zIndex: 200,
      boxShadow: '2px 0 12px rgba(0,0,0,0.08)',
      gap: 8,
    }}>
      <div style={{ fontWeight: 800, fontSize: 26, marginBottom: 36, letterSpacing: 1, alignSelf: 'center' }}>Paletto Crafts</div>
      <nav style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {navLinks.map(link => {
          const isActive = location.pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                color: isActive ? '#8b5cf6' : '#fff',
                background: isActive ? '#232336' : 'transparent',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: 18,
                padding: '12px 18px',
                borderRadius: 10,
                margin: '2px 0',
                transition: 'background 0.18s, color 0.18s',
                boxShadow: isActive ? '0 2px 8px rgba(139,92,246,0.10)' : 'none',
              }}
              tabIndex={0}
            >
              <span style={{ fontSize: 22, display: 'flex', alignItems: 'center' }}>{link.icon}</span>
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div style={{
        marginTop: 'auto',
        width: '100%',
        padding: '18px 12px',
        background: '#232336',
        borderRadius: 12,
        marginBottom: 8,
        color: '#c4b5fd',
        fontWeight: 600,
        fontSize: 16,
        textAlign: 'center',
        boxShadow: '0 2px 8px rgba(139,92,246,0.08)'
      }}>
        Palette Controls
        {/* Future: Add palette buttons, lock, randomize, etc. */}
      </div>
    </aside>
  );
} 