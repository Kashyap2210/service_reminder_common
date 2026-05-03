import { UserRole } from "../enums";
import { IUserEntity } from "../interfaces";
import { EntityList, IModelRelationConfig } from "../utils";
import { BaseEntityModel,  } from "./base.entity.model";

export class UserModel extends BaseEntityModel implements IUserEntity {
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

  protected constructor() {
    super();
  }

  static relations: Partial<
    Record<EntityList, IModelRelationConfig<EntityList.USER>>
  > = {};

  static populateFromEntity(entity: IUserEntity): UserModel {
    return Object.assign(new UserModel(), entity);
  }
}
