type FuncType = <T>(array1: T[], array2: T[]) => T[];

/**
 * Returns all elements in array1 that do not belong to array2
 * @param array1 Array of elements
 * @param array2 Array of elements
 * @returns Difference between array1 and array2 (i.e. array1 - array2)
 */

export const getArrayDiff: FuncType = (array1, array2) =>
  array1.filter(e => !array2.includes(e));
