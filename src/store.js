import { create } from 'zustand';

const DARK_BG = '#181825';
const DARK_TEXT = '#fff';
const LIGHT_BG = '#fff';
const LIGHT_TEXT = '#181825';

const useStore = create((set) => ({
  // Palette state
  palette: {
    primary: '#8b5cf6',
    secondary: '#6366f1',
    accent: '#3b82f6',
    background: DARK_BG,
    text: DARK_TEXT,
  },
  history: [],
  future: [],
  setPalette: (palette) => set(state => ({
    history: [...state.history, state.palette],
    future: [],
    palette,
  })),
  undoPalette: () => set(state => {
    if (state.history.length === 0) return {};
    const prev = state.history[state.history.length - 1];
    return {
      palette: prev,
      history: state.history.slice(0, -1),
      future: [state.palette, ...state.future],
    };
  }),
  redoPalette: () => set(state => {
    if (state.future.length === 0) return {};
    const next = state.future[0];
    return {
      palette: next,
      history: [...state.history, state.palette],
      future: state.future.slice(1),
    };
  }),

  // UI state
  darkMode: true,
  gradients: false,
  shadows: false,
  setDarkMode: (darkMode) => set(state => {
    const prevBg = state.palette.background;
    const prevText = state.palette.text;
    let background = prevBg;
    let text = prevText;
    if (darkMode) {
      if (prevBg === LIGHT_BG) background = DARK_BG;
      if (prevText === LIGHT_TEXT) text = DARK_TEXT;
    } else {
      if (prevBg === DARK_BG) background = LIGHT_BG;
      if (prevText === DARK_TEXT) text = LIGHT_TEXT;
    }
    return {
      darkMode,
      palette: {
        ...state.palette,
        background,
        text,
      },
    };
  }),
  setGradients: (gradients) => set({ gradients }),
  setShadows: (shadows) => set({ shadows }),

  // Font and layout state
  font: 'Inter',
  setFont: (font) => set({ font }),
  layout: 'grid',
  setLayout: (layout) => set({ layout }),

  // Favorites
  favorites: [],
  addFavorite: (palette) => set((state) => ({ favorites: [...state.favorites, palette] })),
  removeFavorite: (index) => set((state) => ({ favorites: state.favorites.filter((_, i) => i !== index) })),

  // Palette locking (lock swatches to prevent changes on randomize)
  locks: [false, false, false, false, false], // one per swatch
  setLock: (index, value) => set(state => {
    const locks = [...state.locks];
    locks[index] = value;
    return { locks };
  }),
  setAllLocks: (locks) => set({ locks }),

  // Custom color naming
  colorNames: { primary: 'Primary', secondary: 'Secondary', accent: 'Accent', background: 'Background', text: 'Text' },
  setColorName: (key, name) => set(state => ({ colorNames: { ...state.colorNames, [key]: name } })),

  // Color blindness simulation mode
  colorBlindness: null, // e.g., 'protanopia', 'deuteranopia', etc.
  setColorBlindness: (mode) => set({ colorBlindness: mode }),
}));

export default useStore; 