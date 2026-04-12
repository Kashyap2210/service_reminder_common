import { IAuditColumnEntity } from "../../helpers";

export interface IVendorRecurringItemMapping extends IAuditColumnEntity {
  id: number;
  vendorId: number;
  recurringItemId: number;
}
