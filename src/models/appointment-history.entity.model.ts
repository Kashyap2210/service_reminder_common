import { EntityHistoryOperation } from "../enums";
import { IAppointmentHistoryEntity } from "../interfaces";

export class AppointmentHistoryModel implements IAppointmentHistoryEntity {
  id: number = 0;
  entityId: number = 0;
  data: string = "";
  operation: EntityHistoryOperation = EntityHistoryOperation.CREATE;

  createdOn: number = 0;
  updatedOn: number = 0;
  createdBy: number = 0;
  updatedBy: number = 0;

  private constructor() {}

  static populateFromEntity(
    entity: IAppointmentHistoryEntity,
  ): AppointmentHistoryModel {
    return Object.assign(new AppointmentHistoryModel(), entity);
  }
}
