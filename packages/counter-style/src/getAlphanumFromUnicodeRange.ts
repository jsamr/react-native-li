/**
 *
 * @param index - The index to render.
 * @param baseCharcode - The original unicode.
 * @param modulo - The number of symbols in the set.
 * @param alpha - In alpha mode, index starts at 1 instead of 0.
 * @returns
 */
export default function getAlphanumFromUnicodeRange(
  index: number,
  baseCharcode: number,
  modulo: number,
  alpha: boolean
): string {
  const reindex = index - Number(alpha);
  if (reindex < modulo) {
    return String.fromCharCode(baseCharcode + reindex);
  }
  const rest = reindex % modulo;
  const next = (reindex - rest - modulo) / modulo + 1;
  return (
    getAlphanumFromUnicodeRange(next, baseCharcode, modulo, alpha) +
    String.fromCharCode(baseCharcode + rest)
  );
}
