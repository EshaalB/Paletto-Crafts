import React, { useState } from 'react';
import useStore from '../store';
import PaletteGridPreview from '../components/PaletteGridPreview';

function getWaveDivider(color, flip = false) {
  return (
    <svg viewBox="0 0 1440 120" style={{ display: 'block', width: '100%', height: 60, transform: flip ? 'scaleY(-1)' : undefined }}><path fill={color} fillOpacity="1" d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,74.7C672,53,768,43,864,58.7C960,75,1056,117,1152,117.3C1248,117,1344,75,1392,53.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path></svg>
  );
}

export default function Home() {
  const { palette, font, gradients } = useStore();
  const [previewMode, setPreviewMode] = useState('landing');

  const mainBg = gradients ? `linear-gradient(135deg, ${palette.primary}, ${palette.secondary}, ${palette.accent})` : palette.background;
  const sectionStyle = {
    padding: '5rem 0',
    background: 'transparent',
    color: palette.text,
    transition: 'background 0.5s cubic-bezier(.4,0,.2,1), color 0.5s cubic-bezier(.4,0,.2,1)',
    minHeight: '60vh',
  };
  const cardStyle = {
    background: gradients ? `linear-gradient(135deg, ${palette.secondary}, ${palette.accent})` : palette.secondary,
    color: palette.text,
    borderRadius: 24,
    padding: '2.5rem',
    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
    minWidth: 260,
    flex: 1,
    margin: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '1.2rem',
    fontSize: 18,
    fontFamily: font,
    transition: 'background 0.5s cubic-bezier(.4,0,.2,1), color 0.5s cubic-bezier(.4,0,.2,1)',
  };
  const btnStyle = {
    background: gradients ? `linear-gradient(to right, ${palette.accent}, ${palette.primary})` : palette.accent,
    color: palette.text,
    border: 'none',
    borderRadius: 12,
    padding: '1rem 2.5rem',
    fontWeight: 700,
    fontSize: 20,
    cursor: 'pointer',
    marginTop: '2rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
    transition: 'background 0.4s cubic-bezier(.4,0,.2,1), color 0.4s cubic-bezier(.4,0,.2,1)',
  };
  // Removed containerStyle

  // Sticky/floating palette preview bar
  const stickyBarStyle = {
    position: 'sticky',
    top: 90,
    zIndex: 10,
    background: gradients ? `linear-gradient(90deg, ${palette.primary}, ${palette.secondary})` : palette.primary,
    color: palette.text,
    borderRadius: 16,
    boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
    margin: '0 auto',
    marginTop: 24,
    marginBottom: 24,
    maxWidth: 900,
    padding: '1.2rem 2.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 24,
  };

  // Preview mode selector
  const previewModes = [
    { key: 'landing', label: 'Landing Page' },
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'blog', label: 'Blog' },
    { key: 'ecommerce', label: 'E-Commerce' },
  ];

  return (
    <div style={{ width: '100%', background: mainBg, color: palette.text, fontFamily: font, transition: 'background 0.5s cubic-bezier(.4,0,.2,1), color 0.5s cubic-bezier(.4,0,.2,1)', position: 'relative', overflowX: 'hidden' }}>
      {/* Hero Section */}
      <section style={{ ...sectionStyle, background: 'transparent', minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
        <h1 style={{ fontSize: 64, margin: 0, fontWeight: 900, letterSpacing: 1, textShadow: '0 4px 32px rgba(0,0,0,0.18)' }}>Visualize Your Colors & Fonts</h1>
        <p style={{ fontSize: 28, margin: '2.5rem 0', maxWidth: 700, textAlign: 'center', opacity: 0.95 }}>
          Instantly preview your palette on a real, modern website layout. Try different UI modes, see accessibility, and export your palette!
        </p>
        <button style={btnStyle}>Get Started</button>
        {/* Floating shapes for uniqueness */}
        <div style={{ position: 'absolute', left: 40, top: 60, opacity: 0.18, zIndex: 0 }}>
          <svg width="120" height="120"><circle cx="60" cy="60" r="60" fill={palette.accent} /></svg>
        </div>
        <div style={{ position: 'absolute', right: 80, bottom: 40, opacity: 0.13, zIndex: 0 }}>
          <svg width="90" height="90"><rect width="90" height="90" rx="24" fill={palette.secondary} /></svg>
        </div>
      </section>
      {getWaveDivider(palette.background)}
      {/* Sticky Palette Preview Bar */}
      <div style={stickyBarStyle}>
        <span style={{ fontWeight: 700, fontSize: 22 }}>Palette Preview</span>
        <PaletteGridPreview mode={previewMode} />
        <div style={{ display: 'flex', gap: 10 }}>
          {previewModes.map(m => (
            <button key={m.key} onClick={() => setPreviewMode(m.key)} style={{ background: previewMode === m.key ? palette.accent : 'rgba(255,255,255,0.10)', color: palette.text, border: 'none', borderRadius: 8, padding: '0.5rem 1.2rem', fontWeight: 600, fontSize: 15, cursor: 'pointer', outline: previewMode === m.key ? `2px solid ${palette.primary}` : 'none', transition: 'background 0.15s' }}>{m.label}</button>
          ))}
        </div>
      </div>
      {/* About Section */}
      <section style={{ ...sectionStyle, background: 'rgba(255,255,255,0.04)', borderRadius: 32, margin: '0 2vw', boxShadow: '0 2px 24px rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 36, fontWeight: 800 }}>About Paletto Crafts</h2>
          <p style={{ fontSize: 20, opacity: 0.92 }}>
            Paletto Crafts helps developers and designers create beautiful, accessible color palettes and see them in action on a real site. Adjust, randomize, and export your palette for any project!
          </p>
        </div>
      </section>
      {getWaveDivider(palette.secondary, true)}
      {/* Projects/Cards Section */}
      <section style={{ ...sectionStyle, background: gradients ? `linear-gradient(120deg, ${palette.secondary}, ${palette.primary})` : palette.secondary, borderRadius: 32, margin: '0 2vw', boxShadow: '0 2px 24px rgba(0,0,0,0.10)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2.5rem', marginTop: '2rem' }}>
          {[1, 2, 3, 4].map((n) => (
            <div key={n} style={cardStyle}>
              <h3 style={{ fontSize: 26, fontWeight: 700 }}>Project {n}</h3>
              <p>
                This is a sample project card. Your palette colors are applied to backgrounds, text, and buttons.
              </p>
              <button style={btnStyle}>View Project</button>
            </div>
          ))}
        </div>
      </section>
      {getWaveDivider(palette.accent)}
      {/* Palette Suggestions Section */}
      <section style={{ ...sectionStyle, background: 'rgba(0,0,0,0.04)', borderRadius: 32, margin: '0 2vw', boxShadow: '0 2px 24px rgba(0,0,0,0.04)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 32, fontWeight: 800 }}>Palette Suggestions</h2>
          <p style={{ fontSize: 18, opacity: 0.92 }}>Try these accessible and harmonious palettes:</p>
          {/* Placeholder for suggestions - to be implemented */}
          <div style={{ display: 'flex', gap: 18, justifyContent: 'center', marginTop: 18 }}>
            <div style={{ background: palette.primary, color: palette.text, borderRadius: 10, padding: '1rem 2rem', fontWeight: 600 }}>Suggestion 1</div>
            <div style={{ background: palette.secondary, color: palette.text, borderRadius: 10, padding: '1rem 2rem', fontWeight: 600 }}>Suggestion 2</div>
            <div style={{ background: palette.accent, color: palette.text, borderRadius: 10, padding: '1rem 2rem', fontWeight: 600 }}>Suggestion 3</div>
          </div>
        </div>
      </section>
      {getWaveDivider(palette.background, true)}
      {/* Contact/CTA Section */}
      <section style={{ ...sectionStyle, background: gradients ? `linear-gradient(135deg, ${palette.accent}, ${palette.primary})` : palette.accent, color: palette.text, textAlign: 'center', borderRadius: 32, margin: '0 2vw', boxShadow: '0 2px 24px rgba(0,0,0,0.10)' }}>
        <h2 style={{ fontSize: 32, fontWeight: 800 }}>Ready to Craft Your Palette?</h2>
        <p style={{ fontSize: 20, opacity: 0.92 }}>Try the generator above or contact us for more info.</p>
        <button style={btnStyle}>Contact</button>
      </section>
      {/* Footer */}
      <footer style={{ marginTop: 60, padding: '2.5rem 0', background: 'rgba(24,24,37,0.95)', color: '#c4b5fd', textAlign: 'center', fontWeight: 600, fontSize: 18, borderTopLeftRadius: 32, borderTopRightRadius: 32, boxShadow: '0 -2px 24px rgba(0,0,0,0.10)' }}>
        Paletto Crafts &copy; {new Date().getFullYear()} &mdash; Crafted with <span style={{ color: palette.accent }}> 65</span> for devs & designers.
      </footer>
      {/* Responsive CSS */}
      <style>{`
        @media (max-width: 900px) {
          h1 { font-size: 2.5rem !important; }
          h2 { font-size: 1.5rem !important; }
          section { padding: 2.5rem 0.5rem !important; }
        }
        @media (max-width: 600px) {
          h1 { font-size: 1.5rem !important; }
          .stickyBar { flex-direction: column !important; gap: 10px !important; }
        }
      `}</style>
    </div>
  );
} 