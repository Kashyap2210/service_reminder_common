import { NotificationStatus, NotificationType } from "../../enums";
import { IAuditColumnEntity } from "../../helpers";
import { Nullable } from "../../types";

export interface INotificationPayload {
  subject: string;
  body: string;
  recipientEmail: string;
  recipientName: string;
}

export interface INotificationEntity extends IAuditColumnEntity {
  id: number;
  userId: number;
  recurringItemId: number;
  appointmentId: Nullable<number>;
  type: NotificationType;
  status: NotificationStatus;
  scheduledFor: number;
  sentAt: Nullable<number>;
  retryCount: number;
  lastError: Nullable<string>;
  payload: INotificationPayload;
}
