"use client";

import React from 'react';
import { transformSpec } from "@/actions/transform-spec-whats";
import { Button, Form, Subtitle } from "@/components/atoms";
import {
  FormValuesWhatsApp,
  resolver,
} from "@/interfaces/atoms/form-schema-whatsapp";
import { TEMPS } from "@/utils/constants/general-data";
import { useForm } from "react-hook-form";
import { WhatsappCarousel } from "./WhatsappCarousel";

type Props = {
  params: any;
  temps: any;
  offices: any[];
  onChange: () => void;
  getTemplates: () => void;
};

export const WhatsAppDataView = ({
  params,
  temps,
  offices = [],
  onChange,
  getTemplates,
}: Props) => {

  // const [formHeight, setFormHeight] = React.useState('705px');

  // React.useEffect(() => {
  //   async function handleWappTemplates() {
  //     await getTemplates('templates');
  //   }
  //   handleWappTemplates();
  // }, []);

  // React.useEffect(() => {
  //   if (window) {
  //     const height = `${window.innerHeight - 205}px`;
  //     setFormHeight(height);
  //   }
  // }, []);
  
  const form = useForm({
    resolver: resolver,
    defaultValues: {
      // what_template_turns: params?.what_template_turns || "",
      what_template_turns: "",
      // what_template_birthday: params?.what_template_birthday || "",
      what_template_birthday: "",
    },
  });

  const onsubmit = async (values: FormValuesWhatsApp) => {
    const resp = transformSpec(values)
    console.log({resp})
  };
  return (
    <div className="container mx-auto my-4">
      <Subtitle>Plantillas de turnos</Subtitle>
      <p className="mb-4 text-base font-regular text-neutral-500">
        Estas son todas las plantillas para el envío de recordatorio de turnos.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onsubmit)}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <WhatsappCarousel
                data={TEMPS.tuns}
                name="what_template_turns"
                // component={Templates}
                form={form}//!Borrar
              />
            </div>
            {/* {
                  offices?.length && temps.turns_office ? (
                    <div>
                    <Subtitle>Plantillas con sucursales</Subtitle>
                    <p className="mb-4 text-base font-regular text-neutral-500">Estas son todas las plantillas para el envío de recordatorio de
                    turnos con sucursales.</p>
                    <WhatsappCarousel
                    data={temps.turns_office}
                    name="what_template_turns"
                    component={Templates}
                    />
                    </div>
                  ) : null
                } */}
            <div className="grid gap-2">
              <Subtitle>Plantillas de cumpleaños</Subtitle>
              <p className="mb-4 text-base font-regular text-neutral-500">
                Estas son todas las plantillas para el envío de felicitaciones
                de cumpleaños.
              </p>
              {TEMPS.birthday && (
                <WhatsappCarousel
                  data={TEMPS.birthday}
                  name="what_template_birthday"
                  // component={Templates}
                  form={form}//!Borrar
                />
              )}
            </div>
            <Button
              className="justify-self-end !bg-blue-500 text-white rounded-md hover:!bg-blue-300"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              Guardar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
