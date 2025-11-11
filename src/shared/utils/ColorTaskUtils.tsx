import { getDayLeft } from './TimeUtils';

export function getTaskColor(priority: string, endDateString: string): string {
  const dayLeft = getDayLeft(endDateString);

  let bgColr: string = '';

  if (dayLeft < 0) {
    bgColr = '!bg-[var(--task-overdue-bg)] opacity-70';
  } else if (dayLeft < 3) {
    //Còn lại 0 1 2
    bgColr = '!bg-[var(--task-soon-bg)]';
  } else if (dayLeft <= 5) {
    //Còn lại 3 4 5
    bgColr = '!bg-[var(--task-medium-bg)]';
  } else if (dayLeft <= 10) {
    //Còn lại 6 -> 10
    bgColr = '!bg-[var(--task-safe-bg)]';
  } else {
    bgColr = '!bg-[var(--task-long-bg)]'; //Hơn 10
  }

  const borderLine: Record<string, string> = {
    LOW: 'border-r-[var(--task-border-low)]',
    MEDIUM: 'border-r-[var(--task-border-medium)]',
    HIGH: 'border-r-[var(--task-border-high)]',
    HIGHEST: 'border-r-[var(--task-border-highest)]',
    URGENT: 'border-r-[var(--task-border-urgent)]',
  };

  return `${bgColr} border-r-8 ${borderLine[priority]}`;
}
