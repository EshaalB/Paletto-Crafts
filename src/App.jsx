import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Toolkit from './pages/Toolkit';
import About from './pages/About';
import Contact from './pages/Contact';
import Favorites from './pages/Favorites';
import Templates from './pages/Templates';
import Sidebar from './components/Sidebar';
import PaletteToolbar from './components/PaletteToolbar';
import useStore from './store';
import { useEffect } from 'react';
import './App.css'

function decodePalette(str) {
  try {
    return JSON.parse(decodeURIComponent(atob(str)));
  } catch {
    return null;
  }
}

function App() {
  const setPalette = useStore(state => state.setPalette);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get('palette');
    if (encoded) {
      const imported = decodePalette(encoded);
      if (imported && imported.primary && imported.secondary && imported.accent && imported.background && imported.text) {
        setPalette(imported);
      }
    }
  }, [setPalette]);
  return (
    <Router>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar />
        <div style={{ flex: 1, marginLeft: 220, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <PaletteToolbar />
          <div style={{ flex: 1, paddingTop: 100, paddingLeft: 32, paddingRight: 32, paddingBottom: 32 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/toolkit" element={<Toolkit />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/templates" element={<Templates />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
