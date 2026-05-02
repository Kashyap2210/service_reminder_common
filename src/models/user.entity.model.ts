import { UserRole } from "../enums";
import { IUserEntity } from "../interfaces";

export class UserModel implements IUserEntity {
  id: number = 0;
  name: string = "";
  contactNo: string = "";
  email: string = "";
  password: string = "";
  role: UserRole = UserRole.USER;

  createdOn: number = 0;
  updatedOn: number = 0;
  createdBy: number = 0;
  updatedBy: number = 0;

  private constructor() {}

  static populateFromEntity(entity: IUserEntity): UserModel {
    return Object.assign(new UserModel(), entity);
  }
}
