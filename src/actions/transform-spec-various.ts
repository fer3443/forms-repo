import { FormValuesVarious } from "@/interfaces/atoms/form-schema-various";
import { ParamsVarious } from "@/interfaces/general-values";

// export function axiosPromise(spec: { [key: string]: any }, params: ParamsT) {
//   const apiSpec = transformSpec(spec, params);

//   return updateSistemConfig(apiSpec);
// }

export function transformSpec(spec:FormValuesVarious) {
  // interface ExtendedParamsT extends ParamsT {
  //   h_clinica_desde: string;
  //   ag_aca: string;
  //   ag_alerta: string;
  //   cod_prest_bilog: string;
  // }

  const apiSpec: ParamsVarious = {
    h_clinica_desde: spec.hc_from,
    ag_aca: spec.schedule_aca,
    ag_alerta: spec.schedule_alert,
    cod_prest_bilog: spec.lender_code,
  };

  return apiSpec;
}
