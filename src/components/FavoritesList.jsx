import React from 'react';
import useStore from '../store';

export default function FavoritesList() {
  const { favorites, setPalette, removeFavorite } = useStore();

  if (!favorites.length) {
    return <div style={{ textAlign: 'center', marginTop: '2rem' }}>No favorite palettes yet. Save some from the Home page!</div>;
  }

  return (
    <div style={{ maxWidth: 900, margin: '2rem auto', display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
      {favorites.map((palette, idx) => (
        <div key={idx} style={{
          borderRadius: 12,
          boxShadow: '0 2px 12px rgba(0,0,0,0.10)',
          background: palette.background,
          color: palette.text,
          padding: '1.5rem',
          minWidth: 220,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
        }}>
          <div style={{ display: 'flex', gap: 8 }}>
            {Object.entries(palette).map(([key, value]) => (
              <div key={key} title={key} style={{ width: 28, height: 28, borderRadius: 6, background: value, border: '2px solid #fff' }} />
            ))}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: 8 }}>
            <button onClick={() => setPalette(palette)} style={{ padding: '0.4rem 1.2rem', borderRadius: 6, border: 'none', background: palette.primary, color: palette.text, fontWeight: 600, cursor: 'pointer' }}>Apply</button>
            <button onClick={() => removeFavorite(idx)} style={{ padding: '0.4rem 1.2rem', borderRadius: 6, border: 'none', background: palette.accent, color: palette.text, fontWeight: 600, cursor: 'pointer' }}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
} 