import { User, Err } from './index';

export interface Auth {
  user?: User;
  userId?: string;
  token?: string ;
  err?: Err;
}
