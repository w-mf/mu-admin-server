import { createCipheriv, createDecipheriv } from 'crypto';
/**
 * aes加密
 * @param data 待加密内容
 * @param key 必须为32位私钥
 * @param iv 初始向量，可选
 * @returns {string}
 */
export async function aesEncryption(data, key, iv) {
  const clearEncoding = 'utf8';
  const cipherEncoding = 'base64';
  const cipherChunks = [];
  const cipher = createCipheriv('aes-256-cbc', key, iv);
  cipher.setAutoPadding(true);
  cipherChunks.push(cipher.update(data, clearEncoding, cipherEncoding));
  cipherChunks.push(cipher.final(cipherEncoding));
  return cipherChunks.join('');
}
/**
 * aes解密
 * @param data 待解密内容
 * @param key 必须为32位私钥
 * @param iv 初始向量，可选
 * @returns {string}
 */
export async function aesDecryption(data, key, iv) {
  if (!data) return '';
  const clearEncoding = 'utf8';
  const cipherEncoding = 'base64';
  const cipherChunks = [];
  const decipher = createDecipheriv('aes-256-cbc', key, iv);
  decipher.setAutoPadding(true);
  cipherChunks.push(decipher.update(data, cipherEncoding, clearEncoding));
  cipherChunks.push(decipher.final(clearEncoding));
  return cipherChunks.join('');
}

/**
 * 手机号加密
 * @param {string} mobile 手机号
 * @param {number} digit 加密位数，默认4
 * @returns {string}
 */
export function mobileEncryption(mobile: string | undefined, digit = 4) {
  const mobileArr = `${mobile || ''}`.split('') || [];

  if (mobileArr.length) {
    const startIndex = Math.floor(Math.floor(mobileArr.length / 2) - digit / 2);
    const endIndex = Math.floor(Math.floor(mobileArr.length / 2) + digit / 2);
    mobileArr.forEach((item, index) => (mobileArr[index] = index >= startIndex && index < endIndex ? '*' : item));
  }
  return mobileArr.join('');
}
