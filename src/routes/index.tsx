import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <div className="text-center text-[var(--color-text)]">
        <div>Hello world!</div>
        <Link to="/todo" className="block hover:underline">
          Click <u>here</u> to go to ToDo Page
        </Link>
      </div>
    </>
  );
}
