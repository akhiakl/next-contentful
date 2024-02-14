import type { NextApiRequest, NextApiResponse } from "next";
import type { EntryCollection, EntrySkeletonType } from "contentful";
import { HttpStatusCode } from "../types";
import { contentfulClient } from "../contentful";
import { apiErrorHandler, parseSortString } from "../utils";
import { z } from "zod";

const ParamsSchema = z
  .object({
    contentType: z.string(),
    locale: z.string().optional(),
    sort: z.union([z.array(z.string()), z.string()]).optional(),
  })
  .catchall(z.string().startsWith(""));

const getContentEntries = async (
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

export async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const { method, query, body } = req;
  try {
    switch (method) {
      case "GET": {
        const data = await getContentEntries(query);
        res.status(HttpStatusCode.Success).json({
          data,
        });
        break;
      }
      case "POST": {
        const data = await getContentEntries(body);
        res.status(HttpStatusCode.Success).json({
          data,
        });
        break;
      }
      default:
        res.setHeader("Allow", ["GET", "POST"]);
        res
          .status(HttpStatusCode.MethodNotAllowed)
          .end(`Method ${method} Not Allowed`);
        break;
    }
  } catch (err) {
    apiErrorHandler(err, res);
  }
}
