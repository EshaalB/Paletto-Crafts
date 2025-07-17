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
    <div style={{ maxWidth: 1100, margin: '2rem auto', padding: '2rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 32 }}>Famous Website Color Templates</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'center', width: '100%' }}>
        {templates.map(t => (
          <div key={t.name} style={{ background: t.palette.background, color: t.palette.text, borderRadius: 18, boxShadow: '0 4px 24px rgba(0,0,0,0.10)', padding: '2rem 1.5rem', minWidth: 260, maxWidth: 320, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
            <div style={{ fontWeight: 800, fontSize: 22, marginBottom: 8 }}>{t.name}</div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              {Object.entries(t.palette).map(([key, value]) => (
                <div
                  key={key}
                  title={key + ': ' + value}
                  onClick={() => handleCopy(value, key)}
                  style={{ width: 32, height: 32, borderRadius: 8, background: value, border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, color: '#181825', fontSize: 13, cursor: 'pointer', position: 'relative' }}
                >
                  {key.charAt(0).toUpperCase()}
                  {copied === key + value && (
                    <span style={{ position: 'absolute', top: -28, left: '50%', transform: 'translateX(-50%)', background: '#232336', color: '#fff', borderRadius: 6, padding: '2px 10px', fontSize: 13, fontWeight: 700, boxShadow: '0 2px 8px rgba(0,0,0,0.10)', zIndex: 10 }}>Copied!</span>
                  )}
                </div>
              ))}
            </div>
            <button onClick={() => setPalette(t.palette)} style={{ background: t.palette.primary, color: t.palette.text, border: 'none', borderRadius: 8, padding: '0.7rem 1.5rem', fontWeight: 700, fontSize: 16, cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.10)' }}>Apply</button>
          </div>
        ))}
      </div>
    </div>
  );
} 