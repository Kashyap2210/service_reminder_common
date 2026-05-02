import { NotificationStatus, NotificationType } from "../enums";
import { INotificationEntity, INotificationPayload } from "../interfaces";
import { Nullable } from "../types";

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

  static populateFromEntity(entity: INotificationEntity): NotificationModel {
    return Object.assign(new NotificationModel(), structuredClone(entity));
  }
}
