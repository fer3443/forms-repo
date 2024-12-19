import { FormValuesSms } from "@/interfaces/atoms/form-schema-sms";
import { ParamsSmsData } from "@/interfaces/general-values";

// function axiosPromise(
//   spec: {
//     [key: string]: any;
//   }
// ) {
//   const apiSpec = transformSpec(spec);
//   return updateSistemConfig(apiSpec);


// }
export function transformSpecSms(
  spec: FormValuesSms
) {
  const apiSpec:ParamsSmsData = {
    sms_usuario: spec.sms_user,
    sms_clave: spec.sms_password,
    sms_texto_cumple: spec.sms_text_bday,
    sms_texto_turnos: spec.sms_text_turns,
  };
  return apiSpec;
}