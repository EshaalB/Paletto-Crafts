import React from 'react';
import useStore from '../store';

function getRandomColor() {
  // Simple random color generator (can be improved later)
  return `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`;
}

export default function PaletteGenerator() {
  const { palette, setPalette, addFavorite } = useStore();

  const handleRandomize = () => {
    setPalette({
      primary: getRandomColor(),
      secondary: getRandomColor(),
      accent: getRandomColor(),
      background: getRandomColor(),
      text: getRandomColor(),
    });
  };

  const handleColorChange = (key, value) => {
    setPalette({ ...palette, [key]: value });
  };

  return (
    <div style={{
      background: palette.background,
      color: palette.text,
      borderRadius: 16,
      padding: '2rem',
      boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
      maxWidth: 500,
      margin: '2rem auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
      alignItems: 'center',
    }}>
      <h2 style={{ margin: 0 }}>Palette Generator</h2>
      <div style={{ display: 'flex', gap: '1rem' }}>
        {Object.entries(palette).map(([key, value]) => (
          <div key={key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <label style={{ fontSize: 12 }}>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
            <input
              type="color"
              value={value}
              onChange={e => handleColorChange(key, e.target.value)}
              style={{ width: 40, height: 40, border: 'none', background: 'none', cursor: 'pointer' }}
            />
            <span style={{ fontSize: 10 }}>{value}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button onClick={handleRandomize} style={{ padding: '0.5rem 1.5rem', borderRadius: 8, border: 'none', background: palette.primary, color: palette.text, fontWeight: 600, cursor: 'pointer' }}>Randomize</button>
        <button onClick={() => addFavorite(palette)} style={{ padding: '0.5rem 1.5rem', borderRadius: 8, border: 'none', background: palette.accent, color: palette.text, fontWeight: 600, cursor: 'pointer' }}>Save to Favorites</button>
      </div>
    </div>
  );
} 