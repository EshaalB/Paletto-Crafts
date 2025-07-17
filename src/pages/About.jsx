import React from 'react';

export default function About() {
  return (
    <div style={{ width: '100%' }}>
      <div style={{ maxWidth: 600, margin: '4rem auto', padding: '3rem 2rem', background: 'rgba(139,92,246,0.06)', borderRadius: 18, boxShadow: '0 4px 24px rgba(139,92,246,0.10)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
        <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 10, color: '#8b5cf6', textAlign: 'center' }}>About Paletto Crafts</h2>
        <p style={{ fontSize: 17, color: '#232336', textAlign: 'center', marginBottom: 18 }}>
          Paletto Crafts is a pro-level color palette toolkit for developers and designers. Instantly generate, analyze, and preview accessible color schemes, export to your favorite tools, and see your palette in action on real UI layouts. Built for creativity, accessibility, and modern design workflows.
        </p>
      </div>
    </div>
  );
} 