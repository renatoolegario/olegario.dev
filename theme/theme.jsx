import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1cb5e0', // azul inspirado na logo
    },
    secondary: {
      main: '#7c3aed', // roxo inspirado na logo
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#f6f9ff',
      paper: '#ffffff',
    },
    text: {
      primary: '#0f172a',
      secondary: '#334155',
    },
    grey: {
      800: '#1f2937',
    },
    green: {
      500: '#22c55e',
      600: '#16a34a',
    },
    orange: {
      main: '#fb923c',
    },
    blue: {
      main: '#1cb5e0',
    },
    yellow: {
      main: '#facc15',
    },
    indigo: {
      main: '#818cf8',
    },
    teal: {
      main: '#14b8a6',
    },
  },
});

export default theme;
