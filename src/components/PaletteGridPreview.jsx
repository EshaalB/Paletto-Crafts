import React from 'react';
import useStore from '../store';

export default function PaletteGridPreview({ mode = 'grid' }) {
  const { palette } = useStore();
  if (mode === 'landing') {
    return (
      <div style={{
        width: 420,
        borderRadius: 18,
        background: palette.background,
        color: palette.text,
        boxShadow: '0 2px 16px rgba(0,0,0,0.10)',
        padding: '2.5rem 2rem',
        textAlign: 'center',
        fontFamily: 'inherit',
      }}>
        <h2 style={{ color: palette.primary, fontWeight: 800, fontSize: 32, marginBottom: 12 }}>Welcome to Your Landing Page</h2>
        <p style={{ color: palette.text, fontSize: 18, marginBottom: 24 }}>This is a hero section using your palette. Try different modes to see your colors in action!</p>
        <button style={{ background: palette.accent, color: palette.text, border: 'none', borderRadius: 8, padding: '0.8rem 2rem', fontWeight: 700, fontSize: 18, cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>Get Started</button>
      </div>
    );
  }
  if (mode === 'dashboard') {
    return (
      <div style={{
        width: 480,
        borderRadius: 18,
        background: palette.background,
        color: palette.text,
        boxShadow: '0 2px 16px rgba(0,0,0,0.10)',
        padding: '2rem',
        fontFamily: 'inherit',
      }}>
        <div style={{ display: 'flex', gap: 18, marginBottom: 18 }}>
          <div style={{ flex: 1, background: palette.primary, color: palette.text, borderRadius: 10, padding: 18, fontWeight: 700 }}>Stats</div>
          <div style={{ flex: 1, background: palette.secondary, color: palette.text, borderRadius: 10, padding: 18, fontWeight: 700 }}>Users</div>
          <div style={{ flex: 1, background: palette.accent, color: palette.text, borderRadius: 10, padding: 18, fontWeight: 700 }}>Revenue</div>
        </div>
        <div style={{ background: palette.secondary, color: palette.text, borderRadius: 10, padding: 24, fontWeight: 600, marginBottom: 12 }}>Recent Activity</div>
        <div style={{ background: palette.primary, color: palette.text, borderRadius: 10, padding: 24, fontWeight: 600 }}>Quick Actions</div>
      </div>
    );
  }
  if (mode === 'blog') {
    return (
      <div style={{
        width: 420,
        borderRadius: 18,
        background: palette.background,
        color: palette.text,
        boxShadow: '0 2px 16px rgba(0,0,0,0.10)',
        padding: '2rem',
        fontFamily: 'inherit',
      }}>
        <h3 style={{ color: palette.primary, fontWeight: 800, fontSize: 26, marginBottom: 10 }}>Blog Post Title</h3>
        <div style={{ color: palette.secondary, fontWeight: 600, marginBottom: 8 }}>by Author • Today</div>
        <p style={{ color: palette.text, fontSize: 17, marginBottom: 18 }}>This is a sample blog post preview. Your palette colors are used for headings, text, and highlights.</p>
        <a href="#" style={{ color: palette.accent, fontWeight: 700, textDecoration: 'underline' }}>Read More</a>
      </div>
    );
  }
  if (mode === 'ecommerce') {
    return (
      <div style={{
        width: 420,
        borderRadius: 18,
        background: palette.background,
        color: palette.text,
        boxShadow: '0 2px 16px rgba(0,0,0,0.10)',
        padding: '2rem',
        fontFamily: 'inherit',
      }}>
        <div style={{ background: palette.secondary, borderRadius: 12, height: 120, marginBottom: 18 }} />
        <h3 style={{ color: palette.primary, fontWeight: 800, fontSize: 24, marginBottom: 8 }}>Product Name</h3>
        <div style={{ color: palette.text, fontWeight: 600, marginBottom: 8 }}>$49.99</div>
        <button style={{ background: palette.accent, color: palette.text, border: 'none', borderRadius: 8, padding: '0.7rem 1.5rem', fontWeight: 700, fontSize: 17, cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>Add to Cart</button>
      </div>
    );
  }
  // Default: grid
  const gridColors = [
    palette.primary,
    palette.secondary,
    palette.accent,
    palette.background,
    palette.text,
    palette.primary,
    palette.secondary,
    palette.accent,
    palette.background,
    palette.text,
  ];
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gridTemplateRows: 'repeat(3, 80px)',
      gap: 16,
      maxWidth: 600,
      margin: '2rem auto',
      background: 'transparent',
    }}>
      {gridColors.map((color, i) => (
        <div key={i} style={{ background: color, borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
      ))}
    </div>
  );
} 