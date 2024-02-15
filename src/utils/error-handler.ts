import type { NextApiResponse } from "next";
import { HttpStatusCode } from "../types";

export const apiErrorHandler = (err: unknown, res: NextApiResponse): void => {
  // Log errors
  console.error(err);
  if (err instanceof Error) {
    res
      .status(HttpStatusCode.InternalServerError)
      .json({ errors: [{ message: err.message }] });
    return;
  }
  res.status(HttpStatusCode.InternalServerError).json({
    errors: err,
  });
};
