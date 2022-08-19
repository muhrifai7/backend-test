import { RoleType } from '../typeorm/entities/users/userTypes';

export type JwtPayload = {
  id: number;
  username: string;
  email: string;
  role: RoleType;
  created_at: Date;
};
