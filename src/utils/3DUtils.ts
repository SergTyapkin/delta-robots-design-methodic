export function rotate2D(x: number, y: number, degrees: number, x0: number=0, y0: number=0) {
  const rad = degrees / 180 * Math.PI;
  const adjusted_x = (x - x0);
  const adjusted_y = (y - y0);
  const cos_rad = Math.cos(rad);
  const sin_rad = Math.sin(rad);
  const qx = x0 + cos_rad * adjusted_x + sin_rad * adjusted_y;
  const qy = y0 + -sin_rad * adjusted_x + cos_rad * adjusted_y;

  return [qx, qy];
}

// -------
export function radToDeg(val: number): number {
  return val / Math.PI * 180;
}

export function degToRad(val: number): number {
  return val / 180 * Math.PI
}

// -------
export function triangleFromHeightPointToSide(side: number): number {
  return side / 2 * Math.tan(degToRad(30))
}

export function triangleFromHeightPointToVertex(side: number): number {
  return side / 2 / Math.cos(degToRad(30))
}
