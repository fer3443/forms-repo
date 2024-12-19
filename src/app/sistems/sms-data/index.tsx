"use client";

import classnames from "classnames";
import { Pencil } from "lucide-react";
import React, { useRef } from "react";
import { FiInfo, FiEyeOff, FiEye } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Separator,
  Textarea,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/atoms";
import { transformSpecSms } from "@/actions/transform-spec-sms";
import { formSchemaSms, resolver } from "@/interfaces/atoms/form-schema-sms";

export const SmsDataView = ({
  params,
  onchange,
}: {
  params: any;
  onchange: () => void;
}) => {
  const inputUserRef = useRef<HTMLInputElement | null>(null);
  const [isModifying, setIsModifying] = React.useState<boolean>(false);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const toggle = () => setShowPassword(!showPassword)

  const content = {
    CONTENT_TEXT_BDAY:
      "<< PACIENTE >>, desde << CLINICA >>, deseamos a Ud. muy feliz día!!!",
    CONTENT_TEXT_TURNS:
      "<< PACIENTE >> Recordamos su turno del día <<DIA>>, a las <<HORA>> hs., con el/la Dr/a. <<PROFESIONAL>>. De no concurrir por favor responda 0 (Cero)",
    CONTENT_TOOLTIP: `
    Parámetros para reemplazar valores en el mensaje:
    << PACIENTE >> Nombre del paciente del turno que se visualiza en el listado.
    << DIA >> Fecha del día seleccionado.
    << HORA >> Hora del turno que se visualiza en el listado.
    << CLINICA >> Nombre de su clínica.
    << PROFESIONAL >> Nombre del profesional del turno que se visualiza en el listado.
    `,
  };

  const form = useForm({
    resolver: resolver,
    defaultValues: {
      sms_user: "",
      sms_password: "",
      sms_text_bday: content.CONTENT_TEXT_BDAY,
      sms_text_turns: content.CONTENT_TEXT_TURNS,
    },
  });

  const onsubmit = (values: z.infer<typeof formSchemaSms>) => {
    const resp = transformSpecSms(values);
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
            "pointer-events-none cursor-not-allowed grayscale-[50%]": !isModifying,
          }
        )}
      >
        <CardHeader>
          <CardDescription>
            <h3>
              Inserta tu usuario y contraseña de SMS sugerida por BILOG, o edita
              y añade la de tu preferencia.
            </h3>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onsubmit)}>
              <div
                className={classnames(
                  "flex flex-col space-y-4 gap-4 text-slate-800")}
              >
                <div className="grid grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="sms_user"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Usuario*</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Ingrese aquí"
                            ref={inputUserRef}
                            autoFocus
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="sms_password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contraseña*</FormLabel>
                        <FormControl>
                          <div className="relative flex justify-between">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Escribe tu contraseña aquí"
                              {...field}
                            />
                            <span
                              onClick={toggle}
                              className="absolute right-3 top-3 cursor-pointer text-slate-600"
                            >
                              {showPassword ? <FiEyeOff /> : <FiEye />}
                            </span>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Separator className="my-4" />
                <div className="flex flex-col justify-center space-y-2">
                  <div className="w-full flex justify-between">
                    <h2
                      className={classnames("text-xl font-semibold text-slate-800")}
                    >
                      Mensajes
                    </h2>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <FiInfo size={25} />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-[300px]">{content.CONTENT_TOOLTIP}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <h3 className="text-sm text-slate-600">
                    En esta sección vas a poder definir mensajes personalizados
                    de cumpleaños y avisos de turnos.
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="sms_text_bday"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Saludos de cumpleaños</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us a little bit about yourself"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="sms_text_turns"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Avisos al paciente</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us a little bit about yourself"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="self-end flex items-center gap-x-6">
                  <Button
                    variant="outline"
                    className="border-red-500 text-red-500 hover:text-slate-50 hover:bg-red-500 rounded-md"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    className={classnames("!bg-blue-500 !hover:bg-blue-300", {
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
