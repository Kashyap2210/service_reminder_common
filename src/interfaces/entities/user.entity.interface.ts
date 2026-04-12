import { UserRole } from "../../enums";
import { IAuditColumnEntity } from "../../helpers";
import { Nullable } from "../../types";

export interface IUserEntity extends IAuditColumnEntity {
  id: number;
  name: string;
  contactNo: string;
  email: string;
  password: string;
  role: UserRole;
}
