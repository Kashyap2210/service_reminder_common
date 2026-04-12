import {
  IEntityCreateDto,
  IEntityFilterData,
  IEntityUpdateDto,
} from "../../types";
import { EntityList, EntityType } from "../../utils";

export interface IRecurringItemCreateDto extends IEntityCreateDto<
  EntityType<EntityList.RECURRING_ITEM>
> {}

export interface IRecurringItemUpdateDto extends IEntityUpdateDto<
  EntityType<EntityList.RECURRING_ITEM>
> {}

export interface IRecurringItemSearchDto extends IEntityFilterData<
  EntityType<EntityList.RECURRING_ITEM>
> {}
