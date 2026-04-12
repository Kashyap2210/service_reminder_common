import { ServiceAction } from "../../enums";
import {
  IEntityCreateDto,
  IEntityFilterData,
  IEntityUpdateDto,
} from "../../types";
import { EntityList, EntityType } from "../../utils";

export type IServiceCreateDtoExclude = "serviceStatus"
export interface IServiceCreateDto extends Omit<IEntityCreateDto<
  EntityType<EntityList.SERVICE>
>, IServiceCreateDtoExclude> {}

export interface IServiceUpdateDto extends IEntityUpdateDto<
  EntityType<EntityList.SERVICE>
> {
  action?: ServiceAction;
}

export interface IServiceSearchDto extends IEntityFilterData<
  EntityType<EntityList.SERVICE>
> {}
