import { EntityHistoryOperation } from "../enums";
import { IRecurringItemHistoryEntity } from "../interfaces";
import { EntityList, IModelRelationConfig } from "../utils";
import { BaseEntityModel,  } from "./base.entity.model";

export class RecurringItemHistoryModel
  extends BaseEntityModel
  implements IRecurringItemHistoryEntity
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
    Record<EntityList, IModelRelationConfig<EntityList.RECURRING_ITEM>>
  > = {};

  static populateFromEntity(
    entity: IRecurringItemHistoryEntity,
  ): RecurringItemHistoryModel {
    return Object.assign(new RecurringItemHistoryModel(), entity);
  }
}
