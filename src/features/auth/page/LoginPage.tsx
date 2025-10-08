import { useState } from 'react';
import InputAuth from '../../../shared/components/InputAuth';
import ButtonBasic from '../../../shared/components/ButtonBasic';
export default function LoginPage() {
  const [hidePassword, setHidePassword] = useState(false);
  return (
    <>
      <div className="max-w-md mx-auto mt-10 p-6 pb-18 border border-gray-300 rounded shadow">
        <h1 className="block text-center text-2xl font-bold mb-4">Login to start</h1>
        <InputAuth
          type="email"
          name="email"
          iconleft={<i className="material-icons">mail_outline</i>}
          placeholder="Input your email"
        />
        {/* <br className="my-4" /> */}
        <InputAuth
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
            title="Login"
            className="absolute right-1/2 transform translate-x-1/2 bg-blue-500 hover:bg-blue-700 py-3 px-8 shadow"
          />
        </div>
      </div>
    </>
  );
}
