import { useState } from 'react';
import InputAuth from '../../../shared/components/InputAuth';
import ButtonBasic from '../../../shared/components/ButtonBasic';
import { useForm } from 'react-hook-form';
import { registerSchema, type RegisterSchema } from '../schemas/authSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';

export default function LoginPage() {
  const navigate = useNavigate();
  const [hidePassword, setHidePassword] = useState(true);
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterSchema) => {
    console.log('Dữ liệu hợp lệ:', data);
    navigate({ to: '/test' });
  };
  return (
    <>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white border border-gray-300 rounded shadow">
        <form action="" method="post" onSubmit={form.handleSubmit(onSubmit)}>
          <h1 className="block text-center text-2xl font-bold mb-4">Login to start</h1>
          <InputAuth
            form={form}
            type="email"
            name="email"
            namevalidate="email"
            iconleft={<i className="material-icons">mail_outline</i>}
            placeholder="Input your email"
            required={true}
          />
          {/* <br className="my-4" /> */}
          <InputAuth
            form={form}
            type={hidePassword ? 'password' : 'text'}
            name="password"
            iconleft={<i className="material-icons">lock_outline</i>}
            iconright={
              <i
                className="material-icons hover:cursor-pointer"
                onClick={() => setHidePassword(!hidePassword)}
              >
                {hidePassword ? 'visibility_off' : 'visibility'}
              </i>
            }
            placeholder="Input your password"
            required={true}
          />
          {/* <br className="my-4" /> */}
          <a
            className="block text-sm text-gray-600 text-right italic underline cursor-pointer hover:text-blue-600 active:text-red-600 mb-4"
            href="#"
          >
            Forgot password?
          </a>
          <div className="mb-4 relative w-full">
            <ButtonBasic
              type="submit"
              title="Login"
              className="absolute right-1/2 transform translate-x-1/2 bg-blue-500 hover:bg-blue-700 py-3 px-8 shadow"
            />
          </div>
        </form>

        <div className="text-center mt-22">
          <span className="text-gray-600">Don't have an account? </span>
          <a
            className="text-blue-600 italic underline cursor-pointer hover:text-blue-800 active:text-red-600"
            href="/register"
          >
            Register here
          </a>
        </div>
      </div>
    </>
  );
}
