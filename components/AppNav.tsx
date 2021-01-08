import {FunctionComponent} from "react";

import NavLink from "./NavLink";

const AppNav: FunctionComponent = function () {
  return (
    <nav className="flex space-x-4">
      <NavLink href="/">Home</NavLink>
      <NavLink href="/blog">Blog</NavLink>
      {/*<NavLink href="/about">About</NavLink>*/}
    </nav>
  );
};

export default AppNav;
