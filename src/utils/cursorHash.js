/**
 * Encode cursor using base64
 *
 * @param {string} cursor Cursor string
 *
 * @returns {string} Encode hash string
 */
export const toCursorHash = cursor => Buffer.from(cursor)
  .toString('base64');

/**
 * Decode cursorHash using base64
 *
 * @param {string} cursorHash Cursor hash string
 *
 * @returns {string} Decoded string
 */
export const fromCursorHash = cursorHash => Buffer.from(cursorHash, 'base64')
  .toString('ascii');
