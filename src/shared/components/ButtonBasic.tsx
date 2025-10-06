import { twMerge } from 'tailwind-merge';

export default function ButtonBasic({
  title,
  color,
  className,
  onClick,
}: {
  title: string;
  color: string;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        `bg-${color}-500 text-white py-2 px-4 rounded-full hover:bg-${color}-700 transition-colors hover:cursor-pointer`,
        className,
      )}
    >
      {title}
    </button>
  );
}
