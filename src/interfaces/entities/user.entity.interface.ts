import { UserRole, UserStatus } from "../../enums";
import { IAuditColumnEntity } from "../../helpers";

export interface IUserEntity extends IAuditColumnEntity {
  id: number;
  name: string;
  contactNo: string;
  email: string;
  password: string;
  role: UserRole;
  status: UserStatus;
}
