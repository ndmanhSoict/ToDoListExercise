import { createFileRoute } from '@tanstack/react-router';
import { TestComponent } from '../TestComponent';

export const Route = createFileRoute('/test')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <TestComponent />
    </>
  );
}
