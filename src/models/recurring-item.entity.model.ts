import { ServicePeriodUnit } from "../enums";
import { IRecurringItemEntity } from "../interfaces";
import { Nullable } from "../types";
import { EntityList, IModelRelationConfig, RelationType } from "../utils";
import { BaseEntityModel } from "./base.entity.model";
import { UserModel } from "./user.entity.model";

export class RecurringItemModel
  extends BaseEntityModel
  implements IRecurringItemEntity
{
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

  user?: UserModel;

  protected constructor() {
    super();
  }

  static relations: Partial<
    Record<EntityList, IModelRelationConfig<EntityList.RECURRING_ITEM>>
  > = {
    [EntityList.USER]: {
      relationType: RelationType.ONE,
      mappingProperty: "userId",
      searchProperty: "id",
      entity: EntityList.USER,
    },
  };

  static populateFromEntity(entity: IRecurringItemEntity): RecurringItemModel {
    return Object.assign(new RecurringItemModel(), entity);
  }
}
