import { createHmac } from 'crypto';

export const toBase64 = string => {
  return Buffer.from(string)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
};

export const decodeHex = hex => Buffer.from(hex, 'hex');

export const sign = (str, salt, key) => {
  const hmac = createHmac('sha256', decodeHex(key));
  hmac.update(decodeHex(salt));
  hmac.update(str);
  return toBase64(hmac.digest());
};

export const stripTrailingSlash = str =>
  str.endsWith('/') ? str.slice(0, -1) : str;

export const stripLeadingSlash = str =>
  str.startsWith('/') ? str.slice(1) : str;

export const compose = (...args) =>
  args
    .map((path = '') => stripLeadingSlash(stripTrailingSlash(path)))
    .filter(path => !!path)
    .join('/');

export default { compose, sign, toBase64 };
