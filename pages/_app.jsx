import React from 'react';
import Head from 'next/head';
import ThemeProvider from '../components/template/theme-provider';
import '../theme/globals.css';
import createEmotionCache from '../utils/createEmotionCache';

const clientSideEmotionCache = createEmotionCache();

function MyApp({ Component, pageProps, emotionCache = clientSideEmotionCache }) {
  return (
    <ThemeProvider emotionCache={emotionCache}>
      <Head>
        {/* Basic SEO */}
        <title>Olegário.Dev – Desenvolvedor Full Stack</title>
        <meta name="keywords" content="Desenvolvedor, Full Stack, Next.js, React, PHP, WhatsApp, N8N, Automação, Mapbox" />
        <meta name="authors" content="Renato Olegário" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:url" content="https://olegario.dev" />
        <meta property="og:site_name" content="Olegário.Dev" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />

        {/* Favicon */}
        <link rel="icon" href="/favicon/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/favicon/android-chrome-512x512.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;