export const regOnlyNumber = /\D/g;
export const getOnlyNumbers = (value?: string) => value?.replace(regOnlyNumber, '');

const numbersArr = new Set(['7', '8', '9', '1', '2', '3', '4', '5', '6', '0']);

export const phoneMask = (phone: string) => {
  if (!phone) return '';

  let numbersValue = getOnlyNumbers(phone) ?? '';

  if (numbersValue[0] === '9') numbersValue = `7${numbersValue}`;

  let firstSymbol = numbersValue[0];
  let formattedValue = '';

  if (numbersArr.has(firstSymbol)) {
    firstSymbol = '+7';
    formattedValue = `${firstSymbol} `;

    if (numbersValue.length > 1) {
      formattedValue += `(${numbersValue.slice(1, 4)}`;
    }

    if (numbersValue.length >= 5) {
      formattedValue += `) ${numbersValue.slice(4, 7)}`;
    }

    if (numbersValue.length >= 8) {
      formattedValue += `-${numbersValue.slice(7, 9)}`;
    }

    if (numbersValue.length >= 10) {
      formattedValue += `-${numbersValue.slice(9, 11)}`;
    }
  } else {
    // Not Russian phone number
    formattedValue = `${numbersValue.slice(0, 16)}`;
  }

  return formattedValue;
};
