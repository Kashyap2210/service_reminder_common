import {
  IEntityCreateDto,
  IEntityFilterData,
  IEntityUpdateDto,
} from "../../types";
import { EntityList, EntityType } from "../../utils";

export interface IUserCreateDto extends IEntityCreateDto<
  EntityType<EntityList.USER>
> {}

export interface IUserUpdateDto extends IEntityUpdateDto<
  EntityType<EntityList.USER>
> {}

export interface IUserSearchDto extends IEntityFilterData<
  EntityType<EntityList.USER>
> {}
