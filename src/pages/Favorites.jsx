import React from 'react';
import useStore from '../store';

export default function Favorites() {
  const { favorites, setPalette, removeFavorite } = useStore();

  return (
    <div style={{ width: '100%' }}>
      <h2 style={{ fontSize: 32, fontWeight: 900, marginBottom: 36, letterSpacing: 1, color: '#8b5cf6', textAlign: 'center' }}>Favorite Palettes</h2>
      {!favorites.length ? (
        <div style={{ textAlign: 'center', marginTop: '2rem', color: '#888', fontSize: 18 }}>No favorite palettes yet. Save some from the Home page!</div>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 36, justifyContent: 'center', width: '100%' }}>
          {favorites.map((palette, idx) => (
            <div key={idx} style={{
              borderRadius: 18,
              boxShadow: '0 4px 24px rgba(139,92,246,0.10)',
              background: palette.background,
              color: palette.text,
              padding: '2rem 1.5rem',
              minWidth: 260,
              maxWidth: 340,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 16,
              border: '1.5px solid rgba(139,92,246,0.08)',
              fontFamily: 'inherit',
            }}>
              <div style={{ display: 'flex', gap: 10 }}>
                {Object.entries(palette).map(([key, value]) => (
                  <div key={key} title={key} style={{ width: 32, height: 32, borderRadius: 8, background: value, border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, color: '#181825', fontSize: 13 }} />
                ))}
              </div>
              <div style={{ display: 'flex', gap: '0.7rem', marginTop: 10 }}>
                <button onClick={() => setPalette(palette)} style={{ padding: '0.6rem 1.5rem', borderRadius: 8, border: 'none', background: palette.primary, color: palette.text, fontWeight: 700, fontSize: 16, cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.10)', transition: 'background 0.18s, color 0.18s' }}>Apply</button>
                <button onClick={() => removeFavorite(idx)} style={{ padding: '0.6rem 1.5rem', borderRadius: 8, border: 'none', background: palette.accent, color: palette.text, fontWeight: 700, fontSize: 16, cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.10)', transition: 'background 0.18s, color 0.18s' }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 