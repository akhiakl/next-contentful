import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeJsonTestFields {
    title?: EntryFieldTypes.Symbol;
    json?: EntryFieldTypes.Object;
}

export type TypeJsonTestSkeleton = EntrySkeletonType<TypeJsonTestFields, "jsonTest">;
export type TypeJsonTest<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeJsonTestSkeleton, Modifiers, Locales>;
