import React from 'react';

export default function Contact() {
  return (
    <div style={{ width: '100%' }}>
      <div style={{ maxWidth: 500, margin: '4rem auto', padding: '3rem 2rem', background: 'rgba(139,92,246,0.06)', borderRadius: 18, boxShadow: '0 4px 24px rgba(139,92,246,0.10)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
        <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 10, color: '#8b5cf6', textAlign: 'center' }}>Contact & GitHub</h2>
        <p style={{ fontSize: 17, color: '#232336', textAlign: 'center', marginBottom: 18 }}>
          Have feedback, questions, or want to contribute? Visit the GitHub repo below!
        </p>
        <a href="https://github.com/your-github-repo" target="_blank" rel="noopener noreferrer" style={{ background: '#8b5cf6', color: '#fff', border: 'none', borderRadius: 10, padding: '0.9rem 2.2rem', fontWeight: 700, fontSize: 18, cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.10)', textDecoration: 'none', transition: 'background 0.18s, color 0.18s' }}>
          View on GitHub
        </a>
      </div>
    </div>
  );
} 