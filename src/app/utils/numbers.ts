export const padNumber = (value: number) => {
  if (isNumber(value)) {
      return `0${value}`.slice(-2);
  } else {
      return '';
  }
};

export const isNumber = (value: any): boolean => {
  return !isNaN(toInteger(value));
};

export const toInteger = (value: any): number => {
  return parseInt(`${value}`, 10);
};
