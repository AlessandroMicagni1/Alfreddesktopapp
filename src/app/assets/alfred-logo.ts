// Alfred logo — uses the real imported logo asset from Figma
import logoImage from "figma:asset/77695bebd8453aaf1b38066556539bdfe08c63ae.png";

export default logoImage;

// Fallback path for production builds where figma:asset doesn't resolve
export const LOGO_FALLBACK = "/alfred-icon.svg";
