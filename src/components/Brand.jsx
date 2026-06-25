export default function Brand({ homeLabel, subtitle }) {
  return (
    <a className="brand" href="#top" aria-label={homeLabel}>
      <svg className="brand-mark" viewBox="0 0 44 40" aria-hidden="true">
        <path className="brand-mark-main" d="M5 8h9.8L22 29.2 32.2 8H41L25.6 36h-8.2L5 8Z" />
        <path className="brand-mark-cut" d="M14.8 8H25l-4.3 8.5h-2.9L14.8 8Z" />
        <path className="brand-mark-accent" d="M4 4h13.5l-3.7 3H4V4Z" />
      </svg>
      <span className="brand-wordmark">
        <strong>Ventor Digital</strong>
        <small>{subtitle}</small>
      </span>
    </a>
  );
}
