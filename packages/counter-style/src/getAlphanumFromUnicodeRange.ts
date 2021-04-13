function getAlphanumFromUnicodeRange(
  index: number,
  baseCharcode: number,
  modulo: number,
  alpha: true
): string | undefined;
function getAlphanumFromUnicodeRange(
  index: number,
  baseCharcode: number,
  modulo: number,
  alpha: false
): string;
/**
 * Create an alphabetic initial counter representation from an UTF-16 unicode
 * and a range.
 *
 * @param index - The index to render.
 * @param baseCharcode - The original UTF-16 unicode.
 * @param modulo - The number of symbols in the set.
 * @param alpha - In alpha mode, index starts at 1 instead of 0.
 * @returns
 */
function getAlphanumFromUnicodeRange(
  index: number,
  baseCharcode: number,
  modulo: number,
  alpha: boolean
): string | undefined {
  const reindex = index - Number(alpha);
  if (reindex < 0) {
    return undefined;
  }
  if (reindex < modulo) {
    return String.fromCharCode(baseCharcode + reindex);
  }
  const rest = reindex % modulo;
  const next = (reindex - rest - modulo) / modulo + 1;
  return (
    getAlphanumFromUnicodeRange(next, baseCharcode, modulo, alpha as true) +
    String.fromCharCode(baseCharcode + rest)
  );
}

export default getAlphanumFromUnicodeRange;
