import React, { useState } from 'react';
import useStore from '../store';

function paletteToCSS(palette) {
  return `:root {\n  --primary: ${palette.primary};\n  --secondary: ${palette.secondary};\n  --accent: ${palette.accent};\n  --background: ${palette.background};\n  --text: ${palette.text};\n}`;
}
function paletteToSCSS(palette) {
  return `$primary: ${palette.primary};\n$secondary: ${palette.secondary};\n$accent: ${palette.accent};\n$background: ${palette.background};\n$text: ${palette.text};`;
}
function paletteToTailwind(palette) {
  return `theme: {\n  extend: {\n    colors: {\n      primary: '${palette.primary}',\n      secondary: '${palette.secondary}',\n      accent: '${palette.accent}',\n      background: '${palette.background}',\n      text: '${palette.text}',\n    }\n  }\n}`;
}
function paletteToJSON(palette) {
  return JSON.stringify(palette, null, 2);
}

const formats = [
  { key: 'css', label: 'CSS Variables', fn: paletteToCSS },
  { key: 'scss', label: 'SCSS Variables', fn: paletteToSCSS },
  { key: 'tailwind', label: 'Tailwind Config', fn: paletteToTailwind },
  { key: 'json', label: 'HEX/JSON', fn: paletteToJSON },
];

function encodePalette(palette) {
  return btoa(encodeURIComponent(JSON.stringify(palette)));
}
function decodePalette(str) {
  try {
    return JSON.parse(decodeURIComponent(atob(str)));
  } catch {
    return null;
  }
}

export default function ExportModal({ open, onClose }) {
  const { palette, setPalette } = useStore();
  const [format, setFormat] = useState('css');
  const [importValue, setImportValue] = useState('');
  const code = formats.find(f => f.key === format).fn(palette);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
  };
  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `palette.${format === 'json' ? 'json' : format}`;
    a.click();
    URL.revokeObjectURL(url);
  };
  const handleShare = () => {
    const url = `${window.location.origin}${window.location.pathname}?palette=${encodePalette(palette)}`;
    navigator.clipboard.writeText(url);
  };
  const handleImport = () => {
    let imported = null;
    if (importValue.startsWith('http')) {
      const match = importValue.match(/[?&]palette=([^&]+)/);
      if (match) imported = decodePalette(match[1]);
    } else {
      try { imported = JSON.parse(importValue); } catch {}
    }
    if (imported && imported.primary && imported.secondary && imported.accent && imported.background && imported.text) {
      setPalette(imported);
      setImportValue('');
      alert('Palette imported!');
    } else {
      alert('Invalid palette data.');
    }
  };

  if (!open) return null;
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999,
      background: 'rgba(24,24,37,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{ background: '#fff', color: '#181825', borderRadius: 16, padding: '2.5rem 2rem', minWidth: 380, boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}>
        <h2 style={{ marginTop: 0, marginBottom: 18 }}>Export Palette</h2>
        <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
          {formats.map(f => (
            <button
              key={f.key}
              onClick={() => setFormat(f.key)}
              style={{
                background: format === f.key ? '#6366f1' : '#eee',
                color: format === f.key ? '#fff' : '#181825',
                border: 'none',
                borderRadius: 8,
                padding: '0.5rem 1.2rem',
                fontWeight: 600,
                fontSize: 15,
                cursor: 'pointer',
                outline: format === f.key ? '2px solid #8b5cf6' : 'none',
                transition: 'background 0.15s',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
        <textarea
          value={code}
          readOnly
          style={{ width: '100%', minHeight: 120, fontFamily: 'monospace', fontSize: 15, borderRadius: 8, border: '1px solid #eee', marginBottom: 18, padding: 10, background: '#f8fafc', color: '#181825' }}
        />
        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginBottom: 18 }}>
          <button onClick={onClose} style={{ background: '#eee', color: '#181825', border: 'none', borderRadius: 8, padding: '0.5rem 1.2rem', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Cancel</button>
          <button onClick={handleCopy} style={{ background: '#6366f1', color: '#fff', border: 'none', borderRadius: 8, padding: '0.5rem 1.2rem', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Copy</button>
          <button onClick={handleDownload} style={{ background: '#8b5cf6', color: '#fff', border: 'none', borderRadius: 8, padding: '0.5rem 1.2rem', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Download</button>
          <button onClick={handleShare} style={{ background: '#10b981', color: '#fff', border: 'none', borderRadius: 8, padding: '0.5rem 1.2rem', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Share</button>
        </div>
        <div style={{ marginTop: 18 }}>
          <h4>Import Palette</h4>
          <textarea
            value={importValue}
            onChange={e => setImportValue(e.target.value)}
            placeholder="Paste palette JSON or share link here"
            style={{ width: '100%', minHeight: 60, fontFamily: 'monospace', fontSize: 15, borderRadius: 8, border: '1px solid #eee', marginBottom: 8, padding: 8, background: '#f8fafc', color: '#181825' }}
          />
          <button onClick={handleImport} style={{ background: '#6366f1', color: '#fff', border: 'none', borderRadius: 8, padding: '0.4rem 1.2rem', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>Import</button>
        </div>
      </div>
    </div>
  );
} 