import React, { useRef, useState } from 'react';
import useStore from '../store';

function getAverageColors(image, count = 5) {
  // Simple average color extraction using canvas (not as accurate as color-thief, but no dependency)
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0, image.width, image.height);
  const data = ctx.getImageData(0, 0, image.width, image.height).data;
  const step = Math.floor((data.length / 4) / count);
  const colors = [];
  for (let i = 0; i < count; i++) {
    let r = 0, g = 0, b = 0, n = 0;
    for (let j = i * step * 4; j < (i + 1) * step * 4 && j < data.length; j += 4) {
      r += data[j];
      g += data[j + 1];
      b += data[j + 2];
      n++;
    }
    if (n > 0) {
      colors.push(`#${((1 << 24) + (Math.round(r / n) << 16) + (Math.round(g / n) << 8) + Math.round(b / n)).toString(16).slice(1)}`);
    }
  }
  return colors;
}

export default function ImageUploadModal({ open, onClose }) {
  const { setPalette } = useStore();
  const [preview, setPreview] = useState(null);
  const [palette, setPaletteState] = useState(null);
  const fileInput = useRef();

  const handleFile = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const img = new window.Image();
      img.onload = () => {
        setPreview(ev.target.result);
        const colors = getAverageColors(img, 5);
        setPaletteState(colors);
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleApply = () => {
    if (!palette) return;
    setPalette({
      primary: palette[0] || '#8b5cf6',
      secondary: palette[1] || '#6366f1',
      accent: palette[2] || '#3b82f6',
      background: palette[3] || '#181825',
      text: palette[4] || '#fff',
    });
    onClose();
  };

  if (!open) return null;
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999,
      background: 'rgba(24,24,37,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{ background: '#fff', color: '#181825', borderRadius: 16, padding: '2.5rem 2rem', minWidth: 340, boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}>
        <h2 style={{ marginTop: 0, marginBottom: 18 }}>Extract Palette from Image</h2>
        <input type="file" accept="image/*" ref={fileInput} onChange={handleFile} style={{ marginBottom: 18 }} />
        {preview && (
          <div style={{ marginBottom: 18 }}>
            <img src={preview} alt="Preview" style={{ maxWidth: 180, maxHeight: 120, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.10)' }} />
          </div>
        )}
        {palette && (
          <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
            {palette.map((color, i) => (
              <div key={i} style={{ width: 36, height: 36, borderRadius: 8, background: color, border: '2px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, color: '#181825', fontSize: 13 }}>{color}</div>
            ))}
          </div>
        )}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ background: '#eee', color: '#181825', border: 'none', borderRadius: 8, padding: '0.5rem 1.2rem', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Cancel</button>
          <button onClick={handleApply} disabled={!palette} style={{ background: '#10b981', color: '#fff', border: 'none', borderRadius: 8, padding: '0.5rem 1.2rem', fontWeight: 600, fontSize: 16, cursor: palette ? 'pointer' : 'not-allowed', opacity: palette ? 1 : 0.6 }}>Apply Palette</button>
        </div>
      </div>
    </div>
  );
} 