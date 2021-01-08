import classnames from "classnames";
import React, { FunctionComponent } from "react";

import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";

interface AppLayoutProps {
  readonly className?: string;
}

const AppLayout: FunctionComponent<AppLayoutProps> = function ({
  className,
  children,
}) {
  const rootClass = classnames(
    "min-h-full flex flex-col bg-primary-o2",
    className
  );
  return (
    <div className={rootClass}>
      <AppHeader />
      {children}
      <AppFooter />
    </div>
  );
};

export default AppLayout;
