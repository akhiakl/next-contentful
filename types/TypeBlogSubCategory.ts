import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeBlogSubCategoryFields {
    title?: EntryFieldTypes.Symbol;
    category?: EntryFieldTypes.EntryLink<EntrySkeletonType>;
}

export type TypeBlogSubCategorySkeleton = EntrySkeletonType<TypeBlogSubCategoryFields, "blogSubCategory">;
export type TypeBlogSubCategory<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeBlogSubCategorySkeleton, Modifiers, Locales>;
