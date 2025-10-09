import { twMerge } from 'tailwind-merge';

export default function ButtonBasic({
  title,
  className,
  onClick,
  type = 'button',
}: {
  title: string;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={twMerge(
        `block mx-auto w-fit text-white rounded-full transition-colors hover:cursor-pointer`,
        className,
      )}
    >
      {title}
    </button>
  );
}
