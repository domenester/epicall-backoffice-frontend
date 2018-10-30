import { postgreeIntervalMask } from './date';

export const postgreeIntervalSort = (direction, a, b) => {
  if (direction === 1) { return postgreeIntervalMask(a) < postgreeIntervalMask(b); }
  if (direction === -1) { return postgreeIntervalMask(b) < postgreeIntervalMask(a); }
};

export const postgreeValuePrepareFunction = (data) => postgreeIntervalMask(data);

export const postgreeFilter = (data, search) => postgreeIntervalMask(data).indexOf(search) > -1;
