import { ICreateUser } from '@modules/users/domain/models/ICreateUser';
import { IUser } from '@modules/users/domain/models/IUser';
import { IUserPaginate } from '@modules/users/domain/models/IUserPaginate';
import { IUserRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { getRepository, Like, Repository } from 'typeorm';
import User from '../entities/User';

export class UsersRepository implements IUserRepository {
  private ormRepository: Repository<User>;
  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findByName(name: string): Promise<IUser | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return user;
  }

  public async findById(id: string): Promise<IUser | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<IUser | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return user;
  }
  public async findAll(): Promise<IUser[]> {
    const users = await this.ormRepository.find();

    return users;
  }

  public async findAllPaginate(
    search: string,
    sortField: string,
  ): Promise<IUserPaginate> {
    if (search) {
      return (await this.ormRepository
        .createQueryBuilder()
        .where([{ name: Like(`%${search}%`) }, { email: Like(`${search}`) }])
        .orderBy('User.name', 'ASC')
        .paginate()) as IUserPaginate;
    }
    return (await this.ormRepository
      .createQueryBuilder()
      .orderBy('User.name', 'ASC')
      .paginate()) as IUserPaginate;
  }

  public async create({ name, email, password }: ICreateUser): Promise<IUser> {
    const user = this.ormRepository.create({
      name,
      email,
      password,
    });

    await this.ormRepository.save(user);

    return user;
  }
  public async save(user: IUser): Promise<IUser> {
    await this.ormRepository.save(user);
    return user;
  }
}

