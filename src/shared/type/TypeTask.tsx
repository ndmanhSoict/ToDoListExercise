export const TASK_STATUS = [
  'TODO',
  'IN_PROGRESS',
  'IN_REVIEW',
  'IN_DEPLOYMENT',
  'IN_TESTING',
  'DONE',
];
export const TASK_PRIORITY = ['LOW', 'MEDIUM', 'HIGH', 'URGENT', 'HIGHEST'];

export type TaskStatus = (typeof TASK_STATUS)[number];
export type TaskPriority = (typeof TASK_PRIORITY)[number];

export type Task = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  assignee: string;
  priority: TaskPriority;
  status: TaskStatus;
  createdById: string;
  createdAt: string;
  updatedAt: string;
};
