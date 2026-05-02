import { EntityHistoryOperation } from "../enums";
import { IVendorHistoryEntity } from "../interfaces";

export class VendorHistoryModel implements IVendorHistoryEntity {
  id: number = 0;
  entityId: number = 0;
  data: string = "";
  operation: EntityHistoryOperation = EntityHistoryOperation.CREATE;

  createdOn: number = 0;
  updatedOn: number = 0;
  createdBy: number = 0;
  updatedBy: number = 0;

  private constructor() {}

  static populateFromEntity(entity: IVendorHistoryEntity): VendorHistoryModel {
    return Object.assign(new VendorHistoryModel(), entity);
  }
}
