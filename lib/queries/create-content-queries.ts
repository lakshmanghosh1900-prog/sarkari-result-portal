import { cache } from "react";
export function createContentQueries<T>({ findMany, findBySlug }: any) {
  return {
    getPublishedItems: findMany,
    getItemBySlug: cache(findBySlug),
  };
}