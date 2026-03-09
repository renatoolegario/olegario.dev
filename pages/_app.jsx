import React from 'react';
import Head from 'next/head';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Olegário.Dev</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Landing page de Olegário.Dev com foco em arquitetura de software, MVP e execução técnica."
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
