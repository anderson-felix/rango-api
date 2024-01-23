/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction, request } from 'express';
import { Between, Equal, LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual, Like, Not, ILike, IsNull } from 'typeorm';

export const pagingOrder = <const>['ASC', 'DESC'];
type PagingOrder = (typeof pagingOrder)[number];

export interface IPagingRequestQuery {
  page?: number;
  limit?: number;
  sort?: string;
  order?: PagingOrder;
  [key: string]: any;
}

export interface IPagingTypeORM {
  order?: Record<string, PagingOrder>;
  skip?: number;
  take?: number;
  where: Record<string, any>;
  [x: string]: any;
}

const typeORMFilters: Record<string, any> = {
  /* CASE-SENSITIVE string operations */
  equal: Equal,
  not: Not,
  start: (value: string) => Like(`${value}%`),
  end: (value: string) => Like(`%${value}`),
  has: (value: string) => Like(`%${value}%`),

  /* CASE-INSENSITIVE string operations */
  iequal: ILike,
  inot: (value: string) => Not(ILike(value)),
  istart: (value: string) => ILike(`${value}%`),
  iend: (value: string) => ILike(`%${value}`),
  ihas: (value: string) => ILike(`%${value}%`),

  /* NUMBER operations */
  more: MoreThan,
  less: LessThan,
  min: MoreThanOrEqual,
  max: LessThanOrEqual,
  between: (value: string) => {
    const range = value.split(',');
    return range.length === 2 ? Between(range[0], range[1]) : Equal(value);
  },

  /* NULL operations */
  null: (value: string) => (value.toLocaleLowerCase() === 'true' ? IsNull() : Not(IsNull())),

  /* OTHER operations */
  _default: Equal,
};

const getFilterByName = (name: string, value: string) => {
  const [column, filter] = name.split('.');

  const filterOperation = typeORMFilters[filter] || typeORMFilters._default;

  return { [column]: filterOperation(value) };
};

const getColumnsFilter = (paging: IPagingRequestQuery) => {
  const filter: Record<string, any> = {};
  const reservedNames = ['page', 'limit', 'sort', 'order'];

  Object.keys(paging)
    .filter(name => !reservedNames.includes(name))
    .forEach(name => {
      const valueString = Array.isArray(paging[name]) ? paging[name].join(',') : String(paging[name]);
      Object.assign(filter, getFilterByName(name, valueString));
    });

  return filter;
};

export const formatTypeORMPaging = (paging: IPagingRequestQuery): IPagingTypeORM => {
  const filter: IPagingTypeORM = { where: {} };
  const order = { [paging.sort || '']: paging.order || 'ASC' };
  const take = Number(paging.limit);
  const skip = (Number(paging.page) - 1) * take;

  if (paging.sort) filter.order = order;
  if (take) filter.take = take;
  if (skip) filter.skip = skip;

  filter.where = getColumnsFilter(paging);

  return filter;
};

export function getPagingHandler() {
  return async (req: Request, _: Response, next: NextFunction) => {
    if (req.query.order) req.query.order = req.query.order.toString().toLocaleUpperCase();

    request.paging = formatTypeORMPaging(req.query);

    next();
  };
}
