import { useEffect } from "react";

declare const plausible: Function;

export default function PageNotFound() {
  useEffect(() => {
    if (!process.browser) return;

    plausible("404", { props: { path: document.location.pathname } });
  }, []);

  return <h1>404 - Page Not Found</h1>;
}
