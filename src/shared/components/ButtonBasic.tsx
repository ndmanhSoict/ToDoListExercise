import { twMerge } from 'tailwind-merge';

export default function ButtonBasic({
  title,
  className,
  onClick,
  type = 'button',
  disabled,
}: {
  title: string;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={twMerge(
        `block mx-auto w-fit text-white rounded-full transition-colors hover:cursor-pointer ${disabled ? 'hover:cursor-not-allowed' : ''}`,
        className,
      )}
    >
      {title}
    </button>
  );
}
