import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
 Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { FieldValues } from "react-hook-form";
import { FormDateInputProps, FormInputProps } from "@/types/utils"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format, getDay, getMonth, getYear } from "date-fns";
import { Textarea } from "./ui/textarea";

export function InputField<T extends FieldValues>({
  type,
  name,
  control,
  inputClasses,
  placeholder,
  disabled,
  label,
  id,
  formState,
}: FormInputProps<T>) {
  const { errors, dirtyFields, touchedFields } = formState;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='w-full bg-transparent'>
          {label && (
            <FormLabel
              htmlFor={id}
              className={cn("text-black text-base font-normal dark:text-white w-full")}
            >
              {label}
            </FormLabel>
          )}

          <FormControl>
            <Input
              {...field}
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              id={id}
              className={cn(
                "h-auto p-3 rounded-lg md:bg-background bg-transparent text-black shadow-none placeholder:text-foreground/30 border-input focus-visible:ring-transparent focus-visible:border-2 focus-visible:border-input dark:text-white w-full",
                inputClasses,

                {
                  "border-warning focus-visible:border-warning": errors[name],
                },
                {
                  "border-input focus-visible:border-primary ": !errors[name],
                },
                {
                  "border-input focus-visible:border-input":
                    touchedFields[name],
                }
              )}
            />
          </FormControl>
          <div>
            {dirtyFields[name] && (
            <FormMessage
              className={cn(
                "w-fit bg-warning/20 p-3 rounded-lg text-warning text-xs"
              )}
            />
          )}
          </div>
          
        </FormItem>
      )}
    />
  );
}

export function DateInputField<T extends FieldValues>({
  control,
  name,
  id,
  label,
    dateClass,
  formState
}: FormDateInputProps<T>) {

  const { errors, dirtyFields, touchedFields } = formState;
  return (
     <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem className="w-full">
                  <FormLabel htmlFor={id}>{label}</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                "h-auto p-3 rounded-lg md:bg-background bg-transparent text-black shadow-none placeholder:text-foreground/30  border-input focus-visible:ring-transparent focus-visible:border-2 focus-visible:border-input dark:text-white w-full",
                dateClass,

                {
                  "border-warning focus-visible:border-warning": errors[name],
                },
                {
                  "border-input focus-visible:border-primary ": !errors[name],
                },
                {
                  "border-input focus-visible:border-input":
                    touchedFields[name],
                }
              )} >
                      {field.value ? 
                        format(field.value, "PPP")
                       : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date()
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
  )
}


export function TextAreaField<T extends FieldValues>({
  
  name,
  control,
  inputClasses,
  placeholder,
  label,
  id,
  formState,
}: FormInputProps<T>) {
  const { errors, dirtyFields, touchedFields } = formState;

    return (
        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem className="w-full">
                  <FormLabel htmlFor={id}>{label}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={placeholder}
                   className={cn(
                "h-auto p-3 rounded-lg md:bg-background bg-transparent text-black shadow-none placeholder:text-foreground/30  border-input focus-visible:ring-transparent focus-visible:border-2 focus-visible:border-input dark:text-white w-full resize-none",
                inputClasses,

                {
                  "border-warning focus-visible:border-warning": errors[name],
                },
                {
                  "border-input focus-visible:border-primary ": !errors[name],
                },
                {
                  "border-input focus-visible:border-input":
                    touchedFields[name],
                }
              )}
                  {...field}
                />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
    )
}