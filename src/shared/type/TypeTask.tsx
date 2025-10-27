export type Task = {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  description: string;
  assignee: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT' | 'HIGHEST';
  status: TaskStatus;
  createById: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TaskStatus =
  | 'TODO'
  | 'IN_PROGRESS'
  | 'IN_REVIEW'
  | 'IN_DEPLOYMENT'
  | 'IN_TESTING'
  | 'DONE';
