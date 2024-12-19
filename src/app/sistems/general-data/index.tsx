"use client";

import classnames from "classnames";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Checkbox,
  Combobox,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/atoms";
import { formSchema, resolver } from "@/interfaces/atoms/form-schema";
import { Regions } from "@/interfaces/general-values";
import { Pencil } from "lucide-react";
import { transformSpec } from "@/actions/transform-spec";
import { REGIONES, TAXES, TESTOBJECT } from "@/utils/constants/general-data";

export const GeneralDataView = ({
  params,
  regions,
}: {
  params: any;
  regions: Regions[];
}) => {
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  const [isModifying, setIsModifying] = React.useState<boolean>(false);

  //TODO: Reciben strings de params y regions y devuelven el objeto con los ids
  const regionId = REGIONES.find((item) => item.value === TESTOBJECT.what_region)
  const taxId = TAXES.find((item) => item.value === TESTOBJECT.tax_category)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: resolver,
    defaultValues: {
      name: TESTOBJECT.name || "",
      address: TESTOBJECT.address || "",
      phone: TESTOBJECT.phone || "",
      email: TESTOBJECT.email || "",
      cuit: TESTOBJECT.cuit || "",
      tax_category: taxId?.id_category || 1,
      id_country: regionId?.id_country || 1,
      use_usd: TESTOBJECT.use_usd || false,
    },
  });

  const onsubmit = async (values: z.infer<typeof formSchema>) => {
    const resp = transformSpec(values);
    console.log({ resp });
  };

  return (
    <div className="relative w-full">
      <Button
        onClick={() => {
          setIsModifying(true);
          nameInputRef && nameInputRef?.current?.focus();
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
            <h1 className="text-2xl">Datos Generales</h1>
          </CardTitle>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onsubmit)}
                className="w-full grid grid-cols-4 gap-10 space-y-2 mt-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Juan Perez"
                          maxLength={40}
                          {...field}
                          ref={nameInputRef}
                          autoFocus
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dirección</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Calle 123"
                          maxLength={35}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teléfono</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="123456789"
                          maxLength={14}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="juan@mail.com"
                          maxLength={20}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cuit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CUIT</FormLabel>
                      <FormControl>
                        <Input placeholder="1234567890" max={20} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Faltan clases para el content del combo */}
                <Combobox
                  form={form}
                  data={TAXES}
                  dataKey="id_category"
                  value="description"
                  placeholder="MONOTRIBUTISTA"
                  title="Condición fiscal"
                  classname={""}
                  classContent="!w-auto"
                  label="Condición fiscal"
                  showInputSearch={false}
                />
                <Combobox
                  form={form}
                  data={REGIONES}
                  dataKey="id_country"
                  value="description"
                  placeholder="ARGENTINA"
                  title="País"
                  classname={""}
                  classContent="min-w-[220px] !w-auto"
                  label="País"
                  showInputSearch={false}
                />
                <div>
                  <FormField
                    control={form.control}
                    name="use_usd"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Usar doble moneda</FormLabel>
                          <FormDescription className="text-xs">
                            Permite a los usuarios cargar prestaciones y pagos
                            en USD.
                          </FormDescription>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center gap-x-6 mt-4">
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
        </CardHeader>
      </Card>
    </div>
  );
};
