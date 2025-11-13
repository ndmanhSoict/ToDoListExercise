import { createContext } from 'react';

export const TaskContext = createContext<{
  handleOpenCloseModal: () => void;
} | null>(null);
