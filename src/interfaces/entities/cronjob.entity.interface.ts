import { CronJobStatus } from "../../enums";
import { IAuditColumnEntity } from "../../helpers";
import { Nullable } from "../../types";

export interface ICronJobEntity extends IAuditColumnEntity {
  id: number;
  name: string;
  cronExpression: string;
  scheduledAt: number;
  startedAt: Nullable<number>;
  completedAt: Nullable<number>;
  status: CronJobStatus;
  error: Record<string, any> | null;
}
