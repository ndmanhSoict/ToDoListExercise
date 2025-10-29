import { useState } from 'react';
import InputAuth from '@shared/components/InputAuth';
import ButtonBasic from '@shared/components/ButtonBasic';
import { useForm } from 'react-hook-form';
import { registerSchema, type RegisterSchema } from '@schemas/authSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
import { registerApi } from '@api/authAPI';
import { toast } from 'react-toastify';
import type { AxiosError } from 'axios';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: 'onTouched',
  });

  const mutationRegister = useMutation({
    mutationFn: async (body: { username: string; password: string; confirmPassword: string }) => {
      const res = await registerApi(body);
      return res;
    },
    onSuccess: () => {
      toast.success('Register successful! Please login.');
      navigate({ to: '/login' });
    },
    onError: (error) => {
      const err = error as AxiosError<{ error?: string }>;
      // console.log(err.response?.status);
      toast.error(`Error: ${err.response?.data?.error}. Please try with other email!`);
    },
  });

  // const mutationCheckEmail = useMutation({
  //   mutationFn: async (email: string) => {
  //     // console.log('da chay vao day');
  //     const res = await fakeCallAPICheckEmail(email);
  //     return res;
  //   },
  //   onSuccess: (data) => {
  //     console.log('thực thi bước cuối');
  //     if (data === 'Email already exists') {
  //       form.setError('email', { type: 'manual', message: 'Email đã tồn tại!' });
  //       // console.log(form.getFieldState('email'))
  //     } else {
  //       form.clearErrors('email');
  //       // console.log(form.getFieldState('email'))
  //     }
  //   },
  // });

  // const emailState = form.getFieldState('email');
  // useEffect(() => {
  //   console.log('Field state cập nhật:', emailState);
  //   console.log('Lỗi email:', emailState.error);
  // }, [emailState]);

  // const onSubmit = (data: RegisterSchema) => {
  // if (form.getFieldState("email").error) {
  //   mutationRegister.mutate(data.email);
  // }
  const onSubmit = () => {
    mutationRegister.mutate({
      username: form.getValues('email'),
      password: form.getValues('password'),
      confirmPassword: form.getValues('confirmPassword'),
    });
  };
  return (
    <>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white border border-gray-300 rounded shadow">
        <form action="" method="post" onSubmit={form.handleSubmit(onSubmit)}>
          <h1 className="block text-center text-2xl font-bold mb-4">Create an account</h1>
          <InputAuth
            form={form}
            type="email"
            label="email"
            nameValidate="email"
            iconleft={<i className="material-icons">mail_outline</i>}
            placeholder="Input your email"
            // propOnChange={mutationCheckEmail.mutate}
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
                className={`material-icons hover:cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 active:scale-95 ${
                  hidePassword ? 'opacity-70' : 'opacity-100 text-blue-500'
                }`}
                onClick={() => setHidePassword(!hidePassword)}
              >
                {hidePassword ? 'visibility_off' : 'visibility'}
              </i>
            }
            placeholder="Input your password"
          />

          <InputAuth
            form={form}
            type={hideConfirmPassword ? 'password' : 'text'}
            label="Confirm password"
            nameValidate="confirmPassword"
            iconleft={<i className="material-icons">lock_outline</i>}
            iconright={
              <i
                className={`material-icons hover:cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 active:scale-95 ${
                  hideConfirmPassword ? 'opacity-70' : 'opacity-100 text-blue-500'
                }`}
                onClick={() => setHideConfirmPassword(!hideConfirmPassword)}
              >
                {hideConfirmPassword ? 'visibility_off' : 'visibility'}
              </i>
            }
            placeholder="Input your password again"
          />

          <div className="mb-4 relative w-full">
            <ButtonBasic
              disabled={mutationRegister.isPending}
              type="submit"
              title={mutationRegister.isPending ? 'Loading...' : 'Register'}
              className="absolute right-1/2 transform translate-x-1/2 bg-blue-500 hover:bg-blue-700 py-3 px-8 shadow"
            />
          </div>
        </form>

        <div className="text-center mt-22">
          <span className="text-gray-600">You have an account? </span>
          <Link
            className="text-blue-600 italic underline cursor-pointer hover:text-blue-800 active:text-red-600"
            to="/login"
          >
            Login now
          </Link>
        </div>
      </div>
    </>
  );
}
