import { FunctionComponent } from "react";

interface SaveToPocketProps {
  readonly articleUrl: string;
  readonly className?: string;
}

const SaveToPocket: FunctionComponent<SaveToPocketProps> = function ({
  articleUrl,
  className,
}) {
  const href = `https://getpocket.com/edit?url=${encodeURIComponent(
    articleUrl
  )}`;
  return (
    <a className={className} href={href} target="_blank">
      Save to Pocket
    </a>
  );
};

export default SaveToPocket;
