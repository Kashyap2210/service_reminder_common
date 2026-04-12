import { EntityHistoryOperation } from "../../enums";
import { IAuditColumnEntity } from "../../helpers";

export interface IBaseHistoryEntity extends IAuditColumnEntity {
  id: number;
  entityId: number;
  data: string;
  operation: EntityHistoryOperation;
}
