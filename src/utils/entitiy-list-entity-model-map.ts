import {
  AppointmentHistoryModel,
  AppointmentModel,
  CronJobModel,
  NotificationModel,
  RecurringItemHistoryModel,
  RecurringItemModel,
  ServiceHistoryModel,
  ServiceModel,
  UserHistoryModel,
  UserModel,
  VendorHistoryModel,
  VendorModel,
  VendorRecurringItemMappingModel,
} from "../models";
import { EntityList } from "./entity.utils";

export const entityListEntityModelMap = {
  [EntityList.USER]: UserModel.populateFromEntity,
  [EntityList.USER_HISTORY]: UserHistoryModel.populateFromEntity,
  [EntityList.RECURRING_ITEM]: RecurringItemModel.populateFromEntity,
  [EntityList.RECURRING_ITEM_HISTORY]:
    RecurringItemHistoryModel.populateFromEntity,
  [EntityList.VENDOR]: VendorModel.populateFromEntity,
  [EntityList.VENDOR_HISTORY]: VendorHistoryModel.populateFromEntity,
  [EntityList.APPOINTMENT]: AppointmentModel.populateFromEntity,
  [EntityList.APPOINTMENT_HISTORY]: AppointmentHistoryModel.populateFromEntity,
  [EntityList.SERVICE]: ServiceModel.populateFromEntity,
  [EntityList.SERVICE_HISTORY]: ServiceHistoryModel.populateFromEntity,
  [EntityList.NOTIFICATION]: NotificationModel.populateFromEntity,
  [EntityList.CRONJOB]: CronJobModel.populateFromEntity,
  [EntityList.VENDOR_RECURRING_ITEM_MAPPING]:
    VendorRecurringItemMappingModel.populateFromEntity,
};
