import Document, { Head, Html, Main, NextScript } from "next/document";

export default class KevlatusDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <script
            dangerouslySetInnerHTML={{
              __html:
                "var q=window.matchMedia('(prefers-color-scheme: dark)');function c(e){document.body.className=e.matches?'dark':'light'};q.addEventListener('change',c);c(q)",
            }}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
