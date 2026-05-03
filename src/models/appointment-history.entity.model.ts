import { EntityHistoryOperation } from "../enums";
import { IAppointmentHistoryEntity } from "../interfaces";
import { EntityList, IModelRelationConfig } from "../utils";
import { BaseEntityModel,  } from "./base.entity.model";

export class AppointmentHistoryModel
  extends BaseEntityModel
  implements IAppointmentHistoryEntity
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
    Record<EntityList, IModelRelationConfig<EntityList.APPOINTMENT_HISTORY>>
  > = {};

  static populateFromEntity(
    entity: IAppointmentHistoryEntity,
  ): AppointmentHistoryModel {
    return Object.assign(new AppointmentHistoryModel(), entity);
  }
}
