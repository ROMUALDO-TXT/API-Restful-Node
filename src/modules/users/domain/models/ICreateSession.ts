import { IUser } from './IUser';

interface ICreateSessionRequest {
  email: string;
  password: string;
}
interface ICreateSessionResponse {
  user: IUser;
  token: string;
}
export { ICreateSessionRequest, ICreateSessionResponse };
