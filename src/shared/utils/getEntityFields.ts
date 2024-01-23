import { getMetadataArgsStorage } from 'typeorm';

type FuncType = (entity: Object) => string[];

export const getEntityFields: FuncType = entity => {
  const metadataArgsStorage = getMetadataArgsStorage();

  const columns = metadataArgsStorage.columns.filter(column => column.target === entity);

  const columnNames = columns.map(column => column.propertyName);

  return columnNames;
};
