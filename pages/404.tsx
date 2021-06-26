import React, { useEffect } from "react";

import DocHead, { defaultDescription } from "@components/DocHead";

declare const plausible: Function;

export default function PageNotFound() {
  useEffect(() => {
    if ("plausible" in window) {
      plausible("404", { props: { path: document.location.pathname } });
    }
  }, []);

  return (
    <>
      <DocHead
        path="/404"
        title="404 - not found"
        description={defaultDescription}
      />
      <h1>404 - Page Not Found</h1>
    </>
  );
}
