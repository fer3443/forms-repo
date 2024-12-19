import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const formSchemaSms = z.object({
  sms_user: z.string(),
  sms_password: z.string(),
  sms_text_bday: z.string(),
  sms_text_turns: z.string(),
});

export const resolver = zodResolver(formSchemaSms);

export type FormValuesSms = z.infer<typeof formSchemaSms>;
