import type { EntryCollection, EntrySkeletonType } from "contentful";
import { z } from "zod";
import { contentfulClient } from "../contentful";
import parseSortString from "./sort-string-parser";

const ParamsSchema = z
  .object({
    contentType: z.string(),
    locale: z.string().optional(),
    sort: z.union([z.array(z.string()), z.string()]).optional(),
  })
  .catchall(z.string());

export const getContentEntries = async (
  options: Record<string, unknown>,
): Promise<EntryCollection<EntrySkeletonType, undefined, string>> => {
  const params = ParamsSchema.parse(options);
  const { contentType, locale, sort, ...filter } = params;
  // typecasted as any so we can accept field as well
  const order: any =
    typeof sort === "string"
      ? [...sort]
      : sort?.map((sortStr) => {
          const { field, direction } = parseSortString(sortStr);

          return `${direction}field.${field}`;
        });
  return await contentfulClient.getEntries({
    content_type: contentType,
    select: ["fields", "metadata.tags", "sys.id"],
    locale,
    order,
    ...filter,
  });
};
