'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface CheckboxProps {
  title: string;
  checked: boolean;
  setChecked: (value: boolean) => void;
}

export default function CustomCheckbox({
  title,
  checked,
  setChecked,
}: CheckboxProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Checkbox
          className="checked:text-blue-400"
          id={title}
          checked={checked}
          onCheckedChange={(val) => setChecked(!!val)}
        />
        <Label
          htmlFor={title}
          className={`cursor-pointer font-medium text-white/70 transition-colors duration-200 ${checked ? 'text-blue-400' : ''}`}
        >
          {title}
        </Label>
      </div>
    </div>
  );
}
