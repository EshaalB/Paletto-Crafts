import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import useStore from './store';

export default function Navbar() {
  const location = useLocation();
  const { palette, darkMode, gradients, shadows, setDarkMode, setGradients, setShadows } = useStore();

  return (
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 2rem',
      background: darkMode ? '#181825' : '#fff', color: darkMode ? '#fff' : '#181825',
      borderBottom: darkMode ? '1px solid #232336' : '1px solid #eee'
    }}>
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Link to="/" style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'inherit', textDecoration: 'none' }}>Paletto Crafts</Link>
        <Link to="/" style={{ color: location.pathname === '/' ? palette.primary : 'inherit', textDecoration: 'none' }}>Home</Link>
        <Link to="/toolkit" style={{ color: location.pathname === '/toolkit' ? palette.primary : 'inherit', textDecoration: 'none' }}>Toolkit</Link>
        <Link to="/about" style={{ color: location.pathname === '/about' ? palette.primary : 'inherit', textDecoration: 'none' }}>About</Link>
        <Link to="/contact" style={{ color: location.pathname === '/contact' ? palette.primary : 'inherit', textDecoration: 'none' }}>Contact</Link>
        <Link to="/favorites" style={{ color: location.pathname === '/favorites' ? palette.primary : 'inherit', textDecoration: 'none' }}>Favorites</Link>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Palette Swatches */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <div title="Primary" style={{ width: 20, height: 20, borderRadius: 4, background: palette.primary, border: '2px solid #fff' }} />
          <div title="Secondary" style={{ width: 20, height: 20, borderRadius: 4, background: palette.secondary, border: '2px solid #fff' }} />
          <div title="Accent" style={{ width: 20, height: 20, borderRadius: 4, background: palette.accent, border: '2px solid #fff' }} />
        </div>
        {/* Dark Mode Toggle */}
        <label style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <input type="checkbox" checked={darkMode} onChange={e => setDarkMode(e.target.checked)} />
          <span>Dark</span>
        </label>
        {/* Gradients Checkbox */}
        <label style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <input type="checkbox" checked={gradients} onChange={e => setGradients(e.target.checked)} />
          <span>Gradients</span>
        </label>
        {/* Shadows Checkbox */}
        <label style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <input type="checkbox" checked={shadows} onChange={e => setShadows(e.target.checked)} />
          <span>Shadows</span>
        </label>
      </div>
    </nav>
  );
} 