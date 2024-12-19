export type ParamsTest = {
  name: string;
  address: string;
  phone: string;
  email: string;
  cuit: string;
  tax_category: string;
  what_region: string,
  use_usd: boolean;
};

export type Params = {
  nombre: string,
  direccion: string,
  cuit: string,
  email: string,
  telefono: string,
  cond_fiscal: string,
  doble_moneda: boolean,
  what_region: string,
}

export type Regions = {
  id_country: number;
  value: string;
  description: string;
};
export type Taxes = {
  id_category: number;
  value: string;
  description: string;
};

export type ParamsSmsData = {
  sms_usuario: string;
  sms_clave: string;
  sms_texto_cumple: string;
  sms_texto_turnos: string;
};

export type ParamsVarious = {
  h_clinica_desde: number;
  ag_aca: boolean;
  ag_alerta: boolean;
  cod_prest_bilog: string;
};
