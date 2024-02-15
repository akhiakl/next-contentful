import type { NextApiRequest, NextApiResponse } from "next";
import { HttpStatusCode } from "../types";
import { apiErrorHandler, getContentEntries } from "../utils";

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
