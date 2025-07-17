import React, { useState } from 'react';
import useStore from '../store';

const googleFonts = [
  'Inter', 'Roboto', 'Montserrat', 'Lato', 'Poppins', 'Open Sans', 'Oswald', 'Raleway', 'Merriweather', 'Playfair Display',
];

const layouts = [
  { key: 'grid', label: 'Grid Layout' },
  { key: 'flex', label: 'Flex Layout' },
  { key: 'left', label: 'Left Aligned' },
  { key: 'center', label: 'Center Aligned' },
  { key: 'right', label: 'Right Aligned' },
];

export default function FontSelectorModal({ open, onClose }) {
  const { font, setFont, layout, setLayout } = useStore();
  const [selectedFont, setSelectedFont] = useState(font || 'Inter');
  const [selectedLayout, setSelectedLayout] = useState(layout || 'grid');

  React.useEffect(() => {
    if (!selectedFont) return;
    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css2?family=${selectedFont.replace(/ /g, '+')}:wght@400;700&display=swap`;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, [selectedFont]);

  if (!open) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999,
      background: 'rgba(24,24,37,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{ background: '#fff', color: '#181825', borderRadius: 16, padding: '2.5rem 2rem', minWidth: 340, boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}>
        <h2 style={{ marginTop: 0, marginBottom: 18 }}>Select Font & Layout</h2>
        <label style={{ fontWeight: 600, marginBottom: 6, display: 'block' }}>Font</label>
        <select
          value={selectedFont}
          onChange={e => setSelectedFont(e.target.value)}
          style={{ width: '100%', padding: 10, fontSize: 18, borderRadius: 8, border: '1px solid #8b5cf6', marginBottom: 18 }}
        >
          {googleFonts.map(font => (
            <option key={font} value={font} style={{ fontFamily: font }}>{font}</option>
          ))}
        </select>
        <div style={{ fontFamily: selectedFont, fontSize: 22, marginBottom: 18, border: '1px solid #eee', borderRadius: 8, padding: 12 }}>
          The quick brown fox jumps over the lazy dog.
        </div>
        <label style={{ fontWeight: 600, marginBottom: 6, display: 'block' }}>Layout Preset</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 18 }}>
          {layouts.map(l => (
            <button
              key={l.key}
              onClick={() => setSelectedLayout(l.key)}
              style={{
                background: selectedLayout === l.key ? '#8b5cf6' : '#eee',
                color: selectedLayout === l.key ? '#fff' : '#181825',
                border: 'none',
                borderRadius: 8,
                padding: '0.5rem 1.2rem',
                fontWeight: 600,
                fontSize: 15,
                cursor: 'pointer',
                outline: selectedLayout === l.key ? '2px solid #6366f1' : 'none',
                transition: 'background 0.15s',
              }}
            >
              {l.label}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ background: '#eee', color: '#181825', border: 'none', borderRadius: 8, padding: '0.5rem 1.2rem', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Cancel</button>
          <button onClick={() => { setFont(selectedFont); setLayout(selectedLayout); onClose(); }} style={{ background: '#8b5cf6', color: '#fff', border: 'none', borderRadius: 8, padding: '0.5rem 1.2rem', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Apply</button>
        </div>
      </div>
    </div>
  );
} 