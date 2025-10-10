export type Task = {
  id: string;
  title: string;
  description: string;
  status:
    | 'CREATED'
    | 'TODO'
    | 'IN_PROGRESS'
    | 'IN_REVIEW'
    | 'DEPLOY'
    | 'IN_TESTING'
    | 'VERIFY'
    | 'DONE';
  createdAt: Date;
  updatedAt: Date;
};

export type TaskStatus = Task['status'];
