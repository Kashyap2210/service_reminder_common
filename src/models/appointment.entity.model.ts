import { AppointmentAction } from "../enums/appointment-action.enum";
import { AppointmentStatus } from "../enums/appointment-status.enum";
import { AppointmentType } from "../enums/appointment-type.enum";
import { appointmentFlowConfig } from "../flow-configs/appointment-flow.config";
import { BadRequestException } from "../helpers/error";
import { IAppointmentEntity } from "../interfaces/entities/appointment.entity.interface";
import { IUserEntity } from "../interfaces/entities/user.entity.interface";
import { Nullable } from "../types/types.generic";

export class AppointmentModel implements IAppointmentEntity {
  id: number = 0;
  appointmentDate: number = 0;
  recurringItemId: number = 0;
  userId: number = 0;
  appointmentType: AppointmentType = AppointmentType.GENERAL_CHECK_UP;
  vendorId: number = 0;
  appointmentStatus: AppointmentStatus = AppointmentStatus.BOOKED;
  checkPoints: Nullable<string> = null;

  createdOn: number = 0;
  updatedOn: number = 0;
  createdBy: number = 0;
  updatedBy: number = 0;

  private constructor() {}

  static fromEntity(entity: IAppointmentEntity): AppointmentModel {
    return Object.assign(new AppointmentModel(), entity);
  }

  getNextStatus(currentUser: IUserEntity, action: AppointmentAction) {
    // status change only allowed for currentuser
    if (this.createdBy !== currentUser.id) {
      throw new BadRequestException({
        key: "createdBy",
        message: `Appointment can only be updated by the user who created it.`,
      });
    }

    if (!action || action === undefined || action === null) {
      throw new BadRequestException({
        key: "action",
        message: `Action is required.`,
      });
    }

    const flowConfigForCurrentStatus =
      appointmentFlowConfig[this.appointmentStatus];
    if (!flowConfigForCurrentStatus) {
      throw new BadRequestException({
        key: "appointmentStatus",
        message: `No config found for current status.`,
      });
    }

    const actionConfig = flowConfigForCurrentStatus.actions[action];
    if (!actionConfig) {
      throw new BadRequestException({
        key: "action",
        message: `No config found for action: ${action} for current status.`,
      });
    }

    return actionConfig.next();
  }
}
