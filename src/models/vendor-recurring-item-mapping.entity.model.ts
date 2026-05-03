import { IVendorRecurringItemMapping } from "../interfaces";
import { EntityList, IModelRelationConfig, RelationType } from "../utils";
import { BaseEntityModel } from "./base.entity.model";
import { RecurringItemModel } from "./recurring-item.entity.model";
import { VendorModel } from "./vendor.entity.model";

export class VendorRecurringItemMappingModel
  extends BaseEntityModel
  implements IVendorRecurringItemMapping
{
  id: number = 0;
  vendorId: number = 0;
  recurringItemId: number = 0;

  createdOn: number = 0;
  updatedOn: number = 0;
  createdBy: number = 0;
  updatedBy: number = 0;

  vendor?: VendorModel;
  recurringItem?: RecurringItemModel;

  protected constructor() {
    super();
  }

  static relations: Partial<
    Record<
      EntityList,
      IModelRelationConfig<EntityList.VENDOR_RECURRING_ITEM_MAPPING>
    >
  > = {
    [EntityList.VENDOR]: {
      relationType: RelationType.ONE,
      mappingProperty: "vendorId",
      searchProperty: "id",
      entity: EntityList.VENDOR,
    },
    [EntityList.RECURRING_ITEM]: {
      relationType: RelationType.ONE,
      mappingProperty: "recurringItemId",
      searchProperty: "id",
      entity: EntityList.RECURRING_ITEM,
    },
  };

  static populateFromEntity(
    entity: IVendorRecurringItemMapping,
  ): VendorRecurringItemMappingModel {
    return Object.assign(new VendorRecurringItemMappingModel(), entity);
  }
}
