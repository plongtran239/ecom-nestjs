import path from 'path';

export const UPLOAD_DIR = path.resolve('upload');

export const ALL_LANGUAGE_CODE = 'all';

export const ORDER_BY = {
  ASC: 'asc',
  DESC: 'desc',
} as const;

export const SORT_BY = {
  PRICE: 'price',
  CREATED_AT: 'createdAt',
  SALE: 'sale',
} as const;

export type OrderByType = (typeof ORDER_BY)[keyof typeof ORDER_BY];
export type SortByType = (typeof SORT_BY)[keyof typeof SORT_BY];
