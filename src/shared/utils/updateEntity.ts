export const updateEntity = <T>(entity: T, params: Partial<T>): void =>
  Object.keys(params).forEach(k => {
    const key = k as keyof T;
    const value = params[key] as T[keyof T];

    if ((entity[key] && value) !== undefined) entity[key] = value;
  });
