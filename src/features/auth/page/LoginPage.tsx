import { useState } from 'react';
import InputAuth from '@shared/components/InputAuth';
import ButtonBasic from '@shared/components/ButtonBasic';
import { useForm } from 'react-hook-form';
import { loginSchema, type LoginSchema } from '../schemas/authSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from '@tanstack/react-router';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@store/store';
import { setUser } from '@store/userSlice';
import { useMutation } from '@tanstack/react-query';
import { loginApi } from '@api/authAPI';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [hidePassword, setHidePassword] = useState(true);
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const mutation = useMutation({
    mutationFn: async (body: { username: string; password: string }) => {
      const res = await loginApi(body);
      return res;
    },
    onSuccess: (data) => {
      console.log('Login successful:', data);
      const username = data.data.user.username;
      const getUserName = username.slice(0, username.indexOf('@'));
      dispatch(setUser(getUserName));
      toast.success('Login successful!');
      navigate({ to: '/todo' });
    },
  });

  const onSubmit = async (data: LoginSchema) => {
    // console.log("Submitting login form with data:", data);
    // try {
    //   const result = await loginApi({ username: data.email, password: data.password });
    //   console.log("Login result:", result);
    // } catch (err) {
    //   console.error("Login failed:", err);
    // }
    mutation.mutate({ username: data.email, password: data.password });
  };

  return (
    <>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white border border-gray-300 rounded shadow">
        <form action="" method="post" onSubmit={form.handleSubmit(onSubmit)}>
          <h1 className="block text-center text-2xl font-bold mb-4">Login to start</h1>
          {mutation.isError && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {mutation.error instanceof Error
                ? mutation.error.message
                : 'Login failed. Please try again.'}
            </div>
          )}
          <InputAuth
            form={form}
            type="email"
            label="email"
            nameValidate="email"
            iconleft={<i className="material-icons">mail_outline</i>}
            placeholder="Input your email"
            required={true}
          />
          {/* <br className="my-4" /> */}
          <InputAuth
            form={form}
            type={hidePassword ? 'password' : 'text'}
            label="password"
            nameValidate="password"
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
            required
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
              disabled={mutation.isPending}
              type="submit"
              title={mutation.isPending ? 'Loading...' : 'Login'}
              className="absolute right-1/2 transform translate-x-1/2 bg-blue-500 hover:bg-blue-700 py-3 px-8 shadow"
            />
          </div>
        </form>
        <div className="text-center mt-22">
          <span className="text-gray-600">Don't have an account? </span>
          <Link
            className="text-blue-600 italic underline cursor-pointer hover:text-blue-800 active:text-red-600"
            to="/register"
          >
            Register here
          </Link>
        </div>
      </div>
    </>
  );
}
