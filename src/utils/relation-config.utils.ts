import { EntityList, EntityType } from ".";

export enum RelationType {
  ONE = "ONE",
  MANY = "MANY",
}

export interface IModelRelationConfig<T extends EntityList> {
  relationType: RelationType;
  mappingProperty: keyof EntityType<T> & string;
  searchProperty: string;
  entity: EntityList;
}
