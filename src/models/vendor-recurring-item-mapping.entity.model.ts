import { IVendorRecurringItemMapping } from "../interfaces";

export class VendorRecurringItemMappingModel implements IVendorRecurringItemMapping {
  id: number = 0;
  vendorId: number = 0;
  recurringItemId: number = 0;

  createdOn: number = 0;
  updatedOn: number = 0;
  createdBy: number = 0;
  updatedBy: number = 0;

  private constructor() {}

  static populateFromEntity(
    entity: IVendorRecurringItemMapping,
  ): VendorRecurringItemMappingModel {
    return Object.assign(new VendorRecurringItemMappingModel(), entity);
  }

  static vendorIds(items: VendorRecurringItemMappingModel[]) {
    return items.map((item) => item.vendorId);
  }
}
