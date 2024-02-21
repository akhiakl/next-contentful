import type { ChainModifiers, LocaleCode } from "contentful";
import type {
  TypeBlogCategory,
  TypeBlogPost,
  TypeBlogSubCategory,
  TypeComponentSeo,
  TypeJsonTest,
  TypePageLanding,
  TypePageProduct,
  TypeReferContent,
} from "./index";

export type ContentEntry<
  Id extends string,
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
> = Id extends "blogCategory"
  ? TypeBlogCategory<Modifiers, Locales>
  : Id extends "blogPost"
    ? TypeBlogPost<Modifiers, Locales>
    : Id extends "blogSubCategory"
      ? TypeBlogSubCategory<Modifiers, Locales>
      : Id extends "componentSeo"
        ? TypeComponentSeo<Modifiers, Locales>
        : Id extends "jsonTest"
          ? TypeJsonTest<Modifiers, Locales>
          : Id extends "pageLanding"
            ? TypePageLanding<Modifiers, Locales>
            : Id extends "pageProduct"
              ? TypePageProduct<Modifiers, Locales>
              : Id extends "referContent"
                ? TypeReferContent<Modifiers, Locales>
                : never;
