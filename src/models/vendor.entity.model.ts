import { IVendorEntity } from "../interfaces";
import { Nullable } from "../types";
import {
  definedValues,
  EntityList,
  IModelRelationConfig,
  RelationType,
} from "../utils";
import { BaseEntityModel } from "./base.entity.model";
import { UserModel } from "./user.entity.model";
import { VendorRecurringItemMappingModel } from "./vendor-recurring-item-mapping.entity.model";

export class VendorModel extends BaseEntityModel implements IVendorEntity {
  id: number = 0;
  name: string = "";
  contactNo: string = "";
  email: Nullable<string> = null;
  userId: number = 0;
  address: string = "";

  createdOn: number = 0;
  updatedOn: number = 0;
  createdBy: number = 0;
  updatedBy: number = 0;

  user?: UserModel;
  [EntityList.VENDOR_RECURRING_ITEM_MAPPING]?: VendorRecurringItemMappingModel[];

  protected constructor() {
    super();
  }

  static relations: Partial<
    Record<EntityList, IModelRelationConfig<EntityList.VENDOR>>
  > = {
    [EntityList.USER]: {
      relationType: RelationType.ONE,
      mappingProperty: "userId",
      searchProperty: "id",
      entity: EntityList.USER,
    },
    [EntityList.VENDOR_RECURRING_ITEM_MAPPING]: {
      relationType: RelationType.MANY,
      mappingProperty: "id",
      searchProperty: "vendorId",
      entity: EntityList.VENDOR_RECURRING_ITEM_MAPPING,
    },
  };

  static populateFromEntity(entity: IVendorEntity): VendorModel {
    return Object.assign(new VendorModel(), entity);
  }

  get recurringItems() {
    return definedValues(
      this[EntityList.VENDOR_RECURRING_ITEM_MAPPING]?.map(
        (item) => item[EntityList.RECURRING_ITEM],
      ) ?? [],
    );
  }

  get recurringItemNames() {
    return this.recurringItems?.map((item) => item?.name);
  }
}
