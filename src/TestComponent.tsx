import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from './store/strore';
import { increment, decrement, incrementByAmount } from './store/counterSlice';
import { Link } from '@tanstack/react-router';

export function TestComponent() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Counter: {count}</h2>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(increment())}>+</button>
      <input ref={inputRef} type="number" />
      <button onClick={() => dispatch(incrementByAmount(Number(inputRef.current?.value) || 0))}>
        +theo value
      </button>
      <Link to="/login">Chuyển nhé</Link>
    </div>
  );
}
