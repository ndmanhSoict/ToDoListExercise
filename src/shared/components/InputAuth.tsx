import { type ReactNode } from 'react';

export default function InputAuth({
  type,
  name,
  iconleft,
  iconright,
}: {
  type: string;
  name: string;
  iconleft?: ReactNode;
  iconright?: ReactNode;
}) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block mb-1">
        {name.charAt(0).toUpperCase() + name.slice(1)}:
      </label>
      <div className="relative">
        {iconleft && (
          <div className="absolute left-2 top-1/2 transform -translate-y-1/2">{iconleft}</div>
        )}
        <input
          id={name}
          className="border border-gray-300 p-2 rounded-full w-full"
          type={type}
          name={name}
        />
        {iconright && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">{iconright}</div>
        )}
      </div>
    </div>
  );
}
