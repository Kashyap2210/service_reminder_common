import { EntityHistoryOperation } from "../enums";
import { IServiceHistoryEntity } from "../interfaces";

export class ServiceHistoryModel implements IServiceHistoryEntity {
  id: number = 0;
  entityId: number = 0;
  data: string = "";
  operation: EntityHistoryOperation = EntityHistoryOperation.CREATE;

  createdOn: number = 0;
  updatedOn: number = 0;
  createdBy: number = 0;
  updatedBy: number = 0;

  private constructor() {}

  static populateFromEntity(
    entity: IServiceHistoryEntity,
  ): ServiceHistoryModel {
    return Object.assign(new ServiceHistoryModel(), entity);
  }
}
