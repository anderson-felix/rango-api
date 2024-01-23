import { Request, Response } from 'express';
import { Container } from 'typedi';

import {
  AuthenticateUserService,
  CreateUserService,
  UpdateUserPasswordService,
  CheckUserPasswordService,
  ShowUserProfileService,
  UpdateUserProfileService,
  ValidateUserService,
  GoogleAuthenticationService,
  CheckUserEmailService,
} from '@modules/user/services/user';

export default class UserController {
  public static async session(req: Request, res: Response): Promise<Response> {
    const service = Container.get(AuthenticateUserService);

    const response = await service.execute(req.body);

    return res.json(response);
  }

  public static async googleSession(req: Request, res: Response): Promise<Response> {
    const service = Container.get(GoogleAuthenticationService);

    const response = await service.execute(req.body);

    return res.json(response);
  }

  public static async register(req: Request, res: Response): Promise<Response> {
    const service = Container.get(CreateUserService);

    const response = await service.execute({ ...req.body });

    return res.json(response);
  }

  public static async checkEmail(req: Request, res: Response): Promise<Response> {
    const service = Container.get(CheckUserEmailService);

    const response = await service.execute(req.params.email);

    return res.json(response);
  }

  public static async updateMe(req: Request, res: Response): Promise<Response> {
    const service = Container.get(UpdateUserProfileService);

    const response = await service.execute({ ...req.body, user: req.user });

    return res.json(response);
  }

  public static async updatePassword(req: Request, res: Response): Promise<Response> {
    const service = Container.get(UpdateUserPasswordService);
    const response = await service.execute({ ...req.body, user: req.user });

    return res.json(response);
  }

  public static async getProfile(req: Request, res: Response): Promise<Response> {
    const service = new ShowUserProfileService();

    const response = await service.execute(req.user);

    return res.json(response);
  }

  public static async validate(req: Request, res: Response): Promise<Response> {
    const service = Container.get(ValidateUserService);

    const response = await service.execute(req.user);

    return res.json(response);
  }

  public static async checkPassword(req: Request, res: Response) {
    const service = Container.get(CheckUserPasswordService);

    const response = await service.execute({ email: req.user.email, password: req.params.password });

    return res.json(response);
  }
}
