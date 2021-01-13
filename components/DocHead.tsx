import Head from "next/head";
import { FunctionComponent } from "react";

interface DocHeadProps {
  readonly path?: string;
}

const DocHead: FunctionComponent<DocHeadProps> = function ({ path = "/" }) {
  const title = "Kevin Latusinski";
  const description = "Personal page and blog by Kevin Latusinski.";
  const url = "https://www.kevlatus.de" + path;

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />

      <title>{title}</title>

      <link rel="icon" href="/assets/images/ic-kevlatus-circle-48.png" />
      <link
        rel="apple-touch-icon"
        sizes="48x48"
        href="/assets/images/ic-kevlatus-circle-48.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="72x72"
        href="/assets/images/ic-kevlatus-circle-72.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="96x96"
        href="/assets/images/ic-kevlatus-circle-96.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href="/assets/images/ic-kevlatus-circle-144.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="192x192"
        href="/assets/images/ic-kevlatus-circle-192.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="256x256"
        href="/assets/images/ic-kevlatus-circle-256.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="384x384"
        href="/assets/images/ic-kevlatus-circle-384.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="512x512"
        href="/assets/images/ic-kevlatus-circle-512.png"
      />

      <meta name="theme-color" content="#3786E9" />
      <meta name="description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta name="twitter:creator" content="@kevlatus" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      <link
        rel="preload"
        href="https://use.typekit.net/xhs5wzt.css"
        as="style"
      />
      <link rel="stylesheet" href="https://use.typekit.net/xhs5wzt.css" />

      {process.env.NODE_ENV === "production" ? (
        <script
          dangerouslySetInnerHTML={{
            __html:
              "var _paq=window._paq=window._paq||[];_paq.push(['disableCookies']),_paq.push(['trackPageView']),_paq.push(['enableLinkTracking']),function(){_paq.push(['setTrackerUrl','https://kevlatus.matomo.cloud/matomo.php']),_paq.push(['setSiteId','1']);var a=document,e=a.createElement('script'),t=a.getElementsByTagName('script')[0];e.type='text/javascript',e.async=!0,e.src='//cdn.matomo.cloud/kevlatus.matomo.cloud/matomo.js',t.parentNode.insertBefore(e,t)}();",
          }}
        />
      ) : null}
    </Head>
  );
};

export default DocHead;
