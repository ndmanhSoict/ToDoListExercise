import type React from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonBasicProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

const ButtonBasic: React.FC<ButtonBasicProps> = ({
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
        `block mx-auto w-fit text-white rounded-full transition-colors hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-80`,
        className,
      )}
      {...props}
    >
      {title}
    </button>
  );
};

export default ButtonBasic;
