import { twMerge } from 'tailwind-merge';

export default function ButtonBasic({
  title,
  className,
  onClick,
}: {
  title: string;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
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
