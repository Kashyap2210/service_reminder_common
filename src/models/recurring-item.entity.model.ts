import { ServicePeriodUnit } from "../enums";
import { IRecurringItemEntity } from "../interfaces";
import { Nullable } from "../types";
import { EntityList, IModelRelationConfig, RelationType } from "../utils";
import { BaseEntityModel } from "./base.entity.model";
import { ServiceModel } from "./service.entity.model";
import { UserModel } from "./user.entity.model";
import { VendorRecurringItemMappingModel } from "./vendor-recurring-item-mapping.entity.model";

export class RecurringItemModel
  extends BaseEntityModel
  implements IRecurringItemEntity
{
  id: number = 0;
  name: string = "";
  type: string = "";
  companyName: Nullable<string> = null;
  servicePeriod: number = 0;
  servicePeriodUnit: ServicePeriodUnit = ServicePeriodUnit.MONTHS;
  // servicePlaceAddress: Nullable<string> = null;
  userId: number = 0;

  createdOn: number = 0;
  updatedOn: number = 0;
  createdBy: number = 0;
  updatedBy: number = 0;

  services?: ServiceModel[];
  user?: UserModel;
  // vendors?: VendorModel[];
  [EntityList.VENDOR_RECURRING_ITEM_MAPPING]?: VendorRecurringItemMappingModel[];

  protected constructor() {
    super();
  }

  static relations: Partial<
    Record<EntityList, IModelRelationConfig<EntityList.RECURRING_ITEM>>
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
      searchProperty: "recurringItemId",
      entity: EntityList.VENDOR_RECURRING_ITEM_MAPPING,
    },
    [EntityList.SERVICE]: {
      relationType: RelationType.MANY,
      mappingProperty: "id",
      searchProperty: "recurringItemId",
      entity: EntityList.SERVICE,
    },
    [EntityList.APPOINTMENT]: {
      relationType: RelationType.MANY,
      mappingProperty: "id",
      searchProperty: "recurringItemId",
      entity: EntityList.APPOINTMENT,
    },
  };

  static populateFromEntity(entity: IRecurringItemEntity): RecurringItemModel {
    return Object.assign(new RecurringItemModel(), entity);
  }

  get latestService(): ServiceModel {
    return (
      this.services?.sort((a, b) => b.serviceDate - a.serviceDate)[0] ??
      ({} as ServiceModel)
    );
  }

  static getRecurringItemIds(items: RecurringItemModel[]): number[] {
    return items.map((item) => item["id"]);
  }

  static getRecurringItemUserIds(items: RecurringItemModel[]): number[] {
    return items.map((item) => item["userId"]);
  }

  get vendors() {
    return this[EntityList.VENDOR_RECURRING_ITEM_MAPPING]?.map(
      (item) => item.vendor,
    );
  }
}
