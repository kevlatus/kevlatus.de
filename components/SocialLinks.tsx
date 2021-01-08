import classNames from "classnames";
import Link from "next/link";
import React, { FunctionComponent, useState } from "react";

import SvgGithub from "../public/assets/images/ic-github.svg";
import SvgLinkedIn from "../public/assets/images/ic-linkedin.svg";
import SvgTwitter from "../public/assets/images/ic-twitter.svg";

interface CircularTextProps {
  readonly className?: string;
  readonly isHovered?: boolean;
  readonly text: string;
}

const CircularText: FunctionComponent<CircularTextProps> = function ({
  className,
  isHovered,
  text,
}) {
  const rootClass = classNames("flex", className);

  return (
    <div className={rootClass}>
      {text.split("").map((char, index) => {
        const maxRotation = Math.PI / 1.5;
        const progress = index / (text.length - 1);
        const offsetY = Math.sin(Math.PI * progress) + 0.3;
        const rotation = maxRotation * progress - maxRotation / 2;

        const translate = isHovered
          ? `translateY(-${offsetY}rem) rotate(${rotation}rad)`
          : "translateY(0) rotate(0)";
        return (
          <div
            key={index}
            className="transition"
            style={{ transform: translate }}
          >
            {char}
          </div>
        );
      })}
    </div>
  );
};

interface SocialLinkProps {
  readonly href: string;
  readonly text: string;
}

const SocialLink: FunctionComponent<SocialLinkProps> = function ({
  children,
  href,
  text,
}) {
  const [isHovered, setIsHovered] = useState(false);

  const textClass = "type-display text-xl";
  const normalTextClass = classNames(textClass, "md:hidden");
  const fancyTextClass = classNames(textClass, "hidden md:flex");

  return (
    <Link href={href}>
      <a
        className="group flex flex-col justify-center items-center relative"
        onMouseOver={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CircularText
          className={fancyTextClass}
          text={text}
          isHovered={isHovered}
        />
        <div className={normalTextClass}>{text}</div>
        <div className="absolute hidden md:flex items-center transform scale-0 transition-transform group-hover:scale-100">
          {children}
        </div>
      </a>
    </Link>
  );
};

const SocialLinks: FunctionComponent = function ({}) {
  return (
    <ul className="flex space-x-4">
      <li>
        <SocialLink href="https://github.com/kevlatus" text="Github">
          <SvgGithub className="fill-current w-6 h-6" />
        </SocialLink>
      </li>
      <li>
        <SocialLink href="https://linkedin.com/in/kevlatus" text="LinkedIn">
          <SvgLinkedIn className="fill-current w-6 h-6" />
        </SocialLink>
      </li>
      <li>
        <SocialLink href="https://twitter.com/kevlatus" text="Twitter">
          <SvgTwitter className="fill-current w-6 h-6" />
        </SocialLink>
      </li>
    </ul>
  );
};

export default SocialLinks;
