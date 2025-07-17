import React from 'react';
import useStore from '../store';

export default function PortfolioDemo() {
  const { palette, darkMode } = useStore();

  const sectionStyle = {
    padding: '3rem 0',
    background: palette.background,
    color: palette.text,
    transition: 'background 0.3s, color 0.3s',
  };
  const cardStyle = {
    background: palette.secondary,
    color: palette.text,
    borderRadius: 16,
    padding: '2rem',
    boxShadow: darkMode ? '0 4px 24px rgba(0,0,0,0.24)' : '0 4px 24px rgba(0,0,0,0.08)',
    minWidth: 220,
    flex: 1,
    margin: '1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '1rem',
  };
  const btnStyle = {
    background: palette.accent,
    color: palette.text,
    border: 'none',
    borderRadius: 8,
    padding: '0.75rem 2rem',
    fontWeight: 600,
    fontSize: 18,
    cursor: 'pointer',
    marginTop: '1.5rem',
  };

  return (
    <div>
      {/* Hero Section */}
      <section style={{ ...sectionStyle, background: palette.primary, color: palette.text, textAlign: 'center' }}>
        <h1 style={{ fontSize: 48, margin: 0 }}>Visualize Your Colors & Fonts</h1>
        <p style={{ fontSize: 22, margin: '1.5rem 0' }}>
          Instantly preview your palette on a real website layout.
        </p>
        <button style={btnStyle}>Get Started</button>
      </section>

      {/* About Section */}
      <section style={sectionStyle}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <h2>About Paletto Crafts</h2>
          <p>
            Paletto Crafts helps developers and designers create beautiful, accessible color palettes and see them in action on a real site. Adjust, randomize, and export your palette for any project!
          </p>
        </div>
      </section>

      {/* Projects/Cards Section */}
      <section style={{ ...sectionStyle, background: palette.secondary }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center' }}>Sample Projects</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', marginTop: '2rem' }}>
            {[1, 2, 3].map((n) => (
              <div key={n} style={cardStyle}>
                <h3>Project {n}</h3>
                <p>
                  This is a sample project card. Your palette colors are applied to backgrounds, text, and buttons.
                </p>
                <button style={btnStyle}>View Project</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact/CTA Section */}
      <section style={{ ...sectionStyle, background: palette.accent, color: palette.text, textAlign: 'center' }}>
        <h2>Ready to Craft Your Palette?</h2>
        <p>Try the generator above or contact us for more info.</p>
        <button style={btnStyle}>Contact</button>
      </section>
    </div>
  );
} 