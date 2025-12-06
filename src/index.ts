export function xPix() {
  const root = document.documentElement;

  if ((root as any)._xpixInit) return;
  (root as any)._xpixInit = true;

  root.style.setProperty('--x', 'clamp(0px, calc((1 / 428) * 1vw * 100), 1px)');

  for (let i = 1; i <= 500; i++) {
    root.style.setProperty(`--x${i}`, `calc(var(--x) * ${i})`);
  }
}

export function x(value: number): string {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new Error(`x() expects a finite number, got ${value}`);
  }

  return `calc(var(--x) * ${value})`;
}
