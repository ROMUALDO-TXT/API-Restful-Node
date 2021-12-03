import User from "@modules/users/typeorm/entities/User";
import UsersRepository from "@modules/users/typeorm/repositories/UsersRepository";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import path from 'path';
import fs from 'fs';
import upload from "@config/upload";


interface IRequest {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService{
  public async execute({user_id, avatarFilename}: IRequest): Promise<User>{
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(user_id);

    if(!user){
      throw new AppError('User not found.');
    }
    if(user.avatar){
      const avatarFilePath = path.join(upload.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(avatarFilePath)

      if(userAvatarFileExists){
        await fs.promises.unlink(avatarFilePath);
      }
    }
    user.avatar = avatarFilename;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
