export type Task = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  assignee: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT' | 'HIGHEST';
  status: TaskStatus;
  createdById: string;
  createdAt: string;
  updatedAt: string;
};

export type TaskStatus =
  | 'TODO'
  | 'IN_PROGRESS'
  | 'IN_REVIEW'
  | 'IN_DEPLOYMENT'
  | 'IN_TESTING'
  | 'DONE';
