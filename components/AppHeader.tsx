import Link from "next/link";
import { FunctionComponent } from "react";

import AppNav from "./AppNav";
import AppIcon from "./AppIcon";

const AppHeader: FunctionComponent = function ({}) {
  return (
    <header className="px-6 py-2 flex items-center">
      <Link href="/">
        <a>
          <AppIcon className="w-6 h-6" />
        </a>
      </Link>
      <div className="flex-grow" />
      <AppNav/>
      <div className="flex-grow" />
      <div className="w-6 h-6" />
    </header>
  );
};

export default AppHeader;
