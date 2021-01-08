import React, { FunctionComponent } from "react";

import SocialLinks from "./SocialLinks";

const AppFooter: FunctionComponent = function ({}) {
  return (
    <footer className="flex items-center justify-center">
      <SocialLinks />
    </footer>
  );
};

export default AppFooter;
