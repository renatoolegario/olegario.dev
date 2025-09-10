import Head from "next/head";

export default function MyApp({ Component, pageProps }) {
  return (
    // Remova o ThemeProvider e o CssBaseline
    <>
      <Head>
        {/* Metadados gerais */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="description" content="Olegário.Dev - Soluções em automação e análise de ROI para otimização de processos de cobrança" />
        <meta name="author" content="Olegário.Dev" />
        <title>Olegário.Dev</title>

        {/* Favicons e Webmanifest */}
        <link rel="icon" href="/favicon/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/favicon/android-chrome-512x512.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}