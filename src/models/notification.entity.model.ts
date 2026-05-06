import { NotificationStatus, NotificationType } from "../enums";
import {
  INotificationEntity,
  INotificationPayload,
  IUserEntity,
} from "../interfaces";
import { Nullable } from "../types";
import { EntityList, IModelRelationConfig, RelationType } from "../utils";
import { AppointmentModel } from "./appointment.entity.model";
import { BaseEntityModel } from "./base.entity.model";
import { RecurringItemModel } from "./recurring-item.entity.model";
import { UserModel } from "./user.entity.model";

export class NotificationModel
  extends BaseEntityModel
  implements INotificationEntity
{
  id: number = 0;
  userId: number = 0;
  recurringItemId: number = 0;
  appointmentId: Nullable<number> = null;
  type: NotificationType = NotificationType.EMAIL_APPOINTMENT_REMINDER;
  status: NotificationStatus = NotificationStatus.PENDING;
  scheduledFor: number = 0;
  sentAt: Nullable<number> = null;
  retryCount: number = 0;
  lastError: Nullable<string> = null;
  payload: INotificationPayload = {
    subject: "",
    body: "",
    recipientEmail: "",
    recipientName: "",
  };

  createdOn: number = 0;
  updatedOn: number = 0;
  createdBy: number = 0;
  updatedBy: number = 0;

  user?: UserModel;
  recurringItem?: RecurringItemModel;
  appointment?: AppointmentModel;

  protected constructor() {
    super();
  }

  static getNewNotificationEntity(
    currentUser: IUserEntity,
    recurringItemModel: RecurringItemModel,
    payload: INotificationPayload,
  ): INotificationEntity {
    const notificationEntity = new NotificationModel();
    (((notificationEntity.id = 0),
    (notificationEntity.userId = recurringItemModel.userId),
    (notificationEntity.recurringItemId = recurringItemModel.id),
    (notificationEntity.appointmentId = null),
    (notificationEntity.type = NotificationType.EMAIL_SERVICE_REMINDER),
    (notificationEntity.status = NotificationStatus.PENDING),
    (notificationEntity.scheduledFor = 0),
    (notificationEntity.sentAt = null),
    (notificationEntity.retryCount = 0),
    (notificationEntity.lastError = null),
    (notificationEntity.payload = payload)),
      (notificationEntity.createdBy = currentUser.id),
      (notificationEntity.updatedBy = currentUser.id));

    return notificationEntity;
  }

  static populateFromEntity(entity: INotificationEntity): NotificationModel {
    return Object.assign(new NotificationModel(), structuredClone(entity));
  }

  static relations: Partial<
    Record<EntityList, IModelRelationConfig<EntityList.NOTIFICATION>>
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
  };
}
