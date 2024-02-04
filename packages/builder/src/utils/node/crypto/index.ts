import crypto from 'node:crypto';

export const createHash = (...args: Parameters<typeof crypto.createHash>) => crypto.createHash.apply(crypto, args);
