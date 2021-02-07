import PlausibleProvider from "next-plausible";

import "../styles/globals.css";

function KevlatusApp({ Component, pageProps }) {
  return (
    <PlausibleProvider domain="www.kevlatus.de">
      <Component {...pageProps} />
    </PlausibleProvider>
  );
}

export default KevlatusApp;
