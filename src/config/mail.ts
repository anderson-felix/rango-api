export interface IMailConfig {
  defaults: {
    from: { email: string; name: string };
  };
}

const mailConfig: IMailConfig = {
  defaults: {
    from: { email: 'contato@darklabs.com.br', name: 'Dark Labs' },
  },
};

export default mailConfig;
