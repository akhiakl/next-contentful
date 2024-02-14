import type { CreateClientParams } from "contentful";
import { createClient } from "contentful";

const Str = (str?: string): string => str ?? "";

const config: CreateClientParams = {
  accessToken: Str(
    process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN ??
      process.env.CONTENTFUL_ACCESS_TOKEN,
  ),
  space: Str(
    process.env.NEXT_PUBLIC_CONTENTFUL_SPACE ?? process.env.CONTENTFUL_SPACE,
  ),
  environment: Str(
    process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT ??
      process.env.CONTENTFUL_ENVIRONMENT,
  ),
};

const client = createClient(config);

export default client;
