import { FunctionComponent } from "react";

import AppNav from "./AppNav";
import AppIcon from "./AppIcon";

const AppHeader: FunctionComponent = function ({}) {
  return (
    <header className="px-6 py-2 flex items-center">
      <AppIcon className="w-6 h-6" />
      <div className="flex-grow" />
      {/*<AppNav/>*/}
      <div className="flex-grow" />
      <div className="w-6 h-6" />
    </header>
  );
};

export default AppHeader;
