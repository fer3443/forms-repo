import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const formSchemaVarious = z.object({
  hc_from: z.coerce.number(),
  schedule_aca: z.boolean(),
  schedule_alert: z.boolean(),
  lender_code: z.string(),
});

export const resolver = zodResolver(formSchemaVarious)

export type FormValuesVarious = z.infer<typeof formSchemaVarious>;