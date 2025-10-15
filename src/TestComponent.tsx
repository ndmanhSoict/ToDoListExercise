import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fakeCallAPILogin } from './features/auth/api/authAPI';

export function TestComponent() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fakeCallAPILogin('t18@gmail.com');
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  if (mutation.isPending) return <p>Loading...</p>;
  if (mutation.isError) return <p>Error: {(mutation.error as Error).message}</p>;

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Kết quả từ fake API:</h2>
      <p>{mutation.data}</p>
      <button className="border-red-100" onClick={() => mutation.mutate()}>
        ấn để request lại
      </button>
    </div>
  );
}
