export function extractPhoneNumber(str: string): string | null {
  const phoneRegex = /(\+\d{1,2}\s?)?1?-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/g;
  const match = str.match(phoneRegex);

  return match ? match[0] : null;
}
