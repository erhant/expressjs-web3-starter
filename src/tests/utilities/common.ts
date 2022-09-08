/**
 * Randomly generate a string of given length with given characters
 * @param length number of characters
 * @param chars alphabet to be used, as a string
 */
export function generateString(
  length: number,
  chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
): string {
  let result = '';
  for (let i = 0; i < length; ++i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}
