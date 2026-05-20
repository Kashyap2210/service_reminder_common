import { AppointmentType } from "../enums/appointment-type.enum";
import { ServiceAction } from "../enums/service-action.enum";
import { ServiceStatus } from "../enums/service-status.enum";
import { serviceFlowConfig } from "../flow-configs/service-flow.config";
import { IServiceEntity } from "../interfaces/entities/service.entity.interface";
import { IUserEntity } from "../interfaces/entities/user.entity.interface";
import { Nullable } from "../types/types.generic";
import {
  BadRequestException,
  EntityList,
  IModelRelationConfig,
  RelationType,
} from "../utils";
import { AppointmentModel } from "./appointment.entity.model";
import { BaseEntityModel } from "./base.entity.model";
import { RecurringItemModel } from "./recurring-item.entity.model";
import { UserModel } from "./user.entity.model";
import { VendorModel } from "./vendor.entity.model";

export class ServiceModel extends BaseEntityModel implements IServiceEntity {
  id: number = 0;
  appointmentId: number = 0;
  userId: number = 0;
  vendorId: number = 0;
  serviceStatus: ServiceStatus = ServiceStatus.CANCELLED;
  serviceDate: number = 0;
  recurringItemId: number = 0;
  serviceType: AppointmentType = AppointmentType.GENERAL_CHECK_UP;
  serviceEstimate: Nullable<number> = null;
  serviceAmount: Nullable<number> = null;
  invoiceDocument: Nullable<string> = null;

  // Audit fields
  createdOn: number = 0;
  updatedOn: number = 0;
  createdBy: number = 0;
  updatedBy: number = 0;

  user?: UserModel;
  recurring_item?: RecurringItemModel;
  appointment?: AppointmentModel;
  vendor?: VendorModel;

  protected constructor() {
    super();
  }

  static relations: Partial<
    Record<EntityList, IModelRelationConfig<EntityList.SERVICE>>
  > = {
    [EntityList.USER]: {
      relationType: RelationType.ONE,
      mappingProperty: "userId",
      searchProperty: "id",
      entity: EntityList.USER,
    },
    [EntityList.RECURRING_ITEM]: {
      relationType: RelationType.ONE,
      mappingProperty: "recurringItemId",
      searchProperty: "id",
      entity: EntityList.RECURRING_ITEM,
    },
    [EntityList.APPOINTMENT]: {
      relationType: RelationType.ONE,
      mappingProperty: "appointmentId",
      searchProperty: "id",
      entity: EntityList.APPOINTMENT,
    },
    [EntityList.VENDOR]: {
      relationType: RelationType.ONE,
      mappingProperty: "vendorId",
      searchProperty: "id",
      entity: EntityList.VENDOR,
    },
  };

  static populateFromEntity(entity: IServiceEntity): ServiceModel {
    return Object.assign(new ServiceModel(), entity);
  }

  getNextStatus(
    currentUser: IUserEntity,
    action: ServiceAction,
  ): ServiceStatus {
    // Only creator can update
    if (this.createdBy !== currentUser.id) {
      throw new BadRequestException({
        key: "createdBy",
        message: `Service can only be updated by the user who created it.`,
      });
    }

    if (action === undefined || action === null) {
      throw new BadRequestException({
        key: "action",
        message: `Action is required.`,
      });
    }

    const flowConfigForCurrentStatus = serviceFlowConfig[this.serviceStatus];

    if (!flowConfigForCurrentStatus) {
      throw new BadRequestException({
        key: "serviceStatus",
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
