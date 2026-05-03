import { ServicePeriodUnit } from "../enums";
import { IRecurringItemEntity } from "../interfaces";
import { Nullable } from "../types";
import { ServiceModel } from "./service.entity.model";
import { UserModel } from "./user.entity.model";
import { VendorRecurringItemMappingModel } from "./vendor-recurring-item-mapping.entity.model";
import { VendorModel } from "./vendor.entity.model";

export class RecurringItemModel implements IRecurringItemEntity {
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
  vendors?: VendorModel[];

  private constructor() {}

  static populateFromEntity(entity: IRecurringItemEntity): RecurringItemModel {
    return Object.assign(new RecurringItemModel(), entity);
  }

  /**
   * Populates user, services and vendors on each recurring item model
   * so callers never have to manually filter/find across separate arrays
   * @param items - RecurringItemModels to populate
   * @param users - All user models to match against userId
   * @param services - All service models to match against recurringItemId
   * @param vendors - All vendor models
   * @param mappings - VendorRecurringItemMappings to resolve which vendors belong to which recurring item
   */
  static populateRelations(
    items: RecurringItemModel[],
    users: UserModel[],
    services: ServiceModel[],
    vendors: VendorModel[],
    mappings: VendorRecurringItemMappingModel[],
  ): void {
    const userMap = new Map(users.map((u) => [u.id, u]));

    const servicesByRecurringItemId = services.reduce((map, service) => {
      const existing = map.get(service.recurringItemId) ?? [];
      existing.push(service);
      map.set(service.recurringItemId, existing);
      return map;
    }, new Map<number, ServiceModel[]>());

    const vendorMap = new Map(vendors.map((v) => [v.id, v]));

    const vendorIdsByRecurringItemId = mappings.reduce((map, mapping) => {
      const existing = map.get(mapping.recurringItemId) ?? [];
      existing.push(mapping.vendorId);
      map.set(mapping.recurringItemId, existing);
      return map;
    }, new Map<number, number[]>());

    for (const item of items) {
      item.user = userMap.get(item.userId);
      item.services = servicesByRecurringItemId.get(item.id) ?? [];
      item.vendors = (vendorIdsByRecurringItemId.get(item.id) ?? [])
        .map((vendorId) => vendorMap.get(vendorId))
        .filter((v): v is VendorModel => v !== undefined);
    }
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
}
