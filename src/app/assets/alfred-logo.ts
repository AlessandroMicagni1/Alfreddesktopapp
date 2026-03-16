// Alfred logo — inline SVG data URI (works in all build environments)
const alfredLogo = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none">
  <rect width="512" height="512" rx="112" fill="#000"/>
  <g transform="translate(80,60) scale(2.05)">
    <path d="M90 20C85 20 55 85 40 130c-2 6-5 10-10 10H20c-5 0-8-4-6-10L70 10c3-7 8-10 15-10h10c7 0 12 3 15 10l38 85s-8-5-18-5c-5 0-10 2-14 6L90 20z" fill="#fff" fill-opacity=".95"/>
    <path d="M48 110c7-10 27-15 47-15 5 0 10 1 13 3" stroke="#fff" stroke-opacity=".95" stroke-width="10" stroke-linecap="round" fill="none"/>
    <circle cx="130" cy="120" r="22" stroke="#fff" stroke-opacity=".95" stroke-width="10" fill="none"/>
    <line x1="147" y1="137" x2="165" y2="155" stroke="#fff" stroke-opacity=".95" stroke-width="10" stroke-linecap="round"/>
  </g>
</svg>`)}`;

export default alfredLogo;
