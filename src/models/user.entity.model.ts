import { UserRole, UserStatus } from "../enums";
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
  status: UserStatus = UserStatus.ACTIVE;

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
      relationType: RelationType.MANY,
      mappingProperty: "id",
      searchProperty: "userId",
      entity: EntityList.APPOINTMENT,
    },
    [EntityList.RECURRING_ITEM]: {
      relationType: RelationType.MANY,
      mappingProperty: "id",
      searchProperty: "userId",
      entity: EntityList.RECURRING_ITEM,
    },
    [EntityList.SERVICE]: {
      relationType: RelationType.MANY,
      mappingProperty: "id",
      searchProperty: "userId",
      entity: EntityList.SERVICE,
    },
    [EntityList.NOTIFICATION]: {
      relationType: RelationType.MANY,
      mappingProperty: "id",
      searchProperty: "userId",
      entity: EntityList.NOTIFICATION,
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
    return this.extractIds(this[EntityList.RECURRING_ITEM]);
  }

  get serviceIds() {
    return this.extractIds(this[EntityList.SERVICE]);
  }

  get notificationIds() {
    return this.extractIds(this[EntityList.NOTIFICATION]);
  }

  get appointmentIds() {
    return this.extractIds(this[EntityList.APPOINTMENT]);
  }

  get vendorIds() {
    return this.extractIds(this.vendors);
  }

  private extractIds<T extends { id: number }>(items?: T[]): Array<T["id"]> {
    return items?.map((item) => item.id) ?? [];
  }

  get vendorRecurringItemMappingIds(): number[] {
    return (
      this[EntityList.RECURRING_ITEM]?.flatMap(
        (item) =>
          item[EntityList.VENDOR_RECURRING_ITEM_MAPPING]?.map(
            (mapping) => mapping.id,
          ) ?? [],
      ) ?? []
    );
  }
}
