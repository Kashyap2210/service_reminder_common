import { ServicePeriodUnit } from "../../enums";
import { IAuditColumnEntity } from "../../helpers";
import { Nullable } from "../../types";

export interface IRecurringItemEntity extends IAuditColumnEntity {
  id: number;
  name: string;
  type: string;
  companyName: Nullable<string>;
  // vendorId: Nullable<number>;
  servicePeriod: number;
  servicePeriodUnit: ServicePeriodUnit;
  // servicePlaceAddress: Nullable<string>;
  userId: number;
}
