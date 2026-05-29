// Placeholder de desenfoque celeste reutilizable para next/image (prop blurDataURL).
// Es un degradado diminuto en base64 — coherente con la atmósfera "Luz y cielo".
export const BLUR =
  "data:image/svg+xml;base64," +
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#eaf6fd"/><stop offset="1" stop-color="#8ac7ea"/></linearGradient></defs><rect width="8" height="8" fill="url(#g)"/></svg>`,
  ).toString("base64");
