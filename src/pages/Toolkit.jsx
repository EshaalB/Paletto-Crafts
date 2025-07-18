import React, { useState } from 'react';
import useStore from '../store';
import Swal from 'sweetalert2';

function getContrast(hex1, hex2) {
  // WCAG contrast ratio calculation
  function luminance(hex) {
    let c = hex.substring(1);
    if (c.length === 3) c = c.split('').map(x => x + x).join('');
    const rgb = [0, 1, 2].map(i => parseInt(c.substr(i * 2, 2), 16) / 255);
    const a = rgb.map(v => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
  }
  const l1 = luminance(hex1);
  const l2 = luminance(hex2);
  return ((Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)).toFixed(2);
}

function lightenDarken(hex, amt) {
  let c = hex.substring(1);
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  let num = parseInt(c, 16);
  let r = Math.min(255, Math.max(0, ((num >> 16) & 0xff) + amt));
  let g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + amt));
  let b = Math.min(255, Math.max(0, (num & 0xff) + amt));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

// --- Color Harmony Generator ---
function hexToHsl(hex) {
  let c = hex.substring(1);
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  let r = parseInt(c.substr(0, 2), 16) / 255;
  let g = parseInt(c.substr(2, 2), 16) / 255;
  let b = parseInt(c.substr(4, 2), 16) / 255;
  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) { h = s = 0; }
  else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
      default: h = 0;
    }
    h /= 6;
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
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
function getHarmony(base, type) {
  const [h, s, l] = hexToHsl(base);
  switch (type) {
    case 'Monochromatic':
      return [hslToHex(h, s, l), hslToHex(h, s, Math.max(0, l - 20)), hslToHex(h, s, Math.min(100, l + 20))];
    case 'Analogous':
      return [hslToHex((h + 330) % 360, s, l), hslToHex(h, s, l), hslToHex((h + 30) % 360, s, l)];
    case 'Complementary':
      return [hslToHex(h, s, l), hslToHex((h + 180) % 360, s, l)];
    case 'Split-Complementary':
      return [hslToHex(h, s, l), hslToHex((h + 150) % 360, s, l), hslToHex((h + 210) % 360, s, l)];
    case 'Triadic':
      return [hslToHex(h, s, l), hslToHex((h + 120) % 360, s, l), hslToHex((h + 240) % 360, s, l)];
    case 'Tetradic':
      return [hslToHex(h, s, l), hslToHex((h + 90) % 360, s, l), hslToHex((h + 180) % 360, s, l), hslToHex((h + 270) % 360, s, l)];
    default:
      return [base];
  }
}
function ColorHarmonyGenerator() {
  const [base, setBase] = useState('#8b5cf6');
  const [type, setType] = useState('Monochromatic');
  const harmonyTypes = ['Monochromatic', 'Analogous', 'Complementary', 'Split-Complementary', 'Triadic', 'Tetradic'];
  const colors = getHarmony(base, type);
  return (
    <div style={{ marginBottom: 32 }}>
      <h3>Color Harmony Generator</h3>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 16 }}>
        <label style={{ fontWeight: 600 }}>Base Color:</label>
        <input type="color" value={base} onChange={e => setBase(e.target.value)} style={{ width: 40, height: 40, border: 'none', borderRadius: 8 }} />
        <label style={{ fontWeight: 600, marginLeft: 24 }}>Harmony:</label>
        <select value={type} onChange={e => setType(e.target.value)} style={{ padding: 8, borderRadius: 8, fontWeight: 600 }}>
          {harmonyTypes.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        {colors.map((color, i) => (
          <div key={i} style={{ width: 48, height: 48, borderRadius: 10, background: color, border: '2px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, color: '#181825', fontSize: 13 }}>{color}</div>
        ))}
      </div>
    </div>
  );
}

function ContrastChecker({ palette }) {
  const pairs = [
    ['background', 'text'],
    ['primary', 'text'],
    ['secondary', 'text'],
    ['accent', 'text'],
    ['primary', 'background'],
    ['secondary', 'background'],
    ['accent', 'background'],
  ];
  return (
    <div style={{ marginBottom: 32 }}>
      <h3>Contrast Checker</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12 }}>
        <thead>
          <tr style={{ background: '#f3f4f6' }}>
            <th style={{ padding: 8, textAlign: 'left' }}>Pair</th>
            <th style={{ padding: 8, textAlign: 'left' }}>Contrast Ratio</th>
            <th style={{ padding: 8, textAlign: 'left' }}>WCAG AA</th>
          </tr>
        </thead>
        <tbody>
          {pairs.map(([a, b]) => {
            const ratio = getContrast(palette[a], palette[b]);
            const pass = ratio >= 4.5;
            return (
              <tr key={a + b} style={{ background: pass ? '#e0fce0' : '#fde2e2' }}>
                <td style={{ padding: 8 }}>{a} / {b}</td>
                <td style={{ padding: 8 }}>{ratio}</td>
                <td style={{ padding: 8 }}>{pass ? 'Pass' : 'Fail'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function LightenDarkenTool({ palette }) {
  const keys = ['primary', 'secondary', 'accent', 'background', 'text'];
  const steps = [-60, -30, 0, 30, 60];
  return (
    <div style={{ marginBottom: 32 }}>
      <h3>Lighten/Darken Tool</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12 }}>
        <thead>
          <tr style={{ background: '#f3f4f6' }}>
            <th style={{ padding: 8 }}>Color</th>
            {steps.map(step => (
              <th key={step} style={{ padding: 8 }}>{step === 0 ? 'Base' : step > 0 ? `+${step}` : step}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {keys.map(key => (
            <tr key={key}>
              <td style={{ padding: 8, fontWeight: 600 }}>{key}</td>
              {steps.map(step => (
                <td key={step} style={{ padding: 8 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: lightenDarken(palette[key], step), border: '2px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, color: '#181825', fontSize: 13 }}>{lightenDarken(palette[key], step)}</div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ShadeViewer({ palette }) {
  const keys = ['primary', 'secondary', 'accent', 'background', 'text'];
  return (
    <div style={{ marginBottom: 32 }}>
      <h3>Shade Viewer</h3>
      {keys.map(key => (
        <div key={key} style={{ marginBottom: 12 }}>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>{key}</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {[60, 30, 0, -30, -60].map(step => (
              <div key={step} style={{ width: 36, height: 36, borderRadius: 8, background: lightenDarken(palette[key], step), border: '2px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, color: '#181825', fontSize: 13 }}>{lightenDarken(palette[key], step)}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function AccessibilityBadges({ palette }) {
  const pairs = [
    ['background', 'text'],
    ['primary', 'text'],
    ['secondary', 'text'],
    ['accent', 'text'],
    ['primary', 'background'],
    ['secondary', 'background'],
    ['accent', 'background'],
  ];
  const results = pairs.map(([a, b]) => {
    const ratio = getContrast(palette[a], palette[b]);
    return { pair: `${a} / ${b}`, pass: ratio >= 4.5, ratio };
  });
  const allPass = results.every(r => r.pass);
  return (
    <div style={{ marginBottom: 32 }}>
      <h3>Accessibility Badges</h3>
      <div style={{ marginBottom: 12 }}>
        <span style={{
          display: 'inline-block',
          background: allPass ? '#22c55e' : '#ef4444',
          color: '#fff',
          borderRadius: 8,
          padding: '0.4rem 1.2rem',
          fontWeight: 700,
          fontSize: 16,
          marginRight: 12,
        }}>
          {allPass ? 'All pairs pass WCAG AA' : 'Some pairs fail WCAG AA'}
        </span>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {results.map(r => (
          <span key={r.pair} style={{
            display: 'inline-block',
            background: r.pass ? '#22c55e' : '#ef4444',
            color: '#fff',
            borderRadius: 8,
            padding: '0.3rem 0.9rem',
            fontWeight: 600,
            fontSize: 14,
          }}>
            {r.pair}: {r.pass ? 'Pass' : 'Fail'} ({r.ratio})
          </span>
        ))}
      </div>
    </div>
  );
}

// --- Accessibility Preview ---
function AccessibilityPreview({ palette, simulation }) {
  // Color blindness simulation matrixes
  const simMatrices = {
    none: null,
    protanopia: [
      [0.567, 0.433, 0],
      [0.558, 0.442, 0],
      [0, 0.242, 0.758],
    ],
    deuteranopia: [
      [0.625, 0.375, 0],
      [0.7, 0.3, 0],
      [0, 0.3, 0.7],
    ],
    tritanopia: [
      [0.95, 0.05, 0],
      [0, 0.433, 0.567],
      [0, 0.475, 0.525],
    ],
  };
  function hexToRgb(hex) {
    let c = hex.substring(1);
    if (c.length === 3) c = c.split('').map(x => x + x).join('');
    return [0, 1, 2].map(i => parseInt(c.substr(i * 2, 2), 16));
  }
  function rgbToHex([r, g, b]) {
    return (
      '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')
    );
  }
  function simulate(hex, type) {
    if (type === 'none') return hex;
    const rgb = hexToRgb(hex);
    const m = simMatrices[type];
    const [r, g, b] = [
      m[0][0] * rgb[0] + m[0][1] * rgb[1] + m[0][2] * rgb[2],
      m[1][0] * rgb[0] + m[1][1] * rgb[1] + m[1][2] * rgb[2],
      m[2][0] * rgb[0] + m[2][1] * rgb[1] + m[2][2] * rgb[2],
    ];
    return rgbToHex([Math.round(r), Math.round(g), Math.round(b)]);
  }
  // Simulate palette
  const simPalette = Object.fromEntries(
    Object.entries(palette).map(([k, v]) => [k, simulate(v, simulation)])
  );
  // Contrast check for button
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
    return ((Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)).toFixed(2);
  }
  const buttonContrast = getContrast(simPalette.primary, simPalette.text);
  const cardContrast = getContrast(simPalette.background, simPalette.text);
  return (
    <div style={{ marginBottom: 32 }}>
      <h3>Live Accessibility Preview</h3>
      <div style={{ display: 'flex', gap: 32, alignItems: 'center', marginBottom: 16 }}>
        <div style={{ background: simPalette.background, color: simPalette.text, borderRadius: 12, padding: 24, minWidth: 220, boxShadow: '0 2px 12px #0001' }}>
          <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 12 }}>Sample Card</div>
          <div style={{ marginBottom: 16 }}>This is a preview of your palette on a card.</div>
          <button
            style={{
              background: simPalette.primary,
              color: simPalette.text,
              border: 'none',
              borderRadius: 8,
              padding: '0.6rem 1.4rem',
              fontWeight: 700,
              fontSize: 16,
              cursor: 'pointer',
              marginBottom: 8,
            }}
            onClick={() => {
              if (buttonContrast < 7.0) {
                Swal.fire({
                  icon: 'warning',
                  title: 'Low Contrast',
                  text: `Button contrast ratio: ${buttonContrast} (should be ≥ 7.0 for AAA)`,
                  timer: 2000,
                  showConfirmButton: false
                });
              } else {
                Swal.fire({
                  icon: 'success',
                  title: 'Great Contrast!',
                  text: `Button contrast ratio: ${buttonContrast}`,
                  timer: 1200,
                  showConfirmButton: false
                });
              }
            }}
          >
            Button
          </button>
          <input
            style={{
              background: simPalette.background,
              color: simPalette.text,
              border: `2px solid ${simPalette.primary}`,
              borderRadius: 8,
              padding: '0.5rem 1rem',
              fontSize: 15,
              marginBottom: 8,
              width: '100%',
            }}
            placeholder="Input field"
          />
        </div>
        <div>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>Contrast Ratios:</div>
          <div>Button: <b>{buttonContrast}</b> {buttonContrast >= 7.0 ? '✅ AAA' : '⚠️'}</div>
          <div>Card: <b>{cardContrast}</b> {cardContrast >= 7.0 ? '✅ AAA' : '⚠️'}</div>
        </div>
      </div>
    </div>
  );
}

// --- Accessibility Report Download ---
function downloadAccessibilityReport(palette) {
  const pairs = [
    ['background', 'text'],
    ['primary', 'text'],
    ['secondary', 'text'],
    ['accent', 'text'],
    ['primary', 'background'],
    ['secondary', 'background'],
    ['accent', 'background'],
  ];
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
    return ((Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)).toFixed(2);
  }
  let csv = 'Pair,Contrast Ratio,WCAG AAA\n';
  pairs.forEach(([a, b]) => {
    const ratio = getContrast(palette[a], palette[b]);
    csv += `${a}/${b},${ratio},${ratio >= 7.0 ? 'Pass' : 'Fail'}\n`;
  });
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'accessibility-report.csv';
  a.click();
  URL.revokeObjectURL(url);
  Swal.fire({
    icon: 'success',
    title: 'Report Downloaded!',
    text: 'Accessibility report downloaded as CSV.',
    timer: 1400,
    showConfirmButton: false
  });
}

// --- Pro Tools ---
function ProTools({ palette, setPalette }) {
  const [batch, setBatch] = useState([]);
  const [mergeA, setMergeA] = useState('');
  const [mergeB, setMergeB] = useState('');
  // Batch Generation
  function randomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  }
  function randomPalette() {
    return {
      primary: randomColor(),
      secondary: randomColor(),
      accent: randomColor(),
      background: randomColor(),
      text: randomColor(),
    };
  }
  function handleBatchGenerate() {
    const newBatch = Array.from({ length: 4 }, randomPalette);
    setBatch(newBatch);
    Swal.fire({
      icon: 'success',
      title: 'Batch Generated!',
      text: '4 random palettes generated.',
      timer: 1200,
      showConfirmButton: false
    });
  }
  function handleApplyBatch(idx) {
    setPalette(batch[idx]);
    Swal.fire({
      icon: 'success',
      title: 'Palette Applied!',
      text: `Batch palette #${idx + 1} applied.`,
      timer: 1000,
      showConfirmButton: false
    });
  }
  // Merge/Split
  function handleMerge() {
    try {
      const a = JSON.parse(mergeA);
      const b = JSON.parse(mergeB);
      const merged = { ...a, ...b };
      setPalette(merged);
      Swal.fire({
        icon: 'success',
        title: 'Palettes Merged!',
        text: 'Palettes merged and applied.',
        timer: 1200,
        showConfirmButton: false
      });
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Invalid JSON',
        text: 'Please enter valid palette JSON.',
        timer: 1600,
        showConfirmButton: false
      });
    }
  }
  function handleSplit() {
    try {
      const a = JSON.parse(mergeA);
      setPalette(a);
      Swal.fire({
        icon: 'success',
        title: 'Palette Split!',
        text: 'First palette applied.',
        timer: 1000,
        showConfirmButton: false
      });
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Invalid JSON',
        text: 'Please enter valid palette JSON.',
        timer: 1600,
        showConfirmButton: false
      });
    }
  }
  return (
    <div style={{ marginBottom: 32 }}>
      <h3>Pro Tools</h3>
      <div style={{ marginBottom: 16 }}>
        <button onClick={handleBatchGenerate} style={{ background: '#6366f1', color: '#fff', border: 'none', borderRadius: 8, padding: '0.4rem 1.2rem', fontWeight: 600, fontSize: 15, cursor: 'pointer', marginRight: 10 }}>Batch Generate</button>
      </div>
      <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
        {batch.map((p, i) => (
          <div key={i} style={{ background: '#f3f4f6', borderRadius: 10, padding: 12, minWidth: 120 }}>
            {Object.entries(p).map(([k, v]) => (
              <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                <span style={{ width: 16, height: 16, background: v, borderRadius: 4, display: 'inline-block', border: '1px solid #ddd' }}></span>
                <span style={{ fontSize: 13 }}>{k}: {v}</span>
              </div>
            ))}
            <button onClick={() => handleApplyBatch(i)} style={{ background: '#10b981', color: '#fff', border: 'none', borderRadius: 8, padding: '0.3rem 0.8rem', fontWeight: 600, fontSize: 13, cursor: 'pointer', marginTop: 6 }}>Apply</button>
          </div>
        ))}
      </div>
      <div style={{ marginBottom: 16 }}>
        <textarea value={mergeA} onChange={e => setMergeA(e.target.value)} placeholder="Palette JSON A" style={{ width: 180, minHeight: 60, fontFamily: 'monospace', fontSize: 13, borderRadius: 8, border: '1px solid #eee', marginRight: 8, padding: 8, background: '#f8fafc', color: '#181825' }} />
        <textarea value={mergeB} onChange={e => setMergeB(e.target.value)} placeholder="Palette JSON B" style={{ width: 180, minHeight: 60, fontFamily: 'monospace', fontSize: 13, borderRadius: 8, border: '1px solid #eee', marginRight: 8, padding: 8, background: '#f8fafc', color: '#181825' }} />
        <button onClick={handleMerge} style={{ background: '#6366f1', color: '#fff', border: 'none', borderRadius: 8, padding: '0.4rem 1.2rem', fontWeight: 600, fontSize: 15, cursor: 'pointer', marginRight: 8 }}>Merge</button>
        <button onClick={handleSplit} style={{ background: '#8b5cf6', color: '#fff', border: 'none', borderRadius: 8, padding: '0.4rem 1.2rem', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>Split</button>
      </div>
    </div>
  );
}

export default function Toolkit() {
  const { palette, setPalette } = useStore();
  const [simulation, setSimulation] = useState('none');
  return (
    <div style={{ width: '100%' }}>
      <h2 style={{ fontSize: 32, fontWeight: 900, marginBottom: 36, letterSpacing: 1, color: '#8b5cf6', textAlign: 'center' }}>Palette Toolkit</h2>
      <div style={{ marginBottom: 24 }}>
        <label style={{ fontWeight: 600, marginRight: 12 }}>Color Blindness Simulation:</label>
        <select value={simulation} onChange={e => setSimulation(e.target.value)} style={{ padding: 8, borderRadius: 8, fontWeight: 600 }}>
          <option value="none">None</option>
          <option value="protanopia">Protanopia</option>
          <option value="deuteranopia">Deuteranopia</option>
          <option value="tritanopia">Tritanopia</option>
        </select>
      </div>
      <AccessibilityPreview palette={palette} simulation={simulation} />
      <button onClick={() => downloadAccessibilityReport(palette)} style={{ background: '#6366f1', color: '#fff', border: 'none', borderRadius: 8, padding: '0.4rem 1.2rem', fontWeight: 600, fontSize: 15, cursor: 'pointer', marginBottom: 32 }}>Download Accessibility Report</button>
      <ProTools palette={palette} setPalette={setPalette} />
      <ContrastChecker palette={palette} />
      <LightenDarkenTool palette={palette} />
      <ShadeViewer palette={palette} />
      <ColorHarmonyGenerator />
      {/* Add more toolkit features here */}
    </div>
  );
} 