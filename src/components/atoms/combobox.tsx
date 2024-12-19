"use client";

import * as React from "react";
import { LuCheck as Check, LuChevronDown } from "react-icons/lu";
import classNames from "classnames";
import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandList,
  CommandInput,
  CommandItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Label,
} from "@/components/atoms";

type ComboboxProps = {
  data: any[];
  dataKey: string;
  form: any;
  placeholder?: string;
  title?: string;
  value: string;
  disabled?: boolean;
  showInputSearch?: boolean;
  classname?: string;
  classContent?: string;
  label?: string;
};

export const Combobox: React.FC<ComboboxProps> = ({
  data,
  dataKey,
  form,
  value,
  placeholder = "Selecciona un item...",
  title = "Selecciona un item...",
  disabled,
  showInputSearch = true,
  classname,
  classContent = "!w-80",
  label,
}) => {
  const [open, setOpen] = React.useState(false);
  const formValue = form.getValues();
  const [filterData, setFilterData] = React.useState(data);
  const handleSelect = (selectedValue: any) => {
    const selectedItem = data?.find((item: any) =>
      [Number(selectedValue), selectedValue].includes(item[dataKey])
    );

    form.setValue(dataKey, selectedItem[dataKey]);
  };
  const DEFAULT_ITEM =
    data?.find((item: any) => item[dataKey] === formValue[dataKey])?.[value] ||
    placeholder;

  React.useEffect(() => {
    setFilterData(data);
  }, [data]);

  return (
    <div className={classname}>
      <Label>{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            disabled={disabled}
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={classNames(
              "w-full mt-1 justify-between flex h-10 px-3 rounded-md border flex-1",
              classname
            )}
          >
            <span className="truncate">{DEFAULT_ITEM}</span>
            <LuChevronDown
              className={classNames(
                "ml-2 h-4 w-4 shrink-0 opacity-50 transition-all",
                {
                  "transform rotate-180": open,
                }
              )}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className={classContent} usePortal={false}>
          <Command
            filter={(_key, search) => {
              const filteredData = data?.filter((item) =>
                item[value]
                  ?.toLocaleLowerCase()
                  .includes(search.toLocaleLowerCase())
              );

              search.length > 0
                ? setFilterData(filteredData)
                : setFilterData(data);

              return filteredData.length > 0 ? 1 : 0;
            }}
          >
            {showInputSearch && (
              <CommandInput
                className="!border-b"
                placeholder={placeholder}
                onValueChange={(input) => {
                  const filteredData = data?.filter((item) =>
                    item[value]
                      ?.toLocaleLowerCase()
                      .includes(input.toLocaleLowerCase())
                  );

                  input.length <= 0
                    ? setFilterData(data)
                    : setFilterData(filteredData);
                }}
              />
            )}
            <CommandList className="max-h-44">
              <CommandEmpty>{`No se encontró ningún ${title.toLowerCase()}.`}</CommandEmpty>
              <CommandGroup>
                {filterData?.map((item: any) => (
                  <CommandItem
                    className="!w-full hover:bg-slate-200 rounded-md"
                    key={item[dataKey]}
                    value={item[dataKey]?.toString()}
                    onSelect={(currentValue) => {
                      handleSelect(currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={classNames(
                        "mr-2 h-4 w-4",
                        formValue[dataKey] &&
                          item[dataKey] === formValue[dataKey]
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {item[value]}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};