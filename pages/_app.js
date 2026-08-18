import Nav from "../components/Nav";
import CookieBanner from "../components/CookieBanner";
import Head from "next/head";
import Script from "next/script";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>West Cork Acupuncture | Kate | Skibbereen</title>
        <meta name="description" content="Traditional acupuncture and cosmetic facial acupuncture in Skibbereen, West Cork. Book online with Kate." />
        <meta name="keywords" content="acupuncture west cork, acupuncture skibbereen, cosmetic acupuncture ireland, facial acupuncture cork" />
        <meta name="author" content="West Cork Acupuncture" />
        <meta property="og:title" content="West Cork Acupuncture | Skibbereen" />
        <meta property="og:description" content="Gentle, evidence-based acupuncture treatments in Skibbereen, West Cork. Book online today." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://westcorkacupuncture.ie" />
        <meta property="og:image" content="https://westcorkacupuncture.ie/logo.jpg" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="West Cork Acupuncture" />
        <meta name="twitter:description" content="Acupuncture and cosmetic treatments in Skibbereen, West Cork." />
        <link rel="canonical" href="https://westcorkacupuncture.ie" />
      </Head>

      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-6L458G0ZVM"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-6L458G0ZVM');
        `}
      </Script>

      <Nav />
      <Component {...pageProps} />
      <CookieBanner />
    </>
  );
}
