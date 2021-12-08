import { inject, injectable } from 'tsyringe';
import { IUser } from '../domain/models/IUser';
import { IUserRepository } from '../domain/repositories/IUsersRepository';

@injectable()
class ListUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository
  ) {}

  async execute(): Promise<IUser[]> {
    const users = await this.usersRepository.findAll();

    return users;
  }
}

export default ListUserService;
