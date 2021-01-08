import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { FunctionComponent } from "react";

import styles from "../styles/NavLink.module.css";
import SvgBrush from "../public/assets/images/img-brush.svg";

interface NavLinkProps {
  readonly href: string;
}

const NavLink: FunctionComponent<NavLinkProps> = function ({ children, href }) {
  const router = useRouter();

  const linkClass = classNames(styles.link, {
    [styles.active]:
      (href === "/" && router.pathname === href) ||
      (href !== "/" && router.pathname.startsWith(href)),
  });

  return (
    <Link href={href}>
      <a className={linkClass}>
        <SvgBrush className={styles.brush} />
        <div>{children}</div>
      </a>
    </Link>
  );
};

export default NavLink;
