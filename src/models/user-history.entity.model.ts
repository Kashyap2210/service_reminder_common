import { EntityHistoryOperation } from "../enums";
import { IUserHistoryEntity } from "../interfaces";

export class UserHistoryModel implements IUserHistoryEntity {
  id: number = 0;
  entityId: number = 0;
  data: string = "";
  operation: EntityHistoryOperation = EntityHistoryOperation.CREATE;

  createdOn: number = 0;
  updatedOn: number = 0;
  createdBy: number = 0;
  updatedBy: number = 0;

  private constructor() {}

  static populateFromEntity(entity: IUserHistoryEntity): UserHistoryModel {
    return Object.assign(new UserHistoryModel(), entity);
  }
}
