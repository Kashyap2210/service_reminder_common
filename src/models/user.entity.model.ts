import { UserRole } from "../enums";
import { IUserEntity } from "../interfaces";
import {
  definedValues,
  EntityList,
  IModelRelationConfig,
  RelationType,
} from "../utils";
import { AppointmentModel } from "./appointment.entity.model";
import { BaseEntityModel } from "./base.entity.model";
import { NotificationModel } from "./notification.entity.model";
import { RecurringItemModel } from "./recurring-item.entity.model";
import { ServiceModel } from "./service.entity.model";
import { VendorModel } from "./vendor.entity.model";

export class UserModel extends BaseEntityModel implements IUserEntity {
  id: number = 0;
  name: string = "";
  contactNo: string = "";
  email: string = "";
  password: string = "";
  role: UserRole = UserRole.USER;

  createdOn: number = 0;
  updatedOn: number = 0;
  createdBy: number = 0;
  updatedBy: number = 0;

  [EntityList.APPOINTMENT]?: AppointmentModel[];
  [EntityList.RECURRING_ITEM]?: RecurringItemModel[];
  [EntityList.SERVICE]?: ServiceModel[];
  [EntityList.NOTIFICATION]?: NotificationModel[];

  protected constructor() {
    super();
  }

  static relations: Partial<
    Record<EntityList, IModelRelationConfig<EntityList.USER>>
  > = {
    [EntityList.APPOINTMENT]: {
      relationType: RelationType.ONE,
      mappingProperty: "id",
      searchProperty: "userId",
      entity: EntityList.APPOINTMENT,
    },
    [EntityList.RECURRING_ITEM]: {
      relationType: RelationType.ONE,
      mappingProperty: "id",
      searchProperty: "userId",
      entity: EntityList.APPOINTMENT,
    },
    [EntityList.SERVICE]: {
      relationType: RelationType.ONE,
      mappingProperty: "id",
      searchProperty: "userId",
      entity: EntityList.APPOINTMENT,
    },
    [EntityList.NOTIFICATION]: {
      relationType: RelationType.ONE,
      mappingProperty: "id",
      searchProperty: "userId",
      entity: EntityList.APPOINTMENT,
    },
  };

  static populateFromEntity(entity: IUserEntity): UserModel {
    return Object.assign(new UserModel(), entity);
  }

  get vendors(): VendorModel[] {
    return definedValues(
      this[EntityList.RECURRING_ITEM]?.flatMap((item) =>
        definedValues(
          item[EntityList.VENDOR_RECURRING_ITEM_MAPPING]?.map(
            (mapping) => mapping[EntityList.VENDOR],
          ) ?? [],
        ),
      ) ?? [],
    );
  }

  get recurringItemIds() {
    return (
      this[EntityList.RECURRING_ITEM]?.map((item) => item.id) ??
      ([] as number[])
    );
  }

  get serviceIds() {
    return this[EntityList.SERVICE]?.map((item) => item.id) ?? ([] as number[]);
  }

  get notificationIds() {
    return (
      this[EntityList.NOTIFICATION]?.map((item) => item.id) ?? ([] as number[])
    );
  }

  get appointmentIds() {
    return (
      this[EntityList.APPOINTMENT]?.map((item) => item.id) ?? ([] as number[])
    );
  }

  get vendorIds() {
    return this.vendors.map((vendor) => vendor.id);
  }
}
