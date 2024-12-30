import { FormValuesWhatsApp } from "@/interfaces/atoms/form-schema-whatsapp";

export const transformSpec = (spec: FormValuesWhatsApp) => {
  const apiSpec = {
    what_template_turno: spec.what_template_turns,
    what_template_cumple: spec.what_template_birthday,
  };

  return apiSpec
}