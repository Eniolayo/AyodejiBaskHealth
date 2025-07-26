import React from "react";

interface IconProps {
  className?: string;
  size?: number;
}

export const PlayIcon: React.FC<IconProps> = ({
  className = "",
  size = 24,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path d="M18.54 9L8.88 3.46a3.42 3.42 0 0 0-5.13 3v11.12A3.42 3.42 0 0 0 7.17 21a3.43 3.43 0 0 0 1.71-.46L18.54 15a3.42 3.42 0 0 0 0-5.92Zm-1 4.19l-9.66 5.62a1.44 1.44 0 0 1-1.42 0a1.42 1.42 0 0 1-.71-1.23V6.42a1.42 1.42 0 0 1 .71-1.23A1.5 1.5 0 0 1 7.17 5a1.54 1.54 0 0 1 .71.19l9.66 5.58a1.42 1.42 0 0 1 0 2.46Z" />
    </svg>
  );
};

export const ReplayIcon: React.FC<IconProps> = ({
  className = "",
  size = 24,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path d="M12 5V1L7 6l5 5V7a6 6 0 0 1 6 6a6 6 0 0 1-6 6a6 6 0 0 1-6-6H4a8 8 0 0 0 8 8a8 8 0 0 0 8-8a8 8 0 0 0-8-8" />
    </svg>
  );
};

export function SunIcon({ className = "", size = 24 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      >
        <circle cx={12} cy={12} r={4}></circle>
        <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>
      </g>
    </svg>
  );
}

export function MoonIcon({ className = "", size = 24 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      >
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
      </g>
    </svg>
  );
}

export function DragHandleDotsIcon({ className = "", size = 15 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 15 15"
      className={className}
      fill="currentColor"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M5.5 4.625a1.125 1.125 0 1 0 0-2.25a1.125 1.125 0 0 0 0 2.25m4 0a1.125 1.125 0 1 0 0-2.25a1.125 1.125 0 0 0 0 2.25M10.625 7.5a1.125 1.125 0 1 1-2.25 0a1.125 1.125 0 0 1 2.25 0M5.5 8.625a1.125 1.125 0 1 0 0-2.25a1.125 1.125 0 0 0 0 2.25m5.125 2.875a1.125 1.125 0 1 1-2.25 0a1.125 1.125 0 0 1 2.25 0M5.5 12.625a1.125 1.125 0 1 0 0-2.25a1.125 1.125 0 0 0 0 2.25"
        clipRule="evenodd"
        strokeWidth={0.5}
        stroke="currentColor"
      ></path>
    </svg>
  );
}

export function CloseRoundedIcon({ className = "", size = 24 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path
        fill="currentColor"
        d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"
        strokeWidth={0.5}
        stroke="currentColor"
      ></path>
    </svg>
  );
}

export function HamburgerIcon({ className = "", size = 20 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      width={size}
      height={size}
      className={className}
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M3 4.75a.75.75 0 0 1 .75-.75h12.5a.75.75 0 0 1 0 1.5h-12.5a.75.75 0 0 1-.75-.75Z"
      />
      <path
        fillRule="evenodd"
        d="M3 10a.75.75 0 0 1 .75-.75h12.5a.75.75 0 0 1 0 1.5h-12.5a.75.75 0 0 1-.75-.75Z"
      />
      <path
        fillRule="evenodd"
        d="M3 15.25a.75.75 0 0 1 .75-.75h12.5a.75.75 0 0 1 0 1.5h-12.5a.75.75 0 0 1-.75-.75Z"
      />
    </svg>
  );
}
