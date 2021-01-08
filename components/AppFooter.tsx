import React, { FunctionComponent } from "react";

import SocialLinks from "./SocialLinks";

const AppFooter: FunctionComponent = function ({}) {
  return (
    <footer className="px-8 py-2 flex items-center justify-center">
      <SocialLinks />
    </footer>
  );
};

export default AppFooter;
