import { IPagingTypeORM } from '@shared/infra/http/middlewares/getPagingHandler';

export interface IPagingResponse<T> {
  results: T[];
  results_length: number;
  page: number;
  limit: number;
  pages: number;
  total: number;
}

export type FindAndCountResponse<T> = [T[], number];

export function formatPagingResponse<T>(
  paging: IPagingTypeORM,
  res: FindAndCountResponse<T>,
): IPagingResponse<T> {
  const [results, total] = res;
  const results_length = results.length;
  const limit = paging.take || total;
  const page = Math.ceil(Number(paging.skip) / Number(paging.take)) + 1 || 1;
  const pages = Math.ceil(total / Number(paging.take)) || 1;

  return { results, results_length, page, limit, pages, total };
}
