import React from 'react';
import Navbar from '../Navbar';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
  // Sidebar is 220px wide, Navbar is about 72px tall (from padding)
  return (
    <div>
      <Navbar />
      <Sidebar />
      <main
        style={{
          marginLeft: 220,
          minHeight: '100vh',
          padding: '2.5rem 2.5rem 2.5rem 0',
          background: 'transparent',
          transition: 'margin 0.3s',
        }}
      >
        {children}
      </main>
    </div>
  );
} 