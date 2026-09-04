import { alt, contentType, renderOgImage, size } from "@/lib/og-image";

export const runtime = "nodejs";
export { alt, contentType, size };

export default function TwitterImage() {
  return renderOgImage();
}
