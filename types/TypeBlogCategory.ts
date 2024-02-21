import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeBlogCategoryFields {
    title?: EntryFieldTypes.Symbol;
    image?: EntryFieldTypes.AssetLink;
    description?: EntryFieldTypes.RichText;
    subCategory?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeBlogCategorySkeleton>>;
}

export type TypeBlogCategorySkeleton = EntrySkeletonType<TypeBlogCategoryFields, "blogCategory">;
export type TypeBlogCategory<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeBlogCategorySkeleton, Modifiers, Locales>;
