import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#22d3ee', // cyan-400
    },
    secondary: {
      main: '#f48fb1', // pink-400
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#000000',
      paper: '#111827', // gray-900
    },
    text: {
        primary: '#ffffff',
        secondary: '#d1d5db' // gray-300
    },
    grey: {
        800: '#1f2937', // gray-800
    },
    green: {
        500: '#22c55e',
        600: '#16a34a'
    },
    orange: {
        main: '#fb923c' // orange-400
    },
    blue: {
        main: '#60a5fa' // blue-400
    },
    yellow: {
        main: '#facc15' // yellow-400
    },
    indigo: {
        main: '#818cf8' // indigo-400
    },
    teal: {
        main: '#2dd4bf' // teal-400
    }
  },
});

export default theme;
