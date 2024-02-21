import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeBlogCategorySkeleton } from "./TypeBlogCategory";

export interface TypeBlogPostFields {
    title?: EntryFieldTypes.Text;
    image?: EntryFieldTypes.AssetLink;
    author?: EntryFieldTypes.EntryLink<EntrySkeletonType>;
    blogSubCategory?: EntryFieldTypes.EntryLink<TypeBlogCategorySkeleton>;
}

export type TypeBlogPostSkeleton = EntrySkeletonType<TypeBlogPostFields, "blogPost">;
export type TypeBlogPost<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeBlogPostSkeleton, Modifiers, Locales>;
