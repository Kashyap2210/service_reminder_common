import { EntityHistoryOperation } from "../enums";
import { IVendorHistoryEntity } from "../interfaces";
import { EntityList, IModelRelationConfig } from "../utils";
import { BaseEntityModel } from "./base.entity.model";

export class VendorHistoryModel
  extends BaseEntityModel
  implements IVendorHistoryEntity
{
  id: number = 0;
  entityId: number = 0;
  data: string = "";
  operation: EntityHistoryOperation = EntityHistoryOperation.CREATE;

  createdOn: number = 0;
  updatedOn: number = 0;
  createdBy: number = 0;
  updatedBy: number = 0;

  protected constructor() {
    super();
  }

  static relations: Partial<
    Record<EntityList, IModelRelationConfig<EntityList.VENDOR>>
  > = {};

  static populateFromEntity(entity: IVendorHistoryEntity): VendorHistoryModel {
    return Object.assign(new VendorHistoryModel(), entity);
  }
}
