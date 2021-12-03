import { Request, Response } from "express";
import CreateUserService from "../services/createUsers/CreateUserService";
import ListUserService from "../services/listUsers/ListUserService";


export default class UserController{
  
  public async index(request: Request, response: Response): Promise<Response> {
     const listUsers = new ListUserService()

     const users = await listUsers.execute();

    return response.json(users);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {name, email, password} = request.body;
    const createUser = new CreateUserService();

    const user = createUser.execute({
      name,
      email,
      password,
    });

    return response.json(user);
  }
}
