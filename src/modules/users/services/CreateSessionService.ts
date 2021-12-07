import auth from '@config/auth';
import User from '@modules/users/infra/typeorm/entities/User';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { Secret, sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import { ICreateSessionRequest, ICreateSessionResponse } from '../domain/models/ICreateSession';


class CreateSessionService {
  public async execute({ email, password }: ICreateSessionRequest): Promise<ICreateSessionResponse> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findByEmail(email);
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
