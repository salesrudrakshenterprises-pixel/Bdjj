'use client';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  icon?: React.ReactNode;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  textarea?: boolean;
  rows?: number;
}

export function InputField({
  label,
  name,
  type = 'text',
  placeholder,
  required = false,
  error,
  icon,
  value,
  onChange,
  textarea = false,
  rows = 4,
}: InputFieldProps) {
  const [focused, setFocused] = useState(false);

  const inputClasses = cn(
    'w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none transition-all duration-300',
    'focus:border-[#C8A45C] focus:ring-1 focus:ring-[#C8A45C]/30',
    error ? 'border-red-500' : 'border-white/10',
    icon && 'pl-10'
  );

  const Tag = textarea ? 'textarea' : 'input';

  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-300">
        {label}
        {required && <span className="text-[#C8A45C] ml-1">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <div className={cn(
            'absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-300',
            focused && 'text-[#C8A45C]'
          )}>
            {icon}
          </div>
        )}
        <Tag
          id={name}
          name={name}
          type={textarea ? undefined : type}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          rows={textarea ? rows : undefined}
          className={cn(inputClasses, textarea && 'resize-none min-h-[100px]')}
        />
      </div>
      {error && (
        <p className="text-red-400 text-xs mt-1">{error}</p>
      )}
    </div>
  );
}
