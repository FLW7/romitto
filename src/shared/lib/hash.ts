import * as crypto from 'crypto-js';

import { getOnlyNumbers } from '@/shared/lib/phone-mask';

export const TOKEN = process.env.NEXT_PUBLIC_TOKEN_HASH ?? '';

export const getCurrentTimestamp = (): number => {
  return Math.floor(Date.now() / 1000);
};
export function generateSha512(data: string): string {
  const hash = crypto.SHA512(data);

  return hash.toString();
}

export const getHash = (phone: string) => {
  const clearNumbers = getOnlyNumbers(phone);

  const temp = getCurrentTimestamp();

  const data = `${TOKEN}_+_+${clearNumbers}_+_${temp}_+_`;

  const hashValue = generateSha512(data);

  return { hashValue, temp, clearNumbers };
};
