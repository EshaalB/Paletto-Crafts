import React, { useState } from 'react';
import { FaMoon, FaSun, FaRandom, FaDownload, FaCopy, FaFont, FaPalette, FaImage, FaUndo, FaRedo, FaLock, FaLockOpen, FaEye } from 'react-icons/fa';
import useStore from '../store';
import FontSelectorModal from './FontSelectorModal';
import MoodThemeModal from './MoodThemeModal';
import ImageUploadModal from './ImageUploadModal';
import ExportModal from './ExportModal';
import PaletteAnalyzerModal from './PaletteAnalyzerModal';

function getContrast(hex1, hex2) {
  function luminance(hex) {
    let c = hex.substring(1);
    if (c.length === 3) c = c.split('').map(x => x + x).join('');
    const rgb = [0, 1, 2].map(i => parseInt(c.substr(i * 2, 2), 16) / 255);
    const a = rgb.map(v => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
  }
  const l1 = luminance(hex1);
  const l2 = luminance(hex2);
  return ((Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05));
}

function randomHSL() {
  return [Math.floor(Math.random() * 360), 60 + Math.random() * 30, 40 + Math.random() * 20];
}
function hslToHex(h, s, l) {
  s /= 100; l /= 100;
  let c = (1 - Math.abs(2 * l - 1)) * s;
  let x = c * (1 - Math.abs((h / 60) % 2 - 1));
  let m = l - c / 2;
  let [r, g, b] = [0, 0, 0];
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

export default function PaletteToolbar() {
  const palette = useStore(state => state.palette);
  const darkMode = useStore(state => state.darkMode);
  const setDarkMode = useStore(state => state.setDarkMode);
  const setPalette = useStore(state => state.setPalette);
  const undoPalette = useStore(state => state.undoPalette);
  const redoPalette = useStore(state => state.redoPalette);
  const history = useStore(state => state.history);
  const future = useStore(state => state.future);
  const gradients = useStore(state => state.gradients);
  const setGradients = useStore(state => state.setGradients);
  const locks = useStore(state => state.locks);
  const setLock = useStore(state => state.setLock);
  const colorNames = useStore(state => state.colorNames);
  const setColorName = useStore(state => state.setColorName);
  const colorBlindness = useStore(state => state.colorBlindness);
  const setColorBlindness = useStore(state => state.setColorBlindness);
  const [fontModalOpen, setFontModalOpen] = useState(false);
  const [editingColor, setEditingColor] = useState(null);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [analyzerOpen, setAnalyzerOpen] = useState(false);
  const [harmonyType, setHarmonyType] = useState('triadic');

  function generateAccessiblePalette() {
    for (let attempt = 0; attempt < 20; attempt++) {
      let primary, secondary, accent;
      const [h, s, l] = randomHSL();
      if (harmonyType === 'triadic') {
        primary = hslToHex(h, s, l);
        secondary = hslToHex((h + 120) % 360, s, l);
        accent = hslToHex((h + 240) % 360, s, l);
      } else if (harmonyType === 'complementary') {
        primary = hslToHex(h, s, l);
        secondary = hslToHex((h + 180) % 360, s, l);
        accent = hslToHex((h + 90) % 360, s, l);
      } else if (harmonyType === 'analogous') {
        primary = hslToHex(h, s, l);
        secondary = hslToHex((h + 30) % 360, s, l);
        accent = hslToHex((h + 330) % 360, s, l);
      } else if (harmonyType === 'tetradic') {
        primary = hslToHex(h, s, l);
        secondary = hslToHex((h + 90) % 360, s, l);
        accent = hslToHex((h + 180) % 360, s, l);
      } else if (harmonyType === 'monochromatic') {
        primary = hslToHex(h, s, l);
        secondary = hslToHex(h, s * 0.8, l * 1.1);
        accent = hslToHex(h, s * 0.6, l * 0.9);
      } else {
        primary = hslToHex(h, s, l);
        secondary = hslToHex((h + 120) % 360, s, l);
        accent = hslToHex((h + 240) % 360, s, l);
      }
      // Pick background and text for max contrast based on darkMode
      let background, text;
      if (darkMode) {
        background = '#181825';
        text = '#fff';
      } else {
        background = '#fff';
        text = '#181825';
      }
      const palette = { primary, secondary, accent, background, text };
      // Check all key pairs
      const pairs = [
        ['background', 'text'],
        ['primary', 'text'],
        ['secondary', 'text'],
        ['accent', 'text'],
        ['primary', 'background'],
        ['secondary', 'background'],
        ['accent', 'background'],
      ];
      const allPass = pairs.every(([a, b]) => getContrast(palette[a], palette[b]) >= 4.5);
      if (allPass) return palette;
    }
    // Fallback: just random
    return {
      primary: hslToHex(...randomHSL()),
      secondary: hslToHex(...randomHSL()),
      accent: hslToHex(...randomHSL()),
      background: darkMode ? '#181825' : '#fff',
      text: darkMode ? '#fff' : '#181825',
    };
  }

  const handleRandomize = () => {
    setPalette(generateAccessiblePalette());
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(palette, null, 2));
  };
  const handleColorChange = (key, value) => {
    setPalette({ ...palette, [key]: value });
  };

  const swatchOrder = [
    { key: 'text', label: colorNames.text || 'Text', color: palette.text },
    { key: 'background', label: colorNames.background || 'Background', color: palette.background },
    { key: 'primary', label: colorNames.primary || 'Primary', color: palette.primary },
    { key: 'secondary', label: colorNames.secondary || 'Secondary', color: palette.secondary },
    { key: 'accent', label: colorNames.accent || 'Accent', color: palette.accent },
  ];

  return (
    <>
      <div style={{
        position: 'fixed',
        left: 0,
        right: 0,
        top: 0,
        zIndex: 300,
        background: '#232336',
        color: '#fff',
        borderBottom: '1px solid #181825',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.5rem',
        padding: '0.7rem 2rem',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        height: 80,
      }}>
        {/* Palette Swatches */}
        {swatchOrder.map(({ key, label, color }, i) => (
          <div key={key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 8px', position: 'relative', minWidth: 60 }}>
            <button
              onClick={() => setEditingColor(key)}
              aria-label={`Edit ${label} color`}
              tabIndex={0}
              style={{
                width: 48, height: 36, borderRadius: 8, background: color, border: '2px solid #222', marginBottom: 4,
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: key === 'background' ? '#fff' : '#222', fontWeight: 600,
                fontSize: 14, cursor: 'pointer', outline: editingColor === key ? '2px solid #8b5cf6' : 'none',
                transition: 'outline 0.15s',
                position: 'relative',
              }}
              title={`Edit ${label} color`}
              onFocus={e => e.target.style.boxShadow = '0 0 0 2px #8b5cf6'}
              onBlur={e => e.target.style.boxShadow = 'none'}
            >
              {label}
              <span style={{ position: 'absolute', right: 4, top: 4, fontSize: 16, color: locks[i] ? '#8b5cf6' : '#bbb', cursor: 'pointer' }}
                title={locks[i] ? 'Unlock color' : 'Lock color'}
                onClick={e => { e.stopPropagation(); setLock(i, !locks[i]); }}
                tabIndex={0}
                aria-label={locks[i] ? `Unlock ${label}` : `Lock ${label}`}
              >
                {locks[i] ? <FaLock /> : <FaLockOpen />}
              </span>
            </button>
            {/* Editable color name */}
            <input
              type="text"
              value={colorNames[key] || label}
              onChange={e => setColorName(key, e.target.value)}
              style={{
                width: 54,
                textAlign: 'center',
                fontSize: 13,
                border: 'none',
                borderRadius: 4,
                background: 'rgba(255,255,255,0.08)',
                color: '#c4b5fd',
                marginBottom: 2,
                outline: 'none',
                fontWeight: 500,
                padding: '2px 0',
              }}
              aria-label={`Edit name for ${label}`}
              tabIndex={0}
              maxLength={16}
            />
            {editingColor === key && (
              <div style={{ position: 'absolute', top: 44, left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
                <input
                  type="color"
                  value={color}
                  onChange={e => handleColorChange(key, e.target.value)}
                  aria-label={`Edit ${label} color`}
                  tabIndex={0}
                  style={{ width: 40, height: 40, border: 'none', background: 'none', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.18)' }}
                  autoFocus
                  onFocus={e => e.target.style.boxShadow = '0 0 0 2px #8b5cf6'}
                  onBlur={e => e.target.style.boxShadow = 'none'}
                />
              </div>
            )}
          </div>
        ))}
        {/* Key Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginLeft: 32 }}>
          {/* Gradients Toggle */}
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600, fontSize: 15, marginRight: 12 }}>
            <input type="checkbox" checked={gradients} onChange={e => setGradients(e.target.checked)} aria-label="Toggle gradients" tabIndex={0} /> Use Gradients
          </label>
          {/* Undo/Redo */}
          <button
            onClick={undoPalette}
            disabled={history.length === 0}
            aria-label="Undo"
            tabIndex={0}
            style={{ background: 'none', border: 'none', cursor: history.length === 0 ? 'not-allowed' : 'pointer', fontSize: 22, color: history.length === 0 ? '#888' : '#8b5cf6', padding: 8, borderRadius: 6, transition: 'background 0.15s', outline: 'none' }}
            title="Undo"
            onFocus={e => e.target.style.boxShadow = '0 0 0 2px #8b5cf6'}
            onBlur={e => e.target.style.boxShadow = 'none'}
          >
            <FaUndo />
          </button>
          <button
            onClick={redoPalette}
            disabled={future.length === 0}
            aria-label="Redo"
            tabIndex={0}
            style={{ background: 'none', border: 'none', cursor: future.length === 0 ? 'not-allowed' : 'pointer', fontSize: 22, color: future.length === 0 ? '#888' : '#8b5cf6', padding: 8, borderRadius: 6, transition: 'background 0.15s', outline: 'none' }}
            title="Redo"
            onFocus={e => e.target.style.boxShadow = '0 0 0 2px #8b5cf6'}
            onBlur={e => e.target.style.boxShadow = 'none'}
          >
            <FaRedo />
          </button>
          {/* Randomize */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <button
              onClick={handleRandomize}
              aria-label="Randomize palette"
              tabIndex={0}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 22, color: '#8b5cf6', padding: 8, borderRadius: 6, transition: 'background 0.15s', outline: 'none' }}
              title="Randomize Palette"
              onFocus={e => e.target.style.boxShadow = '0 0 0 2px #8b5cf6'}
              onBlur={e => e.target.style.boxShadow = 'none'}
            >
              <FaRandom />
            </button>
            <select
              value={harmonyType}
              onChange={e => setHarmonyType(e.target.value)}
              style={{ background: '#232336', color: '#c4b5fd', border: '1px solid #8b5cf6', borderRadius: 6, fontSize: 15, padding: '4px 10px', fontWeight: 600, outline: 'none' }}
              aria-label="Color harmony type"
              tabIndex={0}
            >
              <option value="triadic">Triadic</option>
              <option value="complementary">Complementary</option>
              <option value="analogous">Analogous</option>
              <option value="tetradic">Tetradic</option>
              <option value="monochromatic">Monochromatic</option>
            </select>
          </div>
          {/* Copy */}
          <button
            onClick={handleCopy}
            aria-label="Copy palette as JSON"
            tabIndex={0}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 22, color: '#8b5cf6', padding: 8, borderRadius: 6, transition: 'background 0.15s', outline: 'none' }}
            title="Copy Palette"
            onFocus={e => e.target.style.boxShadow = '0 0 0 2px #8b5cf6'}
            onBlur={e => e.target.style.boxShadow = 'none'}
          >
            <FaCopy />
          </button>
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle dark mode"
            tabIndex={0}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 22, color: '#fff', padding: 8, borderRadius: 6, transition: 'background 0.15s', outline: 'none' }}
            title="Toggle Dark Mode"
            onFocus={e => e.target.style.boxShadow = '0 0 0 2px #fff'}
            onBlur={e => e.target.style.boxShadow = 'none'}
          >
            {darkMode ? <FaMoon /> : <FaSun />}
          </button>
          {/* More Dropdown */}
          <div style={{ position: 'relative', marginLeft: 10 }}>
            <button
              onClick={() => setMoreOpen(v => !v)}
              aria-label="Show more options"
              tabIndex={0}
              style={{ background: '#8b5cf6', color: '#fff', border: 'none', borderRadius: 8, padding: '0.5rem 1.2rem', fontWeight: 600, fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, outline: 'none' }}
              title="More Options"
            >
              More ▾
            </button>
            {moreOpen && (
              <div style={{
                position: 'absolute', top: '110%', right: 0, background: '#232336', color: '#fff', borderRadius: 10, boxShadow: '0 4px 24px rgba(0,0,0,0.18)', minWidth: 220, padding: '1rem 0', zIndex: 1000, display: 'flex', flexDirection: 'column', gap: 0
              }}>
                <button onClick={() => setImageModalOpen(true)} style={{ background: 'none', border: 'none', color: '#fff', fontWeight: 600, fontSize: 16, padding: '0.7rem 1.5rem', textAlign: 'left', cursor: 'pointer', width: '100%' }}>Extract from Image</button>
                <button onClick={() => setAnalyzerOpen(true)} style={{ background: 'none', border: 'none', color: '#fff', fontWeight: 600, fontSize: 16, padding: '0.7rem 1.5rem', textAlign: 'left', cursor: 'pointer', width: '100%' }}>Palette Analyzer</button>
                <button onClick={() => setExportModalOpen(true)} style={{ background: 'none', border: 'none', color: '#fff', fontWeight: 600, fontSize: 16, padding: '0.7rem 1.5rem', textAlign: 'left', cursor: 'pointer', width: '100%' }}>Export Palette</button>
                <button onClick={() => setFontModalOpen(true)} style={{ background: 'none', border: 'none', color: '#fff', fontWeight: 600, fontSize: 16, padding: '0.7rem 1.5rem', textAlign: 'left', cursor: 'pointer', width: '100%' }}>Font & Layout</button>
                <div style={{ padding: '0.7rem 1.5rem', color: '#c4b5fd', fontWeight: 600, fontSize: 15 }}>Color Blindness</div>
                <div style={{ padding: '0 1.5rem 1rem 1.5rem' }}>
                  <select
                    value={colorBlindness || ''}
                    onChange={e => setColorBlindness(e.target.value || null)}
                    style={{
                      background: '#232336',
                      color: '#c4b5fd',
                      border: '1px solid #8b5cf6',
                      borderRadius: 6,
                      fontSize: 15,
                      padding: '4px 10px',
                      fontWeight: 600,
                      outline: 'none',
                      minWidth: 120,
                      width: '100%'
                    }}
                    aria-label="Color blindness simulation mode"
                    tabIndex={0}
                  >
                    <option value="">Normal Vision</option>
                    <option value="protanopia">Protanopia</option>
                    <option value="deuteranopia">Deuteranopia</option>
                    <option value="tritanopia">Tritanopia</option>
                    <option value="achromatopsia">Achromatopsia</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <FontSelectorModal open={fontModalOpen} onClose={() => setFontModalOpen(false)} />
      <ImageUploadModal open={imageModalOpen} onClose={() => setImageModalOpen(false)} />
      <ExportModal open={exportModalOpen} onClose={() => setExportModalOpen(false)} />
      <PaletteAnalyzerModal open={analyzerOpen} onClose={() => setAnalyzerOpen(false)} />
      {/* Focus style for all buttons */}
      <style>{`
        button:focus, input[type='checkbox']:focus {
          outline: none !important;
          box-shadow: 0 0 0 2px #8b5cf6 !important;
        }
      `}</style>
    </>
  );
} 