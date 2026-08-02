import Nav from "../components/Nav";
import CookieBanner from "../components/CookieBanner";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>West Cork Acupuncture | Kate | Skibbereen</title>
        <meta name="description" content="Traditional acupuncture, cupping therapy and cosmetic facial acupuncture in Skibbereen, West Cork. Book online with Kate." />
        <meta name="keywords" content="acupuncture west cork, acupuncture skibbereen, cupping therapy cork, cosmetic acupuncture ireland, facial acupuncture cork" />
        <meta name="author" content="West Cork Acupuncture" />
        <meta property="og:title" content="West Cork Acupuncture | Skibbereen" />
        <meta property="og:description" content="Gentle, evidence-based acupuncture treatments in Skibbereen, West Cork. Book online today." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://westcorkacupuncture.ie" />
        <meta property="og:image" content="https://west-cork-acupuncture-frontend.vercel.app/logo.jpg" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="West Cork Acupuncture" />
        <meta name="twitter:description" content="Acupuncture and cosmetic treatments in Skibbereen, West Cork." />
        <link rel="canonical" href="https://westcorkacupuncture.ie" />
      </Head>
      <Nav />
      <Component {...pageProps} />
      <CookieBanner />
    </>
  );
}
