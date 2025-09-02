import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0D0D0D', // Fundo Escuro
    },
    secondary: {
      main: '#000000', // Preto/Background
    },
    text: {
      primary: '#FFFFFF', // Texto Principal (Branco)
      secondary: '#CCCCCC', // Texto Secundário (Cinza Claro)
      disabled: '#666666', // Texto Destaque (Cinza Médio)
    },
    action: {
      active: '#00BFFF', // Cor de Ação/Destaque (Azul Ciano)
    },
    background: {
      default: '#0D0D0D',
      paper: '#1A1A1A', // Cinza Profundo (caixas / containers)
    },
    success: {
      main: '#2E7D32', // Verde de Fundo
    },
  },
});

export default theme;
