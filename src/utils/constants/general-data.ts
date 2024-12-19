import { ParamsTest, ParamsVarious, Regions, Taxes } from "@/interfaces/general-values";

export const TESTOBJECT: ParamsTest = {
  name: "consultorio de prueba",
  address: "Av. Santa Fe 2222 pasaje 25",
  phone: "123456789",
  email: "emailtest@mail.com",
  cuit: "123456789",
  what_region: "ARG",
  tax_category: "RI",
  use_usd: false,
};

export const REGIONES: Regions[] = [
  { id_country: 1, value: "ARG", description: "Argentina" },
  { id_country: 2, value: "URG", description: "Uruguay" },
  { id_country: 3, value: "BRS", description: "Brasil" },
];
export const TAXES: Taxes[] = [
  { id_category: 1, value: "RI", description: "Responsable Inscripto" },
  { id_category: 2, value: "MO", description: "Montributista" },
];

export const TESTOBJECTVARIOUS:ParamsVarious = {
  h_clinica_desde: 1,
  ag_aca:true,
  ag_alerta:true,
  cod_prest_bilog: "CODIGO_PRESTADOR_01"
}