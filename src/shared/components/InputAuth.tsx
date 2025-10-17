import { type ReactNode } from 'react';
import type { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

export default function InputAuth<T extends FieldValues>({
  form,
  type,
  label,
  iconleft,
  iconright,
  className,
  placeholder,
  required,
  nameValidate,
  propOnChange,
}: {
  form: UseFormReturn<T>;
  type: string;
  label: string;
  required?: boolean;
  iconleft?: ReactNode;
  iconright?: ReactNode;
  className?: string;
  placeholder?: string;
  nameValidate?: Path<T>;
  propOnChange?: (email: string) => void;
}) {
  const {
    register,
    trigger,
    formState: { errors },
  } = form;

  const error =
    nameValidate && typeof nameValidate === 'string'
      ? (errors[nameValidate]?.message as string | undefined)
      : undefined;

  return (
    <div className={twMerge('mb-4 ', className)}>
      <label htmlFor={label} className="block mb-1">
        {label.charAt(0).toUpperCase() + label.slice(1)}:
      </label>
      <div className="relative ">
        {iconleft && (
          <div className="absolute left-2 top-1/2 transform -translate-y-1/2 leading-none">
            {iconleft}
          </div>
        )}
        <input
          className="border border-gray-300 p-3 rounded-full w-full px-[2.5rem] focus:outline-none focus:ring-2 focus:ring-blue-500 align-middle !leading-none outline outline-transparent hover:outline-blue-400"
          {...(nameValidate ? register(nameValidate) : {})}
          type={type}
          placeholder={placeholder || ''}
          required={required}
          onBlur={async (e) => {
            if (propOnChange && nameValidate) {
              const isValid = await trigger(nameValidate);
              if (isValid) {
                const value = e.target.value;
                console.log(value);
                if (value) {
                  propOnChange(value as string);
                }
              }
            }
          }}
        />
        {iconright && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 leading-none">
            {iconright}
          </div>
        )}
      </div>
      <pre className="text-red-500 text-sm">{error ? error : ' '}</pre>
    </div>
  );
}
