import Head from "next/head";
import { FunctionComponent } from "react";

export const defaultTitle = "Kevin Latusinski";
export const defaultDescription = "Personal page and blog by Kevin Latusinski.";
export const defaultPath = "/";

export function buildPageUrl(path: string): string {
  return "https://www.kevlatus.de" + (path ?? defaultPath);
}

export enum PageType {
  Article = "article",
  Website = "website",
}

interface DocHeadProps {
  readonly path: string;
  readonly concatTitle?: boolean;
  readonly title: string;
  readonly description: string;
  readonly pageType?: PageType;
}

const DocHead: FunctionComponent<DocHeadProps> = function ({
  concatTitle,
  description,
  path,
  title,
  pageType = PageType.Website,
}) {
  const url = buildPageUrl(path);

  if (title == null) {
    title = defaultTitle;
  } else {
    title = concatTitle ? `${title} | ${defaultTitle}` : title;
  }

  if (description == null) {
    description = defaultDescription;
  }

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />

      <title>{title}</title>

      <link rel="alternate" type="application/rss+xml" href="/rss.xml" />
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

      <meta property="author" content="Kevin Latusinski" />
      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:type" content={pageType} />
      {/*<meta property="og:image" content="" />*/}
      {/*<meta property="og:image:width" content="" />*/}
      {/*<meta property="og:image:height" content="" />*/}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content="@kevlatus" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:url" content={url} />
      <meta
        property="twitter:image"
        content="https://raw.githubusercontent.com/kevlatus/kevlatus.de/main/public/assets/images/ic-kevlatus-circle-512.png"
      />

      <link
        rel="preload"
        href="https://use.typekit.net/xhs5wzt.css"
        as="style"
      />
      <link rel="stylesheet" href="https://use.typekit.net/xhs5wzt.css" />

      {process.env.NODE_ENV === "production" ? (
        <>
          <script
            async
            defer
            data-domain="www.kevlatus.de"
            src="https://stats.kevlatus.de/js/plausible.outbound-links.js"
          />
          <script
            dangerouslySetInnerHTML={{
              __html:
                "window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }",
            }}
          />
        </>
      ) : null}
    </Head>
  );
};

export default DocHead;
