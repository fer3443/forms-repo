import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const formSchema = z.object({
  name: z.string(),
  address: z.string(),
  phone: z.string(),
  email: z.string().email(),
  cuit: z.string(),
  tax_category: z.number(),
  id_country: z.number(),
  use_usd: z.boolean(),
});

export const resolver = zodResolver(formSchema);

export type FormValues = z.infer<typeof formSchema>;
