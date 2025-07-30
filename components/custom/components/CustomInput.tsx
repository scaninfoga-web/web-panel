import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { isValidIndianMobileNumber } from '../functions/checkingUtils';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  searchButton?: boolean;
  label: string;
  upperOnly?: boolean;
  placeholder: string;
  type: 'number' | 'text';
  handleSearch: (value: string) => void;
  validCheckFunction?: (value: string) => boolean;
  className?: string;
}

export default function CustomInputSearch({
  searchButton = true,
  className,
  label,
  upperOnly = false,
  placeholder,
  type,
  handleSearch,
  validCheckFunction,
}: Props) {
  const [searchInputValue, setSearchInputValue] = useState('');
  const [valid, setValid] = useState(false);
  return (
    <div className="flex min-h-full flex-col justify-between">
      <div className="flex flex-col space-y-1">
        <label className="text-sm text-gray-400" htmlFor={placeholder}>
          {label}
        </label>
        <Input
          id={label}
          placeholder={placeholder}
          type={type}
          value={searchInputValue}
          className={cn(
            'w-full border border-neutral-700 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
            className,
          )}
          onChange={(e) => {
            if (upperOnly) {
              setSearchInputValue(e.target.value.toUpperCase());
            } else {
              setSearchInputValue(e.target.value);
            }
            if (validCheckFunction) {
              setValid(validCheckFunction(e.target.value));
            }
          }}
          onKeyDown={(e) => {
            if (
              e.key === 'Enter' &&
              validCheckFunction &&
              validCheckFunction(searchInputValue)
            ) {
              handleSearch(searchInputValue);
            }
          }}
        />
        {!valid && searchInputValue.length > 0 && (
          <p className="text-sm text-red-500">
            Please enter a valid {label.toLowerCase()}
          </p>
        )}
      </div>

      {searchButton && (
        <Button
          className="mt-6 w-full bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20"
          disabled={!valid}
          onClick={() => {
            if (type === 'number') {
              const checkValid = isValidIndianMobileNumber(searchInputValue);
              if (checkValid.result) {
                handleSearch(checkValid.fixedNumber);
              }
            } else {
              handleSearch(searchInputValue);
            }
          }}
        >
          Click to Search
        </Button>
      )}
    </div>
  );
}
