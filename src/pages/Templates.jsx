import React, { useState } from 'react';
import useStore from '../store';

const templates = [
  { name: 'YouTube', palette: { primary: '#FF0000', secondary: '#282828', accent: '#FFFFFF', background: '#181818', text: '#FFFFFF' } },
  { name: 'Instagram', palette: { primary: '#E1306C', secondary: '#405DE6', accent: '#FCAF45', background: '#FFF', text: '#262626' } },
  { name: 'Spotify', palette: { primary: '#1DB954', secondary: '#191414', accent: '#FFFFFF', background: '#191414', text: '#FFFFFF' } },
  { name: 'Snapchat', palette: { primary: '#FFFC00', secondary: '#000000', accent: '#FFFFFF', background: '#FFFFFF', text: '#000000' } },
  { name: 'Duolingo', palette: { primary: '#58CC02', secondary: '#1CB0F6', accent: '#FFD600', background: '#FFFFFF', text: '#222' } },
  { name: 'Pinterest', palette: { primary: '#E60023', secondary: '#FFFFFF', accent: '#000000', background: '#FFF', text: '#111' } },
];

export default function Templates() {
  const setPalette = useStore(state => state.setPalette);
  const [copied, setCopied] = useState(null);

  const handleCopy = (hex, key) => {
    navigator.clipboard.writeText(hex);
    setCopied(key + hex);
    setTimeout(() => setCopied(null), 1200);
  };

  return (
    <div style={{ width: '100%' }}>
      <h2 style={{ fontSize: 34, fontWeight: 900, marginBottom: 36, letterSpacing: 1, color: '#8b5cf6', textAlign: 'center' }}>Famous Website Color Templates</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 36, justifyContent: 'center', width: '100%' }}>
        {templates.map(t => (
          <div key={t.name} style={{
            background: t.palette.background,
            color: t.palette.text,
            borderRadius: 20,
            boxShadow: '0 6px 24px rgba(0,0,0,0.10)',
            minWidth: 260,
            maxWidth: 340,
            flex: 1,
            margin: '1.2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 18,
            padding: '2.2rem 1.7rem',
            border: '1.5px solid rgba(139,92,246,0.08)',
            transition: 'box-shadow 0.18s, transform 0.18s',
            fontFamily: 'inherit',
          }}>
            <div style={{ fontWeight: 800, fontSize: 22, marginBottom: 8, letterSpacing: 0.5 }}>{t.name}</div>
            <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
              {Object.entries(t.palette).map(([key, value]) => (
                <div
                  key={key}
                  title={key + ': ' + value}
                  onClick={() => handleCopy(value, key)}
                  tabIndex={0}
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 9,
                    background: value,
                    border: '2px solid #fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    color: '#181825',
                    fontSize: 14,
                    cursor: 'pointer',
                    position: 'relative',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                    outline: 'none',
                    transition: 'box-shadow 0.18s, transform 0.18s',
                  }}
                  onFocus={e => e.target.style.boxShadow = '0 0 0 2px #8b5cf6'}
                  onBlur={e => e.target.style.boxShadow = '0 1px 4px rgba(0,0,0,0.08)'}
                  onMouseOver={e => e.target.style.transform = 'scale(1.08)'}
                  onMouseOut={e => e.target.style.transform = 'scale(1)'}
                >
                  {key.charAt(0).toUpperCase()}
                  {copied === key + value && (
                    <span style={{ position: 'absolute', top: -28, left: '50%', transform: 'translateX(-50%)', background: '#232336', color: '#fff', borderRadius: 6, padding: '2px 10px', fontSize: 13, fontWeight: 700, boxShadow: '0 2px 8px rgba(0,0,0,0.10)', zIndex: 10 }}>Copied!</span>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={() => setPalette(t.palette)}
              style={{
                background: t.palette.primary,
                color: t.palette.text,
                border: 'none',
                borderRadius: 9,
                padding: '0.8rem 1.7rem',
                fontWeight: 700,
                fontSize: 16,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                marginTop: 8,
                outline: 'none',
                transition: 'background 0.18s, color 0.18s, box-shadow 0.18s',
              }}
              onFocus={e => e.target.style.boxShadow = '0 0 0 2px #8b5cf6'}
              onBlur={e => e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.10)'}
              onMouseOver={e => e.target.style.transform = 'scale(1.04)'}
              onMouseOut={e => e.target.style.transform = 'scale(1)'}
            >
              Apply
            </button>
          </div>
        ))}
      </div>
      <style>{`
        @media (max-width: 900px) {
          h2 { font-size: 1.5rem !important; }
          div[style*='maxWidth: 1200px'] { padding: 1.2rem 0.5rem !important; }
        }
        @media (max-width: 600px) {
          h2 { font-size: 1.1rem !important; }
          div[style*='maxWidth: 1200px'] { padding: 0.7rem 0.2rem !important; }
        }
      `}</style>
    </div>
  );
} 