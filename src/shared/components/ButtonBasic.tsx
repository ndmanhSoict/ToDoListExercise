import type React from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonBasicProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

export const ButtonBasic: React.FC<ButtonBasicProps> = ({
  title,
  className,
  ...props
}: {
  title: string;
  className?: string;
}) => {
  return (
    <button
      className={twMerge(
        `block mx-auto w-fit text-white rounded-full transition-colors hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 px-6 py-2 bg-blue-600 hover:bg-blue-700`,
        className,
      )}
      {...props}
    >
      {title}
    </button>
  );
};
