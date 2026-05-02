import { ServicePeriodUnit } from "../enums";
import { IRecurringItemEntity } from "../interfaces";
import { Nullable } from "../types";

export class RecurringItemModel implements IRecurringItemEntity {
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

  private constructor() {}

  static populateFromEntity(entity: IRecurringItemEntity): RecurringItemModel {
    return Object.assign(new RecurringItemModel(), entity);
  }
}
