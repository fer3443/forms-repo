import { ParamsTest, ParamsVarious, Regions, Taxes, WhatsAppTemplateBirthday, WhatsAppTemplateTurns } from "@/interfaces/general-values";

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

// export const TEMPLATESTURNS:WhatsAppTemplateTurns[] = [
//   { id_template_turns: 1, value: "Plantilla 1"},
//   { id_template_turns: 2, value: "Plantilla 2"},
//   { id_template_turns: 3, value: "Plantilla 3"},
// ]

// export const TEMPLATESBIRTHDAYS:WhatsAppTemplateBirthday[] = [
//   { id_template_birthday: 1, value: "Plantilla 1"},
//   { id_template_birthday: 2, value: "Plantilla 2"},
//   { id_template_birthday: 3, value: "Plantilla 3"},
// ]

export const WHATTEMPLATESTURNS:WhatsAppTemplateTurns[] = [
  { id_template_turns: 1, src: "/images/placeholder.jpg", value: "Template 1" },
  { id_template_turns: 2, src: "/images/placeholder.jpg", value: "Template 2" },
  { id_template_turns: 3, src: "/images/placeholder.jpg", value: "Template 3" },
];
export const WHATTEMPLATESBIRTHDAY:WhatsAppTemplateBirthday[] = [
  { id_template_birthday: 1, src: "/templates/template1.jpg", value: "Template 1" },
  { id_template_birthday: 2, src: "/templates/template2.jpg", value: "Template 2" },
  { id_template_birthday: 3, src: "/templates/template3.jpg", value: "Template 3" },
];

export const TEMPS = {
  tuns: [
    { id_template_turns: 1, src: "/images/placeholder.jpg", value: "Template 1" },
    { id_template_turns: 2, src: "/images/placeholder.jpg", value: "Template 2" },
    { id_template_turns: 3, src: "/images/placeholder.jpg", value: "Template 3" },
  ],
  turns_office: [
    {what_template_turns: "temp2"}
  ],
  birthday: [
    { id_template_turns: 1, src: "/images/placeholder.jpg", value: "Template 1" },
    { id_template_turns: 2, src: "/images/placeholder.jpg", value: "Template 2" },
    { id_template_turns: 3, src: "/images/placeholder.jpg", value: "Template 3" },
  ]
}