import { FormValues } from "@/interfaces/atoms/form-schema";
import { Params } from "@/interfaces/general-values";
import { REGIONES, TAXES } from "@/utils/constants/general-data";

export function transformSpec(spec:FormValues) {

  const regionValue = REGIONES.find((item) => item.id_country === spec.id_country)
  const taxValue = TAXES.find((item) => item.id_category === spec.tax_category)

  const apiSpec:Params = {
    nombre: spec.name,
    direccion: spec.address,
    cuit: spec.cuit,
    email: spec.email,
    telefono: spec.phone,
    cond_fiscal: taxValue!.value,
    doble_moneda: spec.use_usd,
    what_region: regionValue!.value,
  };
  return apiSpec;
}