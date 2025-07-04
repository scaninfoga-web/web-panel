import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import React from 'react';

interface Props {
  list: {
    value: string;
    label: string;
  }[];
  selected?: string;
  searchNeed?: boolean;
  onSelect?: (data: string) => void | Promise<void>;
}

export function CustomCombox({
  list,
  onSelect,
  selected,
  searchNeed = true,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(selected || '');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between rounded-none hover:border-slate-600"
        >
          {value
            ? list.find((item) => item.value === value)?.label
            : 'Select ...'}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="gr w-[300px] border-2 border-slate-800 p-0">
        <Command className="">
          {searchNeed && (
            <CommandInput className="bg-slate-950" placeholder="Search ..." />
          )}

          <CommandList>
            <CommandEmpty>No Previous Data.</CommandEmpty>
            <CommandGroup className="bg-slate-900">
              {list.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? value : currentValue);
                    setOpen(false);
                    if (onSelect) {
                      onSelect(currentValue);
                    }
                  }}
                  className="hover:cursor-pointer"
                >
                  <CheckIcon
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === item.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
