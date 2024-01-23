declare namespace Express {
  export interface Request {
    language: import('@shared/errors/localeErrors').LocaleErrorLanguage;
    paging: import('@shared/infra/http/middlewares/getPagingHandler').IPagingTypeORM;
    user: import('@modules/user/infra/typeorm/entities/User').User;
  }
}
