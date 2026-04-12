import { AppointmentStatus, AppointmentType } from "../../enums";
import { IAuditColumnEntity } from "../../helpers";
import { Nullable } from "../../types";

export interface IAppointmentEntity extends IAuditColumnEntity {
  id: number;
  appointmentDate: number;
  recurringItemId: number;
  userId: number;
  appointmentType: AppointmentType;
  vendorId: number;
  appointmentStatus: AppointmentStatus;
  checkPoints: Nullable<string>;
}
