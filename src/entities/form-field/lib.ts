import { type HTMLInputTypeAttribute } from 'react';

import { phoneMask } from '../../shared/lib/phone-mask';

interface getValueForTypeProperties {
  type?: HTMLInputTypeAttribute;
  value?: string;
}

export function getValueForType({ value, type }: getValueForTypeProperties) {
  if (type === 'tel') return phoneMask(value ?? '');

  return value;
}
