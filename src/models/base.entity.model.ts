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

  // populateRelations(searchResponse: ISearchV2Response): this {
  //   const relations = (this.constructor as typeof BaseEntityModel).relations;
  //   for (const [prop, config] of Object.entries(relations)) {
  //     const { relationType, mappingProperty, searchProperty, entity } = config!;
  //     // @ts-ignore
  //     const fkValue = this[mappingProperty];
  //     const bucket = searchResponse[entity] ?? [];
  //     if (!bucket.length) continue;

  //     if (relationType === RelationType.ONE) {
  //       // @ts-ignore
  //       const match = bucket.find((e) => e[searchProperty] === fkValue);
  //       if (match) {
  //         const hydrated = (
  //           entityListEntityModelMap[entity] as (
  //             e: EntityType<EntityList>,
  //           ) => any
  //         )(match);
  //         // recursively populate relations on the hydrated model
  //         hydrated.populateRelations(searchResponse);
  //         this[prop as keyof this] = hydrated;
  //       }
  //     } else {
  //       const matches = bucket.filter(
  //         (e: any) => e[searchProperty] === fkValue,
  //       );
  //       this[prop as keyof this] = matches.map((e: EntityType<EntityList>) => {
  //         const hydrated = (
  //           entityListEntityModelMap[entity] as (
  //             e: EntityType<EntityList>,
  //           ) => any
  //         )(e);
  //         // recursively populate relations on each hydrated model
  //         hydrated.populateRelations(searchResponse);
  //         return hydrated;
  //       }) as this[keyof this];
  //     }
  //   }
  //   return this;
  // }

  populateRelations(
    searchResponse: ISearchV2Response,
    visited = new Set<string>(),
  ): this {
    const selfKey = `${this.constructor.name}:${(this as any).id}`;
    if (visited.has(selfKey)) return this;
    visited.add(selfKey);

    const relations = (this.constructor as typeof BaseEntityModel).relations;
    for (const [prop, config] of Object.entries(relations)) {
      const { relationType, mappingProperty, searchProperty, entity } = config!;
      // @ts-ignore
      const fkValue = this[mappingProperty];
      const bucket = searchResponse[entity] ?? [];
      if (!bucket.length) continue;

      if (relationType === RelationType.ONE) {
        // @ts-ignore
        const match = bucket.find((e) => e[searchProperty] === fkValue);
        if (match) {
          const hydrated = (
            entityListEntityModelMap[entity] as (
              e: EntityType<EntityList>,
            ) => any
          )(match);
          hydrated.populateRelations(searchResponse, visited);
          this[prop as keyof this] = hydrated;
        }
      } else {
        const matches = bucket.filter(
          (e: any) => e[searchProperty] === fkValue,
        );
        this[prop as keyof this] = matches.map((e: EntityType<EntityList>) => {
          const hydrated = (
            entityListEntityModelMap[entity] as (
              e: EntityType<EntityList>,
            ) => any
          )(e);
          hydrated.populateRelations(searchResponse, visited);
          return hydrated;
        }) as this[keyof this];
      }
    }
    return this;
  }
}
