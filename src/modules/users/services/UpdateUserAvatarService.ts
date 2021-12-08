import AppError from '@shared/errors/AppError';
import path from 'path';
import fs from 'fs';
import upload from '@config/upload';
import { IUpdateAvatar } from '../domain/models/IUpdateAvatar';
import { IUserRepository } from '../domain/repositories/IUsersRepository';
import { IUser } from '../domain/models/IUser';

class UpdateUserAvatarService {
  constructor(private usersRepository: IUserRepository){}

  public async execute({ user_id, avatarFilename }: IUpdateAvatar): Promise<IUser> {

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }
    if (user.avatar) {
      const avatarFilePath = path.join(upload.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(avatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(avatarFilePath);
      }
    }
    user.avatar = avatarFilename;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
