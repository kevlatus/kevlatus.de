import { FunctionComponent } from "react";

interface JoinDiscussionButtonProps {
  readonly url: string;
}

const JoinDiscussionButton: FunctionComponent<JoinDiscussionButtonProps> = function ({
  url,
}) {
  const shareUrl = "https://twitter.com/search?q=" + encodeURIComponent(url);
  return (
    <a target="_blank" href={shareUrl}>
      Join the discussion
    </a>
  );
};

export default JoinDiscussionButton;
