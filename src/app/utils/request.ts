export const formatQueryString = (obj: object) => {
  let queryString = '?';
  Object.keys(obj).forEach( o => {
    if (obj[o]) { queryString += `${o}=${obj[o].toString()}&`; }
  });
  return queryString;
};
