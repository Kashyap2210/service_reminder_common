import { AppointmentType, ServiceStatus } from "../../enums";
import { IAuditColumnEntity } from "../../helpers";
import { Nullable } from "../../types";

export interface IServiceEntity extends IAuditColumnEntity {
  id: number;
  serviceDate: number;
  recurringItemId: number;
  appointmentId: Nullable<number>;
  userId: number;
  serviceType: AppointmentType;
  serviceStatus: ServiceStatus;
  vendorId: number;
  serviceEstimate: Nullable<number>;
  serviceAmount: Nullable<number>;
  invoiceDocument: Nullable<string>;
}
