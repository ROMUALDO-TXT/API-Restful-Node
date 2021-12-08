import { Request, Response } from 'express';
import UpdateUserAvatarService from '../../../services/UpdateUserAvatarService';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateAvatar = container.resolve(UpdateUserAvatarService);
    const {user_id} = request.body;
    const filename = request.file?.filename;
    const user = updateAvatar.execute({
      user_id: user_id,
      avatarFilename: filename,
    });

    return response.json(classToClass(user));
  }
}
