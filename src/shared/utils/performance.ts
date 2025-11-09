const perfMarks: Record<string, number> = {};

export function markStart(label: string): void {
  if (__DEV__) {
    perfMarks[label] = Date.now();
  }
}

export function markEnd(label: string): void {
  if (__DEV__) {
    const start = perfMarks[label];
    if (start) {
      const duration = Date.now() - start;
      console.log(`[Perf] ${label} carregado em ${duration} ms`);
      delete perfMarks[label];
    }
  }
}
