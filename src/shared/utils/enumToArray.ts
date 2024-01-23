export const enumToArray = (enumeration: Record<string, string>) =>
  Object.keys(enumeration)
    .filter(key => Number.isNaN(Number(key)))
    .map(key => enumeration[key]);
