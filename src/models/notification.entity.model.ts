import { NotificationStatus, NotificationType } from "../enums";
import { INotificationEntity, INotificationPayload } from "../interfaces";
import { Nullable } from "../types";
import { RecurringItemModel } from "./recurring-item.entity.model";

export class NotificationModel implements INotificationEntity {
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

  private constructor() {}

  static getNewNotificationEntity(
    recurringItemModel: RecurringItemModel,
    payload: INotificationPayload,
  ): INotificationEntity {
    const notificationEntity = new NotificationModel();
    ((notificationEntity.id = 0),
      (notificationEntity.userId = recurringItemModel.userId),
      (notificationEntity.recurringItemId = recurringItemModel.id),
      (notificationEntity.appointmentId = null),
      (notificationEntity.type = NotificationType.EMAIL_SERVICE_REMINDER),
      (notificationEntity.status = NotificationStatus.PENDING),
      (notificationEntity.scheduledFor = 0),
      (notificationEntity.sentAt = null),
      (notificationEntity.retryCount = 0),
      (notificationEntity.lastError = null),
      (notificationEntity.payload = payload));

    return notificationEntity;
  }

  static populateFromEntity(entity: INotificationEntity): NotificationModel {
    return Object.assign(new NotificationModel(), structuredClone(entity));
  }
}
