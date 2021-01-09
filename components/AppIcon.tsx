import classNames from "classnames";
import { FunctionComponent } from "react";

import SvgKevlatus from "../public/assets/images/ic-kevlatus.svg";

interface AppIconProps {
  readonly className?: string;
}

const AppIcon: FunctionComponent<AppIconProps> = function ({ className }) {
  const rootClass = classNames("text-primary fill-current", className);

  return <SvgKevlatus className={rootClass} />;
};

export default AppIcon;
