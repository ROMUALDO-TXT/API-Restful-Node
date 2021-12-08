import auth from '@config/auth';
import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { Secret, sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import {
  ICreateSessionRequest,
  ICreateSessionResponse,
} from '../domain/models/ICreateSession';
import { IUserRepository } from '../domain/repositories/IUsersRepository';

@injectable()
class CreateSessionService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository
  ) {}

  public async execute({
    email,
    password,
  }: ICreateSessionRequest): Promise<ICreateSessionResponse> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Email e/ou senha incorretos!');
    }

    const passwordConfirmed = compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Email e/ou senha incorretos!');
    }

    const token = sign({}, auth.jwt.secret as Secret, {
      subject: user.id,
      expiresIn: auth.jwt.expiresIn,
    });

    return { user, token };
  }
}

export default CreateSessionService;
