import { CronJobStatus } from "../enums";
import { ICronJobEntity } from "../interfaces";
import { Nullable } from "../types";
import { BaseEntityModel } from "./base.entity.model";

export class CronJobModel extends BaseEntityModel implements ICronJobEntity {
  id: number = 0;
  name: string = "";
  cronExpression: string = "";
  scheduledAt: number = 0;
  startedAt: Nullable<number> = null;
  completedAt: Nullable<number> = null;
  status: CronJobStatus = CronJobStatus.SCHEDULED;
  error: Record<string, any> | null = null;

  createdOn: number = 0;
  updatedOn: number = 0;
  createdBy: number = 0;
  updatedBy: number = 0;

  protected constructor() {
    super();
  }

  static relations = {};

  static populateFromEntity(entity: ICronJobEntity): CronJobModel {
    return Object.assign(new CronJobModel(), entity);
  }
}
