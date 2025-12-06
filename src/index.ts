function set(max: number) {
  document.documentElement.style.setProperty('--x', 'clamp(0px, calc((1 / 428) * 1vw * 100), 1px)');

  if (max > 0) {
    for (let i = 1; i <= max; i++) {
      document.documentElement.style.setProperty(`--x${i}`, `calc(var(--x) * ${i})`);
    }
  }
}

export function x(value: number): string {
  if (typeof value !== 'number') {
    throw new Error(`x() expects a number, got ${value}`);
  }

  return `calc(var(--x) * (${value} * 1))`;
}

export function xPix(max: number = 0) {
  if (max < 0) max = 0;

  set(max);
}
