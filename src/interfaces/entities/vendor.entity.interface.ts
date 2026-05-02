import { IAuditColumnEntity } from "../../helpers";
import { Nullable } from "../../types";

export interface IVendorEntity extends IAuditColumnEntity {
  id: number;
  name: string;
  contactNo: string;
  email: Nullable<string>;
  // recurringItemId: number; // <== recurringItemId
  userId: number;
  address: string;
}
