export function deleteFirstKey(obj: Record<string, any>): Record<string, any> | object {
  const objCopy = { ...obj };
  const firstKey = Object.keys(objCopy)[0];

  if (firstKey) {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete objCopy[firstKey];

    return objCopy;
  }

  return {};
}
