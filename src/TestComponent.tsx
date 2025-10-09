import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from './features/auth/schemas/authSchema';
import type { RegisterSchema } from './features/auth/schemas/authSchema';

export default function TestComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterSchema) => {
    console.log('Dữ liệu hợp lệ:', data);
    // 👉 Gửi API đăng ký tại đây
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto mt-8 space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          {...register('email')}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Nhập email"
          required
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Mật khẩu</label>
        <input
          type="password"
          {...register('password')}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Nhập mật khẩu"
          required
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Xác nhận mật khẩu</label>
        <input
          type="password"
          {...register('confirmPassword')}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Nhập lại mật khẩu"
          required
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Đăng ký
      </button>
    </form>
  );
}
