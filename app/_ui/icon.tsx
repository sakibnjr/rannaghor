const paths = {
  home: "M3 10.5 12 2l9 8.5V22h-6v-7H9v7H3Z",
  search: "M10 2a8 8 0 1 0 4.9 14.3l5.4 5.4 2.1-2.1-5.4-5.4A8 8 0 0 0 10 2Zm0 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z",
  account: "M12 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10ZM3 21a9 9 0 0 1 18 0v1H3Z",
  cart: "M1 2h4l1 3h16l-3 10H8l.5 2H20v2H7L3 5H1Zm9 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z",
  menu: "M3 4h18v3H3Zm0 7h18v3H3Zm0 7h18v3H3Z",
  close: "m6 3 6 6 6-6 3 3-6 6 6 6-3 3-6-6-6 6-3-3 6-6-6-6Z",
  plus: "M10 3h4v7h7v4h-7v7h-4v-7H3v-4h7Z",
  minus: "M3 10h18v4H3Z",
  arrow: "m14 3 9 9-9 9v-7H2v-4h12Z",
  left: "m15 3-9 9 9 9 3-3-6-6 6-6Z",
  right: "m9 3 9 9-9 9-3-3 6-6-6-6Z",
  pin: "M12 1a8 8 0 0 0-8 8c0 6 8 14 8 14s8-8 8-14a8 8 0 0 0-8-8Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z",
  phone: "M5 2h4l2 6-3 2a15 15 0 0 0 6 6l2-3 6 2v4a3 3 0 0 1-3 3A19 19 0 0 1 2 5a3 3 0 0 1 3-3Z",
  mail: "M2 4h20v16H2Zm2 3v1l8 5 8-5V7l-8 5Z",
  clock: "M12 1a11 11 0 1 0 0 22 11 11 0 0 0 0-22ZM11 5h2v6h5v2h-7Z",
  check: "m9 15 11-11 3 3L9 21 1 13l3-3Z",
  delivery: "M1 4h13v12h-3a4 4 0 0 0-7 0H1Zm14 4h5l4 5v5h-2a4 4 0 0 0-7-2Zm2 2v3h4l-2-3ZM7.5 16a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm11 0a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z",
  leaf: "M22 2C10 0 2 4 3 13c.2 2 1 3 2 4l10-9-8 11c6 4 16-1 15-17ZM2 23l5-4-2-2-5 4Z",
  chef: "M8 3a5 5 0 0 1 8 0 5 5 0 0 1 4 9v5H4v-5a5 5 0 0 1 4-9ZM4 19h16v3H4Z",
  mobile: "M6 1h12a2 2 0 0 1 2 2v18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2Zm1 3v13h10V4Zm4 15v2h2v-2Z",
  cloche: "M10 2h4v3h-4ZM2 17a10 10 0 0 1 20 0ZM1 19h22v3H1Z",
  heart: "M12 22 3 13C-4 6 6-3 12 5c6-8 16 1 9 8Z",
  star: "m12 1 3.4 7 7.6 1.1-5.5 5.4 1.3 7.5-6.8-3.6L5.2 22l1.3-7.5L1 9.1 7.6 8Z",
  directions: "m12 1 11 11-11 11L1 12Zm2 6v3H8v7h3v-4h3v3l5-4.5Z",
  facebook: "M14 23V13h3l.5-4H14V7c0-1 .5-2 2-2h2V1h-3c-4 0-6 2-6 6v2H6v4h3v10Z",
  instagram: "M6 1h12a5 5 0 0 1 5 5v12a5 5 0 0 1-5 5H6a5 5 0 0 1-5-5V6a5 5 0 0 1 5-5Zm6 5a6 6 0 1 0 0 12 6 6 0 0 0 0-12Zm0 3a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm6-5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z",
  youtube: "M5 3h14a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H5a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm5 4v10l8-5Z",
  tiktok: "M13 1h4c0 3 2 5 5 5v4c-2 0-4-.6-5-1.5V17a6 6 0 1 1-7-6v4a2 2 0 1 0 3 2Z",
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, className = "size-5" }: { name: IconName; className?: string }) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="currentColor" className={`shrink-0 ${className}`}>
      <path d={paths[name]} fillRule="evenodd" clipRule="evenodd" />
    </svg>
  );
}
