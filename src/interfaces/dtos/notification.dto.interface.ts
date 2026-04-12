import {
  IEntityCreateDto,
  IEntityFilterData,
  IEntityUpdateDto,
} from "../../types";
import { EntityList, EntityType } from "../../utils";

export interface INotificationCreateDto extends IEntityCreateDto<
  EntityType<EntityList.NOTIFICATION>
> {}

export interface INotificationUpdateDto extends IEntityUpdateDto<
  EntityType<EntityList.NOTIFICATION>
> {}

export interface INotificationSearchDto extends IEntityFilterData<
  EntityType<EntityList.NOTIFICATION>
> {}
