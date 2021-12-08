import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import { ICreateUser } from '../domain/models/ICreateUser';
import { IUser } from '../domain/models/IUser';
import { IUserRepository } from '../domain/repositories/IUsersRepository';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository
  ) {}

  
  public async execute({
    name,
    email,
    password,
  }: ICreateUser): Promise<IUser | undefined> {
    const emailExists = await this.usersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email alreeady in use!');
    }

    const hashedPassword = await hash(password, 8);

    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
