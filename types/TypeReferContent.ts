import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeComponentSeoSkeleton } from "./TypeComponentSeo";
import type { TypePageProductSkeleton } from "./TypePageProduct";

export interface TypeReferContentFields {
    title?: EntryFieldTypes.Symbol;
    seo?: EntryFieldTypes.EntryLink<TypePageProductSkeleton>;
    seoField?: EntryFieldTypes.EntryLink<TypeComponentSeoSkeleton>;
}

export type TypeReferContentSkeleton = EntrySkeletonType<TypeReferContentFields, "referContent">;
export type TypeReferContent<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeReferContentSkeleton, Modifiers, Locales>;
