"use client";

import React from "react";
import classnames from "classnames";
import { Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Separator,
} from "@/components/atoms";
import {
  formSchemaVarious,
  resolver,
} from "@/interfaces/atoms/form-schema-various";
import { ParamsVarious } from "@/interfaces/general-values";
import { TESTOBJECTVARIOUS } from "@/utils/constants/general-data";
import { transformSpec } from "@/actions/transform-spec-various";

export const VariosDataView = ({
  params,
  onChange,
}: {
  params: any;
  onChange: () => void;
}) => {
  const inputUserRef = React.useRef<HTMLInputElement | null>(null);
  const [isModifying, setIsModifying] = React.useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchemaVarious>>({
    resolver: resolver,
    defaultValues: {
      hc_from: TESTOBJECTVARIOUS.h_clinica_desde || 1,
      schedule_aca: TESTOBJECTVARIOUS.ag_aca || true,
      schedule_alert: TESTOBJECTVARIOUS.ag_alerta || true,
      lender_code: TESTOBJECTVARIOUS.cod_prest_bilog || "",
    },
  });

  const onsubmit = async (values: z.infer<typeof formSchemaVarious>) => {
    const resp = transformSpec(values)
    console.log({ resp });
  };
  return (
    <div className="w-full relative">
      <Button
        onClick={() => {
          setIsModifying(true);
          inputUserRef && inputUserRef?.current?.focus();
        }}
        variant="ghost"
        className="absolute z-10 top-4 right-4 text-blue-500 hover:underline hover:bg-transparent hover:text-blue-500"
      >
        <span className="text-base">Editar</span>
        <Pencil className="cursor-pointer rounded-md size-4" />
      </Button>
      <Card
        className={classnames(
          "w-full space-y-4 mt-4 !p-0 !border-none !shadow-none",
          {
            "pointer-events-none cursor-not-allowed grayscale-[50%]":
              !isModifying,
          }
        )}
      >
        <CardHeader>
          <CardTitle>
            <h2>Numeración de Historias Clínicas en Pacientes</h2>
          </CardTitle>
          <CardDescription>
            <p>
              Las historias clínicas serán numeradas automáticamente por el
              sistema a partir:
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onsubmit)}>
              <div className="flex flex-col space-y-6">
                <div className="grid grid-cols-3">
                  <FormField
                    control={form.control}
                    name="hc_from"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Número (0 = Automatico)"
                            ref={inputUserRef}
                            autoFocus
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <h2 className="font-semibold">Agenda de Turnos</h2>
                  <h3 className="text-slate-500 text-sm">Configuraciones sobre la agenda de turnos.</h3>
                </div>
                <div className="grid grid-cols-2">
                  <FormField
                    control={form.control}
                    name="schedule_aca"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            <span className="font-semibold">Al marcar un turno como ACA, moverlo al próximo
                            minuto disponible.</span>
                          </FormLabel>
                          <FormDescription className="text-xs">
                            Cuando se marque un turno como ausente con aviso, se
                            replicará con un minuto adelantado de diferencia.
                          </FormDescription>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="schedule_alert"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                           <span className="font-semibold">Al dar un nuevo turno mostrar la alerta del
                           paciente.</span>
                          </FormLabel>
                          <FormDescription className="text-xs">
                            Si el paciente tiene una alerta, se mostrará cuando
                            se agende un nuevo turno.
                          </FormDescription>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Separator className="my-2" />
                <h2 className="font-semibold">Auditor Bilog</h2>
                <div className="grid grid-cols-3">
                  <FormField
                    control={form.control}
                    name="lender_code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Código Prestador</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="BIL1234" max={15} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex items-center justify-end gap-x-4">
                  <Button
                    variant="outline"
                    className="border-red-500 text-red-500 hover:text-slate-50 hover:bg-red-500 rounded-md"
                    onClick={() => setIsModifying(false)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    className={classnames("bg-blue-500 hover:bg-blue-400", {
                      "bg-blue-300": !form.formState.isDirty,
                    })}
                  >
                    Guardar
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
