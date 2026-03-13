import React from "react";
import { usePageTransition } from "./PageTransition.jsx";

function AnimatedLink({
  to,
  className,
  children,
  onClick,
  target,
  rel,
  ...rest
}) {
  const { transitionTo } = usePageTransition();

  const handleClick = (event) => {
    if (onClick) onClick(event);
    if (event.defaultPrevented) return;

    const isModifiedClick =
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0;

    if (isModifiedClick || target === "_blank" || !to?.startsWith("/")) {
      return;
    }

    event.preventDefault();
    transitionTo(to);
  };

  return (
    <a
      href={to}
      className={className}
      onClick={handleClick}
      target={target}
      rel={rel}
      {...rest}
    >
      {children}
    </a>
  );
}

export default AnimatedLink;

