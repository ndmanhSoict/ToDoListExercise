import ColumnTask from '@shared/components/ColumnTask';
import type { Task } from '@shared/type/TypeTask';
import type { TaskStatus } from '@shared/type/TypeTask';
import { getAllTodosApi } from '../api/todoAPI';
import { useQuery } from '@tanstack/react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortAmountDown } from '@fortawesome/free-solid-svg-icons';
import { useMemo, useState } from 'react';

export default function ToDoPage() {
  const [sortBy, setSortBy] = useState('created-desc');
  const [showTask, setShowTask] = useState('all');

  const { data: todos, isSuccess } = useQuery({
    queryKey: ['todos'],
    queryFn: getAllTodosApi,
    staleTime: 60000, // 1 phút
  });

  const allTasks = useMemo(() => {
    const taskByStatus: Record<TaskStatus, Task[]> = {
      TODO: [],
      IN_PROGRESS: [],
      IN_REVIEW: [],
      IN_DEPLOYMENT: [],
      IN_TESTING: [],
      DONE: [],
    };
    if (isSuccess && todos) {
      todos.forEach((task: Task) => {
        taskByStatus[task.status].push(task);
      });
    }
    return taskByStatus;
  }, [todos, isSuccess]);

  const showTasks = useMemo(() => {
    const [sortField, sortType] = sortBy.split('-');
    const filterTask: Record<TaskStatus, Task[]> = {
      TODO: [],
      IN_PROGRESS: [],
      IN_REVIEW: [],
      IN_DEPLOYMENT: [],
      IN_TESTING: [],
      DONE: [],
    };
    (Object.keys(allTasks) as TaskStatus[]).forEach((status) => {
      filterTask[status] = allTasks[status].filter((task) => {
        const start = new Date(task.startDate).getTime();
        const end = new Date(task.endDate).getTime();
        const now = Date.now();
        if (showTask === 'all') return true;
        if (showTask === 'ongoing') return start <= now && now <= end;
        if (showTask === 'upcoming') return start > now;
        if (showTask === 'history') return end < now;
      });
      filterTask[status].sort((a: Task, b: Task) => {
        const sortTime = (a: string, b: string) => {
          if (sortType === 'asc') return new Date(a).getTime() - new Date(b).getTime();
          return new Date(b).getTime() - new Date(a).getTime();
        };
        const sortStr = (a: string, b: string) => {
          if (sortType === 'asc') return a.localeCompare(b);
          return b.localeCompare(a);
        };
        const sortPriority = (a: string, b: string) => {
          const PRIORITY_RANK: Record<string, number> = {
            LOW: 1,
            MEDIUM: 2,
            HIGH: 3,
            HIGHEST: 4,
            URGENT: 5,
          };

          if (sortType === 'asc') return PRIORITY_RANK[a] - PRIORITY_RANK[b];
          return PRIORITY_RANK[b] - PRIORITY_RANK[a];
        };
        if (sortField === 'created') return sortTime(a.createdAt, b.createdAt);
        if (sortField === 'endDate') return sortTime(a.endDate, b.endDate);
        if (sortField === 'priority') return sortPriority(a.priority, b.priority);
        if (sortField === 'name') return sortStr(a.name, b.name);
        return 0;
      });
    });
    return filterTask;
  }, [sortBy, showTask, allTasks]);

  return (
    <div className="flex flex-col h-[calc(100vh-4.5rem)]">
      <div className="h-fit w-fit mt-2 mx-auto flex gap-6">
        <div className="rounded-2xl bg-white px-4 py-2">
          <FontAwesomeIcon icon={faSortAmountDown} color="black" />
          <label>Sort by: </label>
          <select defaultValue={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="created-asc">Creation Date (Oldest to Newest)</option>
            <option value="created-desc">Creation Date (Newest to Oldest)</option>
            <option value="endDate-asc">End Date (Earliest to Latest)</option>
            <option value="endDate-desc">End Date (Latest to Earliest)</option>
            <option value="priority-asc">Priority (Low to High)</option>
            <option value="priority-desc">Priority (High to Low)</option>
            <option value="name-asc">Name (A to Z)</option>
            <option value="name-desc">Name (Z to A)</option>
          </select>
        </div>
        <div className="rounded-2xl bg-white px-4 py-2">
          <label>Show: </label>
          <select defaultValue={showTask} onChange={(e) => setShowTask(e.target.value)}>
            <option value="all">All Tasks</option>
            <option value="ongoing">Ongoing Tasks</option>
            <option value="upcoming">Upcoming Tasks</option>
            <option value="history">History Tasks</option>
          </select>
        </div>
      </div>
      <div className="w-full flex-1 flex overflow-x-auto p-4">
        {(Object.keys(showTasks) as TaskStatus[]).map((key) => {
          return (
            <ColumnTask
              key={key}
              header={key}
              count={showTasks[key].length}
              proptaskList={showTasks[key]}
            />
          );
        })}
      </div>
    </div>
  );
}
