import { ISearchV2Response } from "../types/generic.dto.types";
import {
  entityListEntityModelMap,
  IModelRelationConfig,
  RelationType,
} from "../utils";
import { EntityList, EntityType } from "../utils/entity.utils";

export abstract class BaseEntityModel {
  static relations: Partial<
    Record<EntityList, IModelRelationConfig<EntityList>>
  > = {};

  populateRelations(searchResponse: ISearchV2Response): this {
    const relations = (this.constructor as typeof BaseEntityModel).relations;
    for (const [prop, config] of Object.entries(relations)) {
      const { relationType, mappingProperty, searchProperty, entity } = config;
      // @ts-ignore
      const fkValue = this[mappingProperty];
      const bucket = searchResponse[entity] ?? [];
      if (!bucket.length) continue;
      if (relationType === RelationType.ONE) {
        // @ts-ignore
        const match = bucket.find((e) => e[searchProperty] === fkValue);
        this[prop as keyof this] = match
          ? (
              entityListEntityModelMap[entity] as (
                e: EntityType<EntityList>,
              ) => any
            )(match)
          : undefined;
      } else {
        const matches = bucket.filter(
          (e: any) => e[searchProperty] === fkValue,
        );
        // @ts-ignore
        this[prop] = matches.map((e: EntityType<EntityList>) =>
          (
            entityListEntityModelMap[entity] as (
              e: EntityType<EntityList>,
            ) => any
          )(e),
        );
      }
    }
    return this;
  }
}
