import { useRouter } from "next/router";
import { useEffect } from "react";
import * as Fathom from "fathom-client";

import "../styles/globals.css";

function KevlatusApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    Fathom.load("JIWYJDVS", {
      url: "https://mosquito.kevlatus.de/script.js",
      includedDomains: ["www.kevlatus.de", "kevlatus.de"],
    });

    function onRouteChangeComplete() {
      Fathom.trackPageview();
    }

    router.events.on("routeChangeComplete", onRouteChangeComplete);

    return () => {
      router.events.off("routeChangeComplete", onRouteChangeComplete);
    };
  }, []);

  return <Component {...pageProps} />;
}

export default KevlatusApp;
