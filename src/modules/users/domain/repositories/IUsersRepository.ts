import { ICreateUser } from "../models/ICreateUser";
import { IUser } from "../models/IUser";
import { IUserPaginate } from "../models/IUserPaginate";

export interface IUserRepository{
    findById(id: string): Promise<IUser | undefined>;
    findByEmail(email: string): Promise<IUser | undefined>;
    findByName(name: string): Promise<IUser | undefined>;
    findAll(): Promise<IUser[]>;
    findAllPaginate(search: string, sortField: string): Promise<IUserPaginate>;
    create(data: ICreateUser): Promise<IUser>
    save(user: IUser): Promise<IUser>
}