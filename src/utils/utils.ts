
/**
 * Joins two path strings
 * If the separator occurs at the concatenation boundary in either of the strings, it is removed to prevent duplication of the separator.
 *
 * @param {String} part1 First string.
 * @param {String|number} part2 Second string.
 *
 * @returns {String} Joined string.
 *
 * @example
 * ```ts
 * join('first/', '/second')
 * // -> 'first/second'
 * ```
 */
export function joinPath(part1: string, part2?: string | number): string {
  const separator = '/';

  if (!part2)
    return part1;

  const p1 = part1.endsWith(separator)
    ? part1.slice(0, -separator.length)
    : part1;

  let p2 = part2.toString();
  p2 = p2.startsWith(separator) ? p2.slice(separator.length) : p2;

  return p1 === '' || p2 === ''
    ? p1 + p2
    : p1 + separator + p2;
}
