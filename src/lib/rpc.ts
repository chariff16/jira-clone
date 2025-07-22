import { hc } from "hono/client";
import { AppType } from "@/app/api/[[...route]]/route";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL

export const client = hc<AppType>(baseUrl!);