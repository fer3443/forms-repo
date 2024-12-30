
"use client"
import { FormControl, FormField, FormItem, FormLabel, FormMessage, RadioGroup, RadioGroupItem } from "@/components/atoms";
import clsx from "clsx";
import Image from "next/image";
import React from "react";

interface PropsWhatCarousel {
  data: any[];
  name: string;
  component?: React.ReactNode;
  form:any
}

export const WhatsappCarousel = ({
  data,
  name,
  component,
  form
}: PropsWhatCarousel) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            {/* para varias opciones se repiten foritem y formcontrol */}
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <div className="grid grid-cols-3 gap-x-6">
                {data.map((temp) => (
                  <FormItem
                    key={temp.id_template_turns}
                    className="flex items-center space-x-3 space-y-0"
                  >
                    <FormControl>
                      <RadioGroupItem value={temp.value} className="hidden" />
                    </FormControl>
                    <FormLabel
                      className={clsx(
                        "cursor-pointer border rounded-md overflow-hidden transform transition hover:scale-105",
                        field.value === temp.value
                          ? "border-blue-500 ring-2 ring-blue-400"
                          : "border-gray-300"
                      )}
                    >
                      <div className="overflow-hidden rounded-md">
                        <Image
                          src={temp.src}
                          alt={temp.value}
                          width={200}
                          height={350}
                          className="w-full object-cover"
                        />
                      </div>
                    </FormLabel>
                  </FormItem>
                ))}
              </div>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
