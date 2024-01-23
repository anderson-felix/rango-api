export type LocaleErrorType =
  | 'invalidToken'
  | 'userNotFound'
  | 'missingToken'
  | 'invalidLogin'
  | 'userNotAuthorized'
  | 'operationNotPermitted'
  | 'userAlreadyExists'
  | 'emailAlreadyExists'
  | 'passwordDoesNotMatch'
  | 'tokenExpired'
  | 'invalidRecoveryToken'
  | 'userTemporarilyDisabled'
  | 'fileNameRequired'
  | 'contentTypeRequired'
  | 'incorrectPassword'
  | 'invalidFileType'
  | 'googleAuthFailure'
  | 'storeNotFound'
  | 'storeMenuItemNotFound';

export const localeErrorLanguage = <const>['pt', 'en'];

export type LocaleErrorLanguage = (typeof localeErrorLanguage)[number];

export const defaultLocaleErrorLanguage: LocaleErrorLanguage = 'pt';

export type LocaleErrorMessage = Record<LocaleErrorLanguage, string>;

export type LocaleErrorObject = { status: number; message: LocaleErrorMessage };

export const localeErrors: Record<LocaleErrorType, LocaleErrorObject> = {
  invalidToken: {
    status: 401,
    message: {
      pt: 'Token JWT inválido',
      en: 'Invalid JTW token',
    },
  },
  userNotFound: {
    status: 404,
    message: {
      pt: 'Usuário não encontrado',
      en: 'User not found',
    },
  },
  missingToken: {
    status: 401,
    message: {
      pt: 'Token JWT faltando',
      en: 'Missing JWT token',
    },
  },
  invalidLogin: {
    status: 401,
    message: {
      pt: 'Nome de usuário e/ou senha incorretos',
      en: 'Incorrect username/password combination',
    },
  },
  userNotAuthorized: {
    status: 401,
    message: {
      pt: 'Usuário não autorizado',
      en: 'User not authorized',
    },
  },
  operationNotPermitted: {
    status: 403,
    message: {
      pt: 'Operação não permitida',
      en: 'Operation not permitted',
    },
  },
  userAlreadyExists: {
    status: 403,
    message: {
      pt: 'Usuário já cadastrado',
      en: 'User already exists',
    },
  },
  emailAlreadyExists: {
    status: 403,
    message: {
      pt: 'Este email já existe',
      en: 'This email already exists',
    },
  },
  passwordDoesNotMatch: {
    status: 403,
    message: {
      pt: 'A senha não corresponde',
      en: 'Password does not match',
    },
  },
  incorrectPassword: {
    status: 403,
    message: {
      pt: 'Senha incorreta',
      en: 'Incorrect password',
    },
  },
  tokenExpired: {
    status: 403,
    message: {
      pt: 'Token expirado',
      en: 'Token expired',
    },
  },
  invalidRecoveryToken: {
    status: 403,
    message: {
      pt: 'Esse token é inválido',
      en: 'This token is invalid',
    },
  },
  userTemporarilyDisabled: {
    status: 403,
    message: {
      pt: 'Usuário desabilitado temporariamente',
      en: 'User temporarily disabled',
    },
  },
  fileNameRequired: {
    status: 400,
    message: {
      pt: 'O nome do arquivo é obrigatório',
      en: 'The file name is required',
    },
  },
  contentTypeRequired: {
    status: 400,
    message: {
      pt: 'O tipo do arquivo é obrigatório',
      en: 'The file content type is required',
    },
  },
  invalidFileType: {
    status: 400,
    message: {
      pt: 'Formato de arquivo inválido',
      en: 'Invalid file format',
    },
  },
  googleAuthFailure: {
    status: 401,
    message: {
      pt: 'Ocorreu um erro ao logar com o google',
      en: 'An error occurred while signing in to Google',
    },
  },
  storeNotFound: {
    status: 404,
    message: {
      pt: 'Loja não encontrada',
      en: 'Store not found',
    },
  },
  storeMenuItemNotFound: {
    status: 404,
    message: {
      pt: 'Item do cardápio não encontrado',
      en: 'Menu item not found',
    },
  },
};
