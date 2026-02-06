import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3366ff',
      light: '#7ea1ff',
      dark: '#1f3fb3',
    },
    secondary: {
      main: '#6c63ff',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#f5f8ff',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a223f',
      secondary: '#5f6b8a',
    },
    divider: '#e7ecf7',
  },
  shape: {
    borderRadius: 14,
  },
  typography: {
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
    h2: {
      fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
    },
    h4: {
      fontSize: 'clamp(1.5rem, 2vw, 2rem)',
    },
  },
});

export default theme;
