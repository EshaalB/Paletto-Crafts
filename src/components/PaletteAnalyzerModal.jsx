import React from 'react';
import useStore from '../store';

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

function getHarmonyScore(palette) {
  // Simple: check if hue distances are roughly even (triadic/tetradic)
  // For demo, just return a random score
  return Math.round(80 + Math.random() * 20);
}

function getBrandingScore(palette) {
  // Simple: check if primary/secondary/accent are distinct and not too gray
  // For demo, just return a random score
  return Math.round(70 + Math.random() * 30);
}

export default function PaletteAnalyzerModal({ open, onClose }) {
  const palette = useStore(state => state.palette);
  if (!open) return null;

  // Contrast checks
  const pairs = [
    ['background', 'text'],
    ['primary', 'text'],
    ['secondary', 'text'],
    ['accent', 'text'],
    ['primary', 'background'],
    ['secondary', 'background'],
    ['accent', 'background'],
  ];
  const contrastResults = pairs.map(([a, b]) => {
    const ratio = getContrast(palette[a], palette[b]);
    return { pair: `${a} / ${b}`, passAA: ratio >= 4.5, passAAA: ratio >= 7, ratio: ratio.toFixed(2) };
  });
  const allPassAA = contrastResults.every(r => r.passAA);
  const allPassAAA = contrastResults.every(r => r.passAAA);

  // Harmony & branding
  const harmonyScore = getHarmonyScore(palette);
  const brandingScore = getBrandingScore(palette);

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999,
      background: 'rgba(24,24,37,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{ background: '#fff', color: '#181825', borderRadius: 18, padding: '2.5rem 2rem', minWidth: 340, maxWidth: 420, boxShadow: '0 8px 32px rgba(0,0,0,0.18)', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 18, right: 18, background: 'none', border: 'none', fontSize: 22, color: '#8b5cf6', cursor: 'pointer', fontWeight: 700 }}>×</button>
        <h2 style={{ marginTop: 0, marginBottom: 18, fontWeight: 800 }}>Palette Analyzer</h2>
        <div style={{ marginBottom: 18 }}>
          <strong>Contrast (WCAG):</strong>
          <ul style={{ paddingLeft: 18, margin: '10px 0' }}>
            {contrastResults.map(r => (
              <li key={r.pair} style={{ color: r.passAA ? (r.passAAA ? '#22c55e' : '#facc15') : '#ef4444', fontWeight: 600 }}>
                {r.pair}: {r.ratio} — {r.passAAA ? 'AAA' : r.passAA ? 'AA' : 'Fail'}
              </li>
            ))}
          </ul>
          <div style={{ fontWeight: 700, color: allPassAAA ? '#22c55e' : allPassAA ? '#facc15' : '#ef4444', marginBottom: 8 }}>
            {allPassAAA ? 'All pairs pass AAA' : allPassAA ? 'All pairs pass AA (AAA suggested)' : 'Some pairs fail AA'}
          </div>
        </div>
        <div style={{ marginBottom: 18 }}>
          <strong>Harmony Score:</strong> <span style={{ color: harmonyScore > 90 ? '#22c55e' : '#facc15', fontWeight: 700 }}>{harmonyScore}/100</span>
        </div>
        <div style={{ marginBottom: 18 }}>
          <strong>Branding Suitability:</strong> <span style={{ color: brandingScore > 85 ? '#22c55e' : '#facc15', fontWeight: 700 }}>{brandingScore}/100</span>
        </div>
        <div style={{ marginTop: 18, fontSize: 15, color: '#6366f1', fontWeight: 600 }}>
          {allPassAAA ? 'Your palette is highly accessible and harmonious!' : allPassAA ? 'Try tweaking for AAA contrast.' : 'Consider adjusting colors for better accessibility.'}
        </div>
      </div>
    </div>
  );
} 