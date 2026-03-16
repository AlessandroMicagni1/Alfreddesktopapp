/* ── macOS-style Dock Icon SVG Components ────────── */

import alfredLogo from "figma:asset/77695bebd8453aaf1b38066556539bdfe08c63ae.png";

export function AlfredIcon() {
  return (
    <div className="w-full h-full rounded-[inherit] bg-white flex items-center justify-center">
      <img
        src={alfredLogo}
        alt="Alfred"
        className="w-[78%] h-[78%] object-contain"
      />
    </div>
  );
}

export function MailIcon() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full">
      <defs>
        <linearGradient id="mail-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#54a8f7" />
          <stop offset="100%" stopColor="#1a73e8" />
        </linearGradient>
      </defs>
      <rect width="120" height="120" rx="26" fill="url(#mail-g)" />
      <rect x="24" y="38" width="72" height="48" rx="6" fill="white" opacity="0.95" />
      <path d="M24 44l36 24 36-24" fill="none" stroke="#1a73e8" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CalendarIcon() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full">
      <rect width="120" height="120" rx="26" fill="white" />
      <rect x="0" y="0" width="120" height="36" rx="26" fill="#ea4335" />
      <rect x="0" y="20" width="120" height="16" fill="#ea4335" />
      <text x="60" y="30" textAnchor="middle" fill="white" fontSize="13" fontWeight="600" fontFamily="Inter, system-ui">MON</text>
      <text x="60" y="86" textAnchor="middle" fill="#1a1a2e" fontSize="46" fontWeight="300" fontFamily="Inter, system-ui">16</text>
    </svg>
  );
}

export function NotesIcon() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full">
      <defs>
        <linearGradient id="notes-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      <rect width="120" height="120" rx="26" fill="url(#notes-g)" />
      <rect x="28" y="30" width="64" height="64" rx="5" fill="white" opacity="0.95" />
      <line x1="36" y1="48" x2="84" y2="48" stroke="#e5e5ea" strokeWidth="1.5" />
      <line x1="36" y1="58" x2="84" y2="58" stroke="#e5e5ea" strokeWidth="1.5" />
      <line x1="36" y1="68" x2="72" y2="68" stroke="#e5e5ea" strokeWidth="1.5" />
      <line x1="36" y1="78" x2="64" y2="78" stroke="#e5e5ea" strokeWidth="1.5" />
      <text x="40" y="46" fill="#1a1a2e" fontSize="9" fontWeight="500" fontFamily="Inter, system-ui" opacity="0.6">Notes</text>
    </svg>
  );
}

export function FinderIcon() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full">
      <defs>
        <linearGradient id="finder-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#60bfff" />
          <stop offset="100%" stopColor="#0091ea" />
        </linearGradient>
      </defs>
      <rect width="120" height="120" rx="26" fill="url(#finder-g)" />
      {/* Finder face */}
      <rect x="30" y="28" width="60" height="68" rx="8" fill="white" opacity="0.95" />
      {/* Left eye */}
      <ellipse cx="48" cy="56" rx="4" ry="8" fill="#0091ea" />
      {/* Right eye */}
      <ellipse cx="72" cy="56" rx="4" ry="8" fill="#0091ea" />
      {/* Nose line */}
      <path d="M60 50v22" stroke="#0091ea" strokeWidth="2.5" strokeLinecap="round" />
      {/* Mouth */}
      <path d="M44 78c4 4 12 6 16 6s12-2 16-6" fill="none" stroke="#0091ea" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function MessagesIcon() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full">
      <defs>
        <linearGradient id="msg-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5bf174" />
          <stop offset="100%" stopColor="#22a948" />
        </linearGradient>
      </defs>
      <rect width="120" height="120" rx="26" fill="url(#msg-g)" />
      <ellipse cx="60" cy="55" rx="30" ry="24" fill="white" opacity="0.95" />
      <path d="M48 74c-3 8-14 12-14 12s8-4 9-10" fill="white" opacity="0.95" />
    </svg>
  );
}

export function MusicIcon() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full">
      <defs>
        <linearGradient id="music-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fc5c7d" />
          <stop offset="100%" stopColor="#e8395a" />
        </linearGradient>
      </defs>
      <rect width="120" height="120" rx="26" fill="url(#music-g)" />
      {/* Note */}
      <circle cx="46" cy="76" r="10" fill="white" opacity="0.95" />
      <circle cx="74" cy="70" r="10" fill="white" opacity="0.95" />
      <rect x="54" y="32" width="4" height="44" rx="2" fill="white" opacity="0.95" />
      <rect x="82" y="28" width="4" height="42" rx="2" fill="white" opacity="0.95" />
      <path d="M56 34l28-6v6l-28 6z" fill="white" opacity="0.95" />
    </svg>
  );
}

export function PhotosIcon() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full">
      <defs>
        <linearGradient id="photo-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f5f5f7" />
          <stop offset="100%" stopColor="#e8e8ed" />
        </linearGradient>
      </defs>
      <rect width="120" height="120" rx="26" fill="url(#photo-g)" />
      {/* Flower petals */}
      <ellipse cx="60" cy="42" rx="10" ry="16" fill="#ff6b6b" />
      <ellipse cx="43" cy="54" rx="10" ry="16" fill="#ffa94d" transform="rotate(-72 43 54)" />
      <ellipse cx="48" cy="72" rx="10" ry="16" fill="#51cf66" transform="rotate(-144 48 72)" />
      <ellipse cx="72" cy="72" rx="10" ry="16" fill="#339af0" transform="rotate(-216 72 72)" />
      <ellipse cx="77" cy="54" rx="10" ry="16" fill="#cc5de8" transform="rotate(-288 77 54)" />
      <circle cx="60" cy="60" r="8" fill="#1a1a2e" />
    </svg>
  );
}

export function SettingsIcon() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full">
      <defs>
        <linearGradient id="set-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8e8e93" />
          <stop offset="100%" stopColor="#636366" />
        </linearGradient>
      </defs>
      <rect width="120" height="120" rx="26" fill="url(#set-g)" />
      <circle cx="60" cy="60" r="20" fill="none" stroke="white" strokeWidth="4" opacity="0.95" />
      <circle cx="60" cy="60" r="8" fill="white" opacity="0.95" />
      {/* Gear teeth */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <rect
          key={angle}
          x="57"
          y="34"
          width="6"
          height="12"
          rx="2"
          fill="white"
          opacity="0.95"
          transform={`rotate(${angle} 60 60)`}
        />
      ))}
    </svg>
  );
}