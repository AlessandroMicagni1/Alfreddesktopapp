// Alfred logo as an inline SVG data URI — works in any environment (no figma:asset dependency)
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#6366f1"/>
      <stop offset="100%" stop-color="#818cf8"/>
    </linearGradient>
  </defs>
  <rect width="120" height="120" rx="26" fill="url(#bg)"/>
  <path d="M60 28L36 92h12.5l5-14h13l5 14H84L60 28zm-3.5 40L60 56.5l3.5 11.5H56.5z" fill="white" fill-opacity="0.95"/>
  <circle cx="60" cy="38" r="3.5" fill="white" fill-opacity="0.6"/>
</svg>`;

const encoded = typeof btoa !== "undefined"
  ? `data:image/svg+xml;base64,${btoa(svg)}`
  : `data:image/svg+xml,${encodeURIComponent(svg)}`;

export default encoded;
