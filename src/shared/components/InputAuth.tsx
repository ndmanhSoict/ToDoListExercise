import { type ReactNode } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import type { RegisterSchema } from '../../features/auth/schemas/authSchema';

export default function InputAuth({
  form,
  type,
  name,
  iconleft,
  iconright,
  className,
  placeholder,
  required,
  namevalidate,
}: {
  form: UseFormReturn<RegisterSchema>;
  type: string;
  name: string;
  required?: boolean;
  iconleft?: ReactNode;
  iconright?: ReactNode;
  className?: string;
  placeholder?: string;
  namevalidate?: keyof RegisterSchema | undefined;
}) {
  const {
    register,
    formState: { errors },
  } = form;

  const error =
    namevalidate && typeof namevalidate === 'string'
      ? (errors[namevalidate]?.message as string | undefined)
      : undefined;

  return (
    <div className={twMerge('mb-4 ', className)}>
      <label htmlFor={name} className="block mb-1">
        {name.charAt(0).toUpperCase() + name.slice(1)}:
      </label>
      <div className="relative">
        {iconleft && (
          <div className="absolute left-2 top-1/2 transform -translate-y-1/2 leading-none">
            {iconleft}
          </div>
        )}
        <input
          className="border border-gray-300 p-3 rounded-full w-full px-[2.5rem] focus:outline-none focus:ring-2 focus:ring-blue-500 align-middle !leading-none"
          {...(namevalidate ? register(namevalidate) : {})}
          type={type}
          name={name}
          placeholder={placeholder || ''}
          required={required}
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
