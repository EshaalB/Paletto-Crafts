import React, { useState } from 'react';
import useStore from '../store';
import { FaQuestionCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';

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

function paletteToGradients(palette) {
  return {
    linear: `background: linear-gradient(90deg, ${palette.primary}, ${palette.secondary}, ${palette.accent});`,
    radial: `background: radial-gradient(circle at 60% 40%, ${palette.primary}, ${palette.secondary}, ${palette.accent});`,
    conic: `background: conic-gradient(from 0deg, ${palette.primary}, ${palette.secondary}, ${palette.accent}, ${palette.primary});`,
  };
}

const formats = [
  { key: 'css', label: 'CSS Variables', fn: paletteToCSS },
  { key: 'scss', label: 'SCSS Variables', fn: paletteToSCSS },
  { key: 'tailwind', label: 'Tailwind Config', fn: paletteToTailwind },
  { key: 'json', label: 'HEX/JSON', fn: paletteToJSON },
  { key: 'gradients', label: 'Gradients', fn: paletteToGradients },
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
    if (format === 'gradients') {
      navigator.clipboard.writeText(Object.values(code).join('\n\n'));
    } else {
      navigator.clipboard.writeText(code);
    }
    Swal.fire({
      icon: 'success',
      title: 'Copied!',
      text: 'Palette code copied to clipboard.',
      timer: 1200,
      showConfirmButton: false
    });
  };
  const handleDownload = () => {
    const blob = new Blob([
      format === 'gradients' ? Object.values(code).join('\n\n') : code
    ], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `palette.${format === 'json' ? 'json' : format}`;
    a.click();
    URL.revokeObjectURL(url);
    Swal.fire({
      icon: 'success',
      title: 'Downloaded!',
      text: 'Palette file downloaded.',
      timer: 1200,
      showConfirmButton: false
    });
  };
  const handleShare = () => {
    const url = `${window.location.origin}${window.location.pathname}?palette=${encodePalette(palette)}`;
    navigator.clipboard.writeText(url);
    Swal.fire({
      icon: 'success',
      title: 'Share Link Copied!',
      text: 'Palette share link copied to clipboard.',
      timer: 1200,
      showConfirmButton: false
    });
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
      Swal.fire({
        icon: 'success',
        title: 'Palette Imported!',
        text: 'Palette imported successfully.',
        timer: 1200,
        showConfirmButton: false
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Data',
        text: 'Invalid palette data.',
        timer: 1600,
        showConfirmButton: false
      });
    }
  };
  // --- Advanced Export ---
  const handleFigmaExport = () => {
    const figmaJSON = JSON.stringify({
      name: 'Paletto Palette',
      colors: palette
    }, null, 2);
    navigator.clipboard.writeText(figmaJSON);
    Swal.fire({
      icon: 'success',
      title: 'Figma Exported!',
      text: 'Palette JSON copied for Figma import.',
      timer: 1400,
      showConfirmButton: false
    });
  };
  const handleAdobeXDExport = () => {
    const xdJSON = JSON.stringify({
      palette: palette
    }, null, 2);
    navigator.clipboard.writeText(xdJSON);
    Swal.fire({
      icon: 'success',
      title: 'Adobe XD Exported!',
      text: 'Palette JSON copied for Adobe XD.',
      timer: 1400,
      showConfirmButton: false
    });
  };
  const handleSketchExport = () => {
    const sketchJSON = JSON.stringify({
      palette: palette
    }, null, 2);
    navigator.clipboard.writeText(sketchJSON);
    Swal.fire({
      icon: 'success',
      title: 'Sketch Exported!',
      text: 'Palette JSON copied for Sketch.',
      timer: 1400,
      showConfirmButton: false
    });
  };
  const handleBrandKitExport = () => {
    const brandKit = `Brand Kit\n==========\n\nPalette:\n${paletteToJSON(palette)}\n\nTypography Suggestion: Inter, 700/400\nLogo: [Insert your logo here]\nUI Preview: [Use these colors in your UI!]`;
    const blob = new Blob([brandKit], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'brand-kit.txt';
    a.click();
    URL.revokeObjectURL(url);
    Swal.fire({
      icon: 'success',
      title: 'Brand Kit Downloaded!',
      text: 'Simple brand kit file downloaded.',
      timer: 1400,
      showConfirmButton: false
    });
  };

  if (!open) return null;
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999,
      background: 'rgba(24,24,37,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{ background: '#fff', color: '#181825', borderRadius: 16, padding: '2.5rem 2rem', minWidth: 380, boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}>
        <h2 style={{ marginTop: 0, marginBottom: 18, display: 'flex', alignItems: 'center', gap: 8 }}>
          Export Palette
          <FaQuestionCircle title="Export your palette as CSS, SCSS, Tailwind, JSON, or gradients. Gradients use your primary, secondary, and accent colors." />
        </h2>
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
                display: 'flex', alignItems: 'center', gap: 6
              }}
              title={f.key === 'gradients' ? 'Export CSS gradients using your palette colors.' : undefined}
            >
              {f.label}
              {f.key === 'gradients' && <FaQuestionCircle title="Export three types of gradients: linear, radial, and conic." />}
            </button>
          ))}
        </div>
        {format === 'gradients' ? (
          <div style={{ marginBottom: 18 }}>
            <div style={{ marginBottom: 10, color: '#6366f1', fontWeight: 700, fontSize: 16, display: 'flex', alignItems: 'center', gap: 6 }}>
              Gradients
              <FaQuestionCircle title="Copy or download CSS for linear, radial, and conic gradients using your palette." />
            </div>
            <div style={{ marginBottom: 10 }}>
              <strong>Linear:</strong>
              <textarea
                value={code.linear}
                readOnly
                style={{ width: '100%', minHeight: 38, fontFamily: 'monospace', fontSize: 15, borderRadius: 8, border: '1px solid #eee', marginBottom: 8, padding: 8, background: '#f8fafc', color: '#181825' }}
                title="Linear gradient CSS using your palette colors."
              />
            </div>
            <div style={{ marginBottom: 10 }}>
              <strong>Radial:</strong>
              <textarea
                value={code.radial}
                readOnly
                style={{ width: '100%', minHeight: 38, fontFamily: 'monospace', fontSize: 15, borderRadius: 8, border: '1px solid #eee', marginBottom: 8, padding: 8, background: '#f8fafc', color: '#181825' }}
                title="Radial gradient CSS using your palette colors."
              />
            </div>
            <div style={{ marginBottom: 10 }}>
              <strong>Conic:</strong>
              <textarea
                value={code.conic}
                readOnly
                style={{ width: '100%', minHeight: 38, fontFamily: 'monospace', fontSize: 15, borderRadius: 8, border: '1px solid #eee', marginBottom: 8, padding: 8, background: '#f8fafc', color: '#181825' }}
                title="Conic gradient CSS using your palette colors."
              />
            </div>
          </div>
        ) : (
          <textarea
            value={code}
            readOnly
            style={{ width: '100%', minHeight: 120, fontFamily: 'monospace', fontSize: 15, borderRadius: 8, border: '1px solid #eee', marginBottom: 18, padding: 10, background: '#f8fafc', color: '#181825' }}
          />
        )}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginBottom: 18 }}>
          <button onClick={onClose} style={{ background: '#eee', color: '#181825', border: 'none', borderRadius: 8, padding: '0.5rem 1.2rem', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Cancel</button>
          <button onClick={handleCopy} style={{ background: '#6366f1', color: '#fff', border: 'none', borderRadius: 8, padding: '0.5rem 1.2rem', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Copy</button>
          <button onClick={handleDownload} style={{ background: '#8b5cf6', color: '#fff', border: 'none', borderRadius: 8, padding: '0.5rem 1.2rem', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Download</button>
          <button onClick={handleShare} style={{ background: '#10b981', color: '#fff', border: 'none', borderRadius: 8, padding: '0.5rem 1.2rem', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Share</button>
        </div>
        {/* Advanced Export Buttons */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 18, flexWrap: 'wrap' }}>
          <button onClick={handleFigmaExport} style={{ background: '#0acf83', color: '#fff', border: 'none', borderRadius: 8, padding: '0.4rem 1.2rem', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>Export to Figma</button>
          <button onClick={handleAdobeXDExport} style={{ background: '#ff61f6', color: '#fff', border: 'none', borderRadius: 8, padding: '0.4rem 1.2rem', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>Export to Adobe XD</button>
          <button onClick={handleSketchExport} style={{ background: '#f7b500', color: '#fff', border: 'none', borderRadius: 8, padding: '0.4rem 1.2rem', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>Export to Sketch</button>
          <button onClick={handleBrandKitExport} style={{ background: '#6366f1', color: '#fff', border: 'none', borderRadius: 8, padding: '0.4rem 1.2rem', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>Brand Kit Export</button>
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