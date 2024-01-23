export interface IPopulateConfig {
  admin_name: string;
  admin_username: string;
  admin_password: string;
  admin_email: string;

  class_name: string;
  class_code: string;
  class_grade: string;

  school_name: string;
  school_code: string;

  school_group_name: string;
  school_group_code: string;
}

const populateConfig: IPopulateConfig = {
  admin_name: 'Zeca Picodinho',
  admin_username: 'zecapicodinho',
  admin_password: 'Senha123@@...',
  admin_email: 'devs@picode.com',

  class_name: 'Turma PiCode',
  class_code: '3333',
  class_grade: '9',

  school_name: 'Escola PiCode',
  school_code: '2222',

  school_group_name: 'Instituição PiCode',
  school_group_code: '1111',
};

export default populateConfig;
