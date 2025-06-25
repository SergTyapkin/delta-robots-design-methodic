export function diff<T>(arr: T[]): T[] {
  return arr
    .map((val, i) => {
      if (val instanceof Object) {
        const res: {[key: string]: number} = {};
        Object.entries(val).forEach(([key, val]) => {
          res[key] = i + 1 < arr.length ? (arr[i+1] as {[key: string]: number})[key] - val : NaN;
        });
        return res as unknown as T;
      }
      return (i + 1 < arr.length ? (arr[i+1] as number) - (val as number) : NaN) as unknown as T;
    })
    .slice(0, -1);
}

export function cross3(a: number[], b: number[]) {
  const rx = a[1] * b[2] - a[2] * b[1];
  const ry = a[2] * b[0] - a[0] * b[2];
  const rz = a[0] * b[1] - a[1] * b[0];
  return [rx, ry, rz];
}

export function dot3(a: number[], b: number[]) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

export function norm(vector: number[]): number {
  let length = 0;
  vector.forEach(arg => {
    length += arg * arg;
  })
  return Math.sqrt(length);
}

export function normalize(vector: number[]): number[] {
  const length = norm(vector);
  return vector.map(arg => arg / length);
}
