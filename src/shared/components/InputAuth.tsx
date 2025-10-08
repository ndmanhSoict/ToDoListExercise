import { type ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export default function InputAuth({
  type,
  name,
  iconleft,
  iconright,
  className,
  placeholder,
}: {
  type: string;
  name: string;
  iconleft?: ReactNode;
  iconright?: ReactNode;
  className?: string;
  placeholder?: string;
}) {
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
          id={name}
          className="border border-gray-300 p-3 rounded-full w-full px-[2.5rem] focus:outline-none focus:ring-2 focus:ring-blue-500 align-middle !leading-none"
          type={type}
          name={name}
          placeholder={placeholder || ''}
        />
        {iconright && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 leading-none">
            {iconright}
          </div>
        )}
      </div>
    </div>
  );
}
