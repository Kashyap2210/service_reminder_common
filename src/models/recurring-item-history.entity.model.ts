import { EntityHistoryOperation } from "../enums";
import { IRecurringItemHistoryEntity } from "../interfaces";

export class RecurringItemHistoryModel implements IRecurringItemHistoryEntity {
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
    entity: IRecurringItemHistoryEntity,
  ): RecurringItemHistoryModel {
    return Object.assign(new RecurringItemHistoryModel(), entity);
  }
}
