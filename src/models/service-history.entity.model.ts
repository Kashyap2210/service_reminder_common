import { EntityHistoryOperation } from "../enums";
import { IServiceHistoryEntity } from "../interfaces";
import { BaseEntityModel } from "./base.entity.model";

export class ServiceHistoryModel
  extends BaseEntityModel
  implements IServiceHistoryEntity
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

  static relations = {};

  static populateFromEntity(
    entity: IServiceHistoryEntity,
  ): ServiceHistoryModel {
    return Object.assign(new ServiceHistoryModel(), entity);
  }
}
