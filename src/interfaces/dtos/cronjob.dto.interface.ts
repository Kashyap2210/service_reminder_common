import {
  IEntityCreateDto,
  IEntityFilterData,
  IEntityUpdateDto,
} from "../../types";
import { EntityList, EntityType } from "../../utils";

export interface ICronJobCreateDto extends IEntityCreateDto<
  EntityType<EntityList.CRONJOB>
> {}

export interface ICronJobUpdateDto extends IEntityUpdateDto<
  EntityType<EntityList.CRONJOB>
> {}

export interface ICronJobSearchDto extends IEntityFilterData<
  EntityType<EntityList.CRONJOB>
> {}
