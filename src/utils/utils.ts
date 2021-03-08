
/**
 * Joins two path strings
 * If the separator occurs at the concatenation boundary in either of the strings, it is removed to prevent duplication of the separator.
 *
 * @param {String} part1 First string.
 * @param {String} part2 Second string.
 *
 * @returns {String} Joined string.
 *
 * @example
 * ```ts
 * join('first/', '/second')
 * // -> 'first/second'
 * ```
 */
export function joinPath(part1: string, part2: string): string {
  const separator = '/';
  const p1 = part1.endsWith(separator)
    ? part1.slice(0, -separator.length)
    : part1;
  const p2 = part2.startsWith(separator)
    ? part2.slice(separator.length)
    : part2;
  return p1 === '' || p2 === ''
    ? p1 + p2
    : p1 + separator + p2;
}