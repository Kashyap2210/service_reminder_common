import { EntityHistoryOperation } from "../enums";
import { IUserHistoryEntity } from "../interfaces";
import { EntityList, IModelRelationConfig } from "../utils";
import { BaseEntityModel,  } from "./base.entity.model";

export class UserHistoryModel
  extends BaseEntityModel
  implements IUserHistoryEntity
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
    Record<EntityList, IModelRelationConfig<EntityList.USER_HISTORY>>
  > = {};

  static populateFromEntity(entity: IUserHistoryEntity): UserHistoryModel {
    return Object.assign(new UserHistoryModel(), entity);
  }
}
