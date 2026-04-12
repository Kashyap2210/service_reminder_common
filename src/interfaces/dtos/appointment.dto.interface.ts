import { AppointmentAction } from "../../enums";
import {
  IEntityCreateDto,
  IEntityFilterData,
  IEntityUpdateDto,
} from "../../types";
import { EntityList, EntityType } from "../../utils";

export type IAppointmentCreateDtoExclude = "appointmentStatus";
export interface IAppointmentCreateDto extends Omit<
  IEntityCreateDto<EntityType<EntityList.APPOINTMENT>>,
  IAppointmentCreateDtoExclude
> {}

export interface IAppointmentUpdateDto extends IEntityUpdateDto<
  EntityType<EntityList.APPOINTMENT>
> {
  action?: AppointmentAction;
}

export interface IAppointmentSearchDto extends IEntityFilterData<
  EntityType<EntityList.APPOINTMENT>
> {}
