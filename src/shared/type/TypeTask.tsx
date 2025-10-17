export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
};

export type TaskStatus =
  | 'CREATED'
  | 'TODO'
  | 'IN_PROGRESS'
  | 'IN_REVIEW'
  | 'DEPLOY'
  | 'IN_TESTING'
  | 'VERIFY'
  | 'DONE';
