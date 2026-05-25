import { UserStatus } from "../../enums";
import {
  IEntityCreateDto,
  IEntityFilterData,
  IEntityUpdateDto,
} from "../../types";
import { EntityList, EntityType } from "../../utils";

export type IUserDtoExclude = "status" | "role";
export interface IUserCreateDto extends Omit<
  IEntityCreateDto<EntityType<EntityList.USER>>,
  IUserDtoExclude
> {}

export interface IUserUpdateDto extends Omit<
  IEntityUpdateDto<EntityType<EntityList.USER>>,
  IUserDtoExclude
> {
  status?: UserStatus;
}

export interface IUserSearchDto extends IEntityFilterData<
  EntityType<EntityList.USER>
> {}
