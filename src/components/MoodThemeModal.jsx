import React from 'react';
import useStore from '../store';

const moodPalettes = {
  Portfolio: {
    primary: '#8b5cf6', secondary: '#6366f1', accent: '#3b82f6', background: '#181825', text: '#fff',
  },
  Blog: {
    primary: '#f59e42', secondary: '#f7c873', accent: '#f97316', background: '#fff7ed', text: '#181825',
  },
  ECommerce: {
    primary: '#10b981', secondary: '#fbbf24', accent: '#3b82f6', background: '#f0fdf4', text: '#181825',
  },
  Playful: {
    primary: '#f472b6', secondary: '#facc15', accent: '#38bdf8', background: '#fdf2f8', text: '#181825',
  },
  Elegant: {
    primary: '#312e81', secondary: '#a5b4fc', accent: '#fbbf24', background: '#f1f5f9', text: '#181825',
  },
  Dark: {
    primary: '#181825', secondary: '#232336', accent: '#8b5cf6', background: '#0f0f14', text: '#fff',
  },
};

export default function MoodThemeModal({ open, onClose }) {
  const { setPalette } = useStore();
  if (!open) return null;
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999,
      background: 'rgba(24,24,37,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{ background: '#fff', color: '#181825', borderRadius: 16, padding: '2.5rem 2rem', minWidth: 340, boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}>
        <h2 style={{ marginTop: 0, marginBottom: 18 }}>Choose a Mood or Theme</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 18 }}>
          {Object.entries(moodPalettes).map(([mood, palette]) => (
            <button
              key={mood}
              onClick={() => { setPalette(palette); onClose(); }}
              style={{
                background: palette.primary,
                color: palette.text,
                border: 'none',
                borderRadius: 10,
                padding: '1.2rem 1.5rem',
                fontWeight: 700,
                fontSize: 17,
                cursor: 'pointer',
                minWidth: 120,
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                transition: 'background 0.15s',
              }}
            >
              <span>{mood}</span>
              <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
                {['primary', 'secondary', 'accent'].map(key => (
                  <span key={key} style={{ width: 18, height: 18, borderRadius: 4, background: palette[key], display: 'inline-block', border: '1px solid #fff' }} />
                ))}
              </div>
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ background: '#eee', color: '#181825', border: 'none', borderRadius: 8, padding: '0.5rem 1.2rem', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Cancel</button>
        </div>
      </div>
    </div>
  );
} 