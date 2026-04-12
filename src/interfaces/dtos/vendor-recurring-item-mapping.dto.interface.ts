import {
  IEntityCreateDto,
  IEntityFilterData,
  IEntityUpdateDto,
} from "../../types";
import { EntityList, EntityType } from "../../utils";

export interface IVendorRecurringItemMappingCreateDto extends IEntityCreateDto<
  EntityType<EntityList.VENDOR_RECURRING_ITEM_MAPPING>
> {}

export interface IVendorRecurringItemMappingUpdateDto extends IEntityUpdateDto<
  EntityType<EntityList.VENDOR_RECURRING_ITEM_MAPPING>
> {}

export interface IVendorRecurringItemMappingSearchDto extends IEntityFilterData<
  EntityType<EntityList.VENDOR_RECURRING_ITEM_MAPPING>
> {}
