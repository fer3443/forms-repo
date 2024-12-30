import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const formSchema = z.object({
  what_template_turns: z.string(),
  what_template_birthday: z.string(),
});

export const resolver = zodResolver(formSchema);

export type FormValuesWhatsApp = z.infer<typeof formSchema>;
