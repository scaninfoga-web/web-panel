import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { cn } from '@/lib/utils';

interface RadioOption {
  label: string;
  value: string;
}

interface FormRadioGroupProps {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  options: RadioOption[];
  className?: string;
}

export function FormRadioGroup({
  form,
  name,
  label,
  options,
  className,
}: FormRadioGroupProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div
              className={cn(
                'flex justify-between gap-4 rounded-lg bg-[#0A0D14] p-2',
                className,
              )}
            >
              {options.map((option) => (
                <label
                  key={option.value}
                  className="flex cursor-pointer items-center space-x-2"
                >
                  <input
                    type="radio"
                    {...field}
                    value={option.value}
                    checked={field.value === option.value}
                    className="h-4 w-4 border-gray-300 text-emerald-500 accent-emerald-500 focus:ring-0 focus:ring-offset-0"
                  />
                  <span className="text-sm text-gray-200">{option.label}</span>
                </label>
              ))}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
