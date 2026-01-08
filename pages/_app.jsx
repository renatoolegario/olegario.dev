import React from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from 'theme/theme';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Head>
        <title>Olegario — Automação no WhatsApp com IA | Founder Técnico</title>
        <link rel="icon" href="/favicon/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/favicon/android-chrome-512x512.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </Head>
      <style jsx global>{`
        html, body, #__next {
          height: 100%;
        }
        body {
          margin: 0;
          overflow-x: hidden;
          overflow-y: auto;
          background-color: #f6f9ff;
        }
      `}</style>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
