'use client';

import { Check, ChevronsUpDown } from 'lucide-react';

import { cn, isFunction } from '@/lib/utils';
import { Button } from '@components/ui/Button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@components/ui/Command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/Popover';
import { useState } from 'react';

type ComboboxOption = {
  value: string;
  label: string;
};

type ComboboxProps = {
  name: string;
  options: ComboboxOption[];
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
};

export function Combobox(props: ComboboxProps) {
  const { name, options, searchQuery, onSearchChange } = props;

  const emptyText = `No ${name} found.`;
  const placeholder = `Search ${name}...`;
  const selectText = `Select ${name}...`;

  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-[200px] justify-between'
        >
          {searchQuery
            ? options.find((opt) => opt.value === searchQuery)?.label
            : selectText}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandEmpty>{emptyText}</CommandEmpty>
          <CommandGroup>
            {options.map((opt) => (
              <CommandItem
                key={opt.value}
                value={opt.value}
                onSelect={(currentValue) => {
                  if (isFunction(onSearchChange)) {
                    onSearchChange(
                      currentValue === searchQuery ? '' : currentValue
                    );
                  }
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    searchQuery === opt.value ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {opt.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
