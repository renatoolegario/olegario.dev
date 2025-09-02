import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../../theme/theme';

const ThemeProvider = ({ children, emotionCache }) => {
  return (
    <CacheProvider value={emotionCache}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </CacheProvider>
  );
};

export default ThemeProvider;
