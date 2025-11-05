import { PRIORITY_RANK } from '@shared/constants/TaskConstants';

export function sortTime(a: string, b: string, sortType: string) {
  if (sortType === 'asc') return new Date(a).getTime() - new Date(b).getTime();
  return new Date(b).getTime() - new Date(a).getTime();
}

export function sortStr(a: string, b: string, sortType: string) {
  if (sortType === 'asc') return a.localeCompare(b);
  return b.localeCompare(a);
}

export function sortPriority(a: string, b: string, sortType: string) {
  if (sortType === 'asc') return PRIORITY_RANK[a] - PRIORITY_RANK[b];
  return PRIORITY_RANK[b] - PRIORITY_RANK[a];
}
