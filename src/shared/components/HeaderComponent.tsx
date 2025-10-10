import { Link, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import ButtonBasic from './ButtonBasic';

export default function HeaderComponent() {
  const navigate = useNavigate();
  const [userName] = useState('NguyenDucManh');
  function handleLogOut() {
    localStorage.clear();
  }

  return (
    <div className="flex justify-around items-center bg-white">
      <h1 className="!leading-none">TO DO APP</h1>
      <nav className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/todo">To Do List</Link>
        <Link to="/about">About</Link>
        <Link to="/">Review</Link>
      </nav>
      {userName ? (
        <div>
          <span>Hi, {userName} !</span>
        </div>
      ) : (
        <div className="flex gap-2">
          <ButtonBasic
            title="Login"
            className="bg-blue-500 hover:bg-blue-700 px-8 py-3 shadow h-fit"
            onClick={() => {
              navigate({ to: '/login' });
            }}
          ></ButtonBasic>
          <ButtonBasic
            title="Register"
            className="bg-blue-500 hover:bg-blue-700 py-3 px-8 shadow h-fit"
            onClick={() => {
              handleLogOut();
              navigate({ to: '/register' });
            }}
          ></ButtonBasic>
        </div>
      )}
    </div>
  );
}
